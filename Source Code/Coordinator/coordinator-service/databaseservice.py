import mysql.connector
import datetime
import logging

class DatabaseService:
    INSERT_QUERY = 'INSERT INTO visit(createdAt, birdID, nfcRFID) VALUES(%s,%s,%s)'
    CHECK_EXISTS_QUERY = 'SELECT COUNT(1) FROM visit WHERE createdAt > %s AND nfcRFID = %s'
    GET_RFID_QUERY = 'SELECT * FROM rfidtag WHERE nfcRFIDInternal = %s'

    def __init__(self, config):
        if config is not None and config.log_level is not None:
            logging.basicConfig(level=config.log_level)
        else: logging.basicConfig()

        self.db = mysql.connector.connect(
            host=config.db_host,
            user=config.db_user,
            passwd=config.db_password,
            port=config.db_port,
            database=config.db_name,
            autocommit=True,
            auth_plugin= 'mysql_native_password'
        )

        self.cutoff_minutes = config.same_visit_frequency_minutes

        logging.info("Connected to database successfully")

    def handle_new_visit(self, rfid, visit_datetime):
        cursor = self.db.cursor(buffered=True, dictionary=True)
        rfid_record = self.__get_rfid_record(rfid, cursor)
        if rfid_record is None:
            logging.debug("No RFID record found matching %s, ignoring this visit", rfid)
        else:
            logging.debug("Found RFID record with short ID %s matching long ID %s", rfid_record['nfcRFID'], rfid)
            is_duplicate_visit = not self.__validate_not_duplicate_visit(cursor, rfid_record['nfcRFID'], visit_datetime - datetime.timedelta(minutes=self.cutoff_minutes))

            if is_duplicate_visit:
                logging.debug("Visit from RFID %s has already been recorded within the past %d minutes, so ignoring this visit", rfid, self.cutoff_minutes)
            else:
                logging.debug("Writing visit from %s at datetime %s to DB", rfid, visit_datetime.isoformat())
                self.__write_visit(cursor, rfid_record['nfcRFID'], rfid_record['birdID'], visit_datetime)

        cursor.close()

    def __write_visit(self, cursor, rfid_short, bird_id, visit_datetime):
        cursor.execute(self.INSERT_QUERY, (visit_datetime.timestamp(), bird_id, rfid_short))

    def __validate_not_duplicate_visit(self, cursor, rfid_short, cutoff_time):
        cursor.execute(self.CHECK_EXISTS_QUERY, (cutoff_time.timestamp(), rfid_short, ))
        return cursor.fetchone()['COUNT(1)'] == 0

    def __get_rfid_record(self, rfid, cursor):
        logging.debug("Fetching DB record for rfid %s", rfid)
        cursor.execute(self.GET_RFID_QUERY, (rfid,))

        if cursor.rowcount == 0:
            return None
        else: return cursor.fetchone()

    def __reconnect(self):
        logging.warning("Disconnected from Database, attempting to reconnect...")
        self.db.reconnect(attempts=5, delay=2)
        logging.info("Reconnect attempt successful")

    def __disconnect(self):
        if(self.db is not None and self.db.is_connected()):
            self.db.disconnect()
            self.db.close()
            logging.info("Disconnected from database")

