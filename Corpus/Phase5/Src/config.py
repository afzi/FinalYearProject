log_level="DEBUG" # DEBUG | INFO | WARNING | ERROR | CRITICAL (default WARNING). Logging level for the coordinator service.

baud=9600 # default 9600. Baud rate used for communication over the serial port
port="COM5" # default COM5. Serial port 

db_host="localhost" # REQUIRED. Database hostname.
db_user="username" # REQUIRED. Database username.
db_password="password" # REQUIRED. Database password.
db_port=3306 # REQUIRED. Database port.
db_name="nfcbirds" # REQUIRED. Database name.

same_visit_frequency_minutes = 0 # default 60. Cut-off time for discarding duplicate visits.