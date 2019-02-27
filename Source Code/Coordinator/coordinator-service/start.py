import serial
import sys
import config
import atexit
import logging
import signal
import databaseservice
import datetime
import threading
import time

class SerialReader:
    def __init__(self, params):
        if not self.__validate_config_and_set_defaults(params):
            raise Exception("Config validation failed, exiting")

        self.baud = params.baud

        self.port = params.port

        logging.basicConfig(level=params.log_level)

        self.db_service = databaseservice.DatabaseService(params)

        signal.signal(signal.SIGINT, self.signal_handler)

        self.ser = None
        self.is_connected = False

    def connect(self):
        try:
            self.ser = serial.Serial(port=self.port, baudrate=self.baud, bytesize=serial.EIGHTBITS, stopbits=serial.STOPBITS_ONE)
            if not self.ser.is_open:
                self.ser.open()
            atexit.register(self.__finished)
        except serial.serialutil.SerialException as e:
            logging.error(
                "Fatal error: couldn't open serial connection. Please make sure you've specified the correct port "
                "number / baud rate in config.py, and there are no other processes taking control of the serial port.")
            print(e)
            sys.exit(1)

        logging.info("Connected to Serial Port %s, Name %s, Baud %s", self.port, self.ser.name, self.baud)
        self.is_connected = True

    def __validate_config_and_set_defaults(self, config):
        if config is None:
            print.error("Missing config.py file")
            return False
        if config.db_host is None:
            print("Missing required config param db_host")
            return False

        if config.db_port is None:
            print("Missing required config param db_port")
            return False

        if config.db_user is None:
            print("Missing required config param db_user")
            return False

        if config.db_password is None:
            print("Missing required config param db_password")
            return False

        if config.db_name is None:
            print("Missing required config param db_name")
            return False

        if config.log_level is None:
            print("Mising optional config param log_level, using default = 'WARNING'")
            config.log_level = 'WARNING'
        elif config.log_level not in ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL']:
            print(
                "Unknown log_level value %s in config, must be one of 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'. Using default = 'WARNING'",
                config.log_level)
            config.log_level = 'WARNING'

        if config.baud is None:
            print("Missing optional config param baud, using default = 9600")
            config.baud = 9600
        elif config.baud not in [50, 75, 110, 134, 150, 200, 300, 600, 1200, 1800, 2400, 4800, 9600, 19200, 38400,
                                 57600, 115200]:
            print(
                "Unsupported baud rate %d in config, must be one of 50 | 75 | 110 | 134 | 150 | 200 | 300 | 600 | 1200 | 1800 | 2400 | 4800 | 9600 | 19200 | 38400 | 57600 | 115200. Using default = 9600",
                config.baud)
            config.baud = 9600

        if config.same_visit_frequency_minutes is None:
            print("Missing optional config param same_visit_frequency_minutes, using default = 60")
            config.same_visit_frequency_minutes = 60
        elif type(config.same_visit_frequency_minutes) is not int or config.same_visit_frequency_minutes < 0:
            print("Invalid value %s used for config param same_visit_frequency_minutes, using default = 60")
            config.same_visit_frequency_minutes = 60

        if config.port is None:
            print("Missing optional config param port, using default = 'COM5'")
            config.baud = 'COM5'

        return True

    def __validate_checksum(self, data, checksum):
        calculated_checksum = 0
        for next_byte in data:
            calculated_checksum = calculated_checksum ^ next_byte

        logging.debug("Calculated checksum = %d, received checksum = %d", calculated_checksum, checksum)
        return calculated_checksum == checksum

    def __validate_packet(self, packet):
        if not len(packet) == 13:
            logging.debug("Incoming data has unexpected size. Expected 13 bytes, got %d", len(packet))
            return False

        start_byte = packet[0]
        end_byte = packet[12]

        if not (start_byte == 0xAA and end_byte == 0xBB):
            logging.debug("Incoming data has wrong start byte or end byte. Expected 0xAA for start byte and 0xBB for end byte, got %X and %X, respectively", start_byte, end_byte)
            return False

        checksum = packet[11]
        if not self.__validate_checksum(packet[1:11], checksum):
            logging.debug("Incoming data checksum doesn't match")
            return False

        return True

    # tries to extract a single packet from the raw data we received
    # the raw data should have at most one packet of length 13, starting with 0xAA and ending with 0xBB
    # if no valid packet found in the data, return None
    def __try_extract_and_validate_packet(self, incoming_bytes):
        if len(incoming_bytes) < 13:
            return None # this shouldn't ever happen
        else:
            logging.debug("Received packet with more than 13 bytes, attempting to extract")
            start_index = 0
            end_index = 12

            while end_index < len(incoming_bytes):
                start_byte = incoming_bytes[start_index]
                end_byte = incoming_bytes[end_index]

                if start_byte == 0xAA and end_byte == 0xBB:
                    supposed_packet = incoming_bytes[start_index:end_index+1]
                    logging.debug("Extracted something that looks like a packet: %s, validating...", supposed_packet.hex())
                    if(self.__validate_packet(supposed_packet)):
                        logging.debug("Validation succeeded, we've found a packet in our data")
                        return supposed_packet
                    else:
                        logging.debug("Validation failed, continuing search for packet")

                start_index += 1
                end_index += 1 # if we've reached this point, we either didn't manage to extract a packet, or it failed validation, so keep searching

            return None # if we've reached this point, our loop failed to extract a valid packet, so signal to the caller that we've failed by returning None



    def __handle_read(self, incoming_bytes, visit_datetime):
        logging.debug("Read raw data: %s", incoming_bytes.hex())

        packet = self.__try_extract_and_validate_packet(incoming_bytes)

        if packet is not None:
            logging.debug("Packet validated successfully, attempting to write data to DB")
            bird_tag_raw = packet[4:11].hex()
            logging.debug("Tag data: %s", bird_tag_raw)
            self.db_service.handle_new_visit(bird_tag_raw, visit_datetime)
        else:
            logging.debug("Packet validation failed, discarding data")

    def listen(self):
        if self.is_connected in [None, False]:
            raise Exception("listen() called, but serial port not connected")

        buffer = bytearray()
        while True:
            read = self.ser.read(1)[0] # read one byte at a time

            if read == 0xBB and len(buffer) >= 12:
                # we've read the end byte and the buffer is at least as big as the expected packet size,
                #  so parse what we have (async)
                buffer.append(read)
                threading.Thread(target=self.__handle_read, args=(buffer,datetime.datetime.now())).start()
                buffer = bytearray()
            elif len(buffer) == 0 and read != 0xAA:
                # the buffer is empty but we've read something other than the start byte, so let's discard this
                logging.debug("Read byte %X but expecting start byte 0xAA, discarding this read", read)
            else:
                buffer.append(read)


    def __finished(self):
        if self.ser is not None and self.ser.is_open:
            self.ser.close()
        logging.info("Disconnected")
        sys.exit(0)

    def signal_handler(self, signal, frame):
        logging.debug("Received SIGINT, exiting")
        self.__finished()


s = SerialReader(config)
s.connect()
s.listen()
