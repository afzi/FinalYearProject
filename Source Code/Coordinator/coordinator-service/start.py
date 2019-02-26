import serial
import sys
import config
import atexit
import asyncio
import logging
import signal
import databaseservice
import datetime

class SerialReader:
    def __init__(self, config): # TODO validation on config
        if config is None or config.baud is None:
            self.baud = 9600
        else:
            self.baud = config.baud

        if config is None or config.port is None:
            self.port = 'COM5'  # if get time, write something that scans ports automatically
        else:
            self.port = config.port

        if config is not None and config.log_level is not None:
            logging.basicConfig(level=config.log_level)
        else: logging.basicConfig()

        self.db_service = databaseservice.DatabaseService(config)

        signal.signal(signal.SIGINT, self.signal_handler)

        self.ser = None
        self.is_connected = False

    def connect(self):
        try:
            self.ser = serial.Serial(self.port, self.baud)
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


    def __validate_checksum(self, data, checksum):
        calculated_checksum = 0
        for next_byte in data:
            calculated_checksum = calculated_checksum ^ next_byte

        logging.debug("Calculated checksum = %d, received checksum = %d", calculated_checksum, checksum)
        return calculated_checksum == checksum

    async def __handle_read(self, incoming_bytes):
        visit_datetime = datetime.datetime.now()
        # do some extra validation here, rather than just checksum (length, start / end bytes)
        logging.debug("Read raw data: %s", incoming_bytes.hex())

        bird_tag_raw = incoming_bytes[4:11]
        checksum = incoming_bytes[11]

        logging.debug("Tag data: %s", bird_tag_raw.hex())
        logging.debug("Checksum: %d", checksum)

        if self.__validate_checksum(incoming_bytes[1:11], checksum):
            logging.debug("Checksum matches, attempting to write data to DB")
            self.db_service.handle_new_visit(bird_tag_raw.hex(), visit_datetime)
        else:
            logging.debug("Checksum doesn't match, discarding data")

    def listen(self):
        if self.is_connected in [None, False]:
            raise Exception("listen() called, but serial port not connected")

        while True:
            read = self.ser.read(13) # try using readline here instead
            asyncio.run(self.__handle_read(read))

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
