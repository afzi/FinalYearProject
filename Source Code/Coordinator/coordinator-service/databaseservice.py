import mysql.connector
import datetime
import logging
import sys

class DatabaseService:
    RFID_SHORT_COL_NAME = 'nfcRFID'
    RFID_LONG_COL_NAME = 'nfcRFIDInternal'
    COUNT1_COL_NAME = 'COUNT(1)'
    BIRD_COL_NAME = 'birdID'
    CREATEDAT_COL_NAME = 'createdAt'

    INSERT_QUERY = 'INSERT INTO visit(createdAt, birdID, nfcRFID) VALUES(%s,%s,%s)'
    CHECK_EXISTS_QUERY = 'SELECT COUNT(1) FROM visit WHERE createdAt > %s AND nfcRFID = %s'
    GET_RFID_QUERY = 'SELECT * FROM rfidtag WHERE nfcRFIDInternal = %s'

    def __init__(self, params):
        if params is not None and params.log_level is not None:
            logging.basicConfig(level=params.log_level)
        else:
            logging.basicConfig()

        try:
            self.db = mysql.connector.connect(
                host=params.db_host,
                user=params.db_user,
                passwd=params.db_password,
                port=params.db_port,
                database=params.db_name,
                autocommit=True,
                auth_plugin='mysql_native_password'
            )
        except (mysql.connector.errors.OperationalError, mysql.connector.errors.DatabaseError) as e:
            logging.error("Couldn't connect to database, make sure it's running and the connection params are set in config.py")
            raise Exception(e)

        self.cutoff_minutes = params.same_visit_frequency_minutes

        logging.info("Connected to database successfully")

    def handle_new_visit(self, rfid, visit_datetime):
        try:
            cursor = self.db.cursor(buffered=True, dictionary=True)
            rfid_record = self.__get_rfid_record(rfid, cursor)
            if rfid_record is None:
                logging.debug("No RFID record found matching %s, ignoring this visit", rfid)
            else:
                logging.debug("Found RFID record with short ID %s matching long ID %s",
                              rfid_record[self.RFID_SHORT_COL_NAME], rfid)
                is_duplicate_visit = not self.__validate_not_duplicate_visit(cursor, rfid_record[self.RFID_SHORT_COL_NAME],
                                                                             visit_datetime - datetime.timedelta(
                                                                                 minutes=self.cutoff_minutes))

                if is_duplicate_visit:
                    logging.debug(
                        "Visit from RFID %s has already been recorded within the past %d minutes, so ignoring this visit",
                        rfid, self.cutoff_minutes)
                else:
                    logging.debug("Writing visit from %s at datetime %s to DB", rfid, visit_datetime.isoformat())
                    self.__write_visit(cursor, rfid_record[self.RFID_SHORT_COL_NAME], rfid_record[self.BIRD_COL_NAME],
                                       visit_datetime)

            cursor.close()
        except (mysql.connector.errors.OperationalError, mysql.connector.errors.DatabaseError) as e: # something's gone wrong with the server, try to recover and if successful, retry this function
            logging.warning("Disconnected from database, attempting to reconnect...")
            print(e)
            self.__reconnect()
            self.handle_new_visit(rfid, visit_datetime)


    def __write_visit(self, cursor, rfid_short, bird_id, visit_datetime):
        cursor.execute(self.INSERT_QUERY, (visit_datetime.timestamp(), bird_id, rfid_short))

    def __validate_not_duplicate_visit(self, cursor, rfid_short, cutoff_time):
        cursor.execute(self.CHECK_EXISTS_QUERY, (cutoff_time.timestamp(), rfid_short,))
        return cursor.fetchone()[self.COUNT1_COL_NAME] == 0

    def __get_rfid_record(self, rfid, cursor):
        logging.debug("Fetching DB record for rfid %s", rfid)
        cursor.execute(self.GET_RFID_QUERY, (rfid,))

        if cursor.rowcount == 0:
            return None
        else:
            return cursor.fetchone()

    def __reconnect(self):
        logging.warning("Attempting to reconnect...")
        self.db.reconnect(attempts=5, delay=2)
        logging.info("Reconnect attempt successful")

    def __disconnect(self):
        if (self.db is not None and self.db.is_connected()):
            self.db.disconnect()
            self.db.close()
            logging.info("Disconnected from database")
