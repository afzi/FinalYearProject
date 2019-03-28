-------------------------------Application--------------------------------------
This folder contains our source code in its' development state, the system can be 
run from here provided:
npm is installed

a MySQL database is setup with this config:
	user: 'sails-root',
    password: 'uFk56De6tg8h3hJx',
    port: 3306,
    host: '127.0.0.1',
    database: 'nfcbirds'

	
start by going to nfc-bird-application folder, opening a terminal and run the 
following:
npm install
npm install sails -g
sails lift

after the application starts open a browser and naviagte to localhost:1337
-------------------------------Coordinator--------------------------------------
This folder contains the python scripts used for the rfid readers
-------------------------------Deployment--------------------------------------
This folder contains a proof of concept deployment designed by Karlis to deploy 
our sysyem, read the readmes within or the section in the corpus for directions if 
you wish to use this.
-------------------------------Scripts--------------------------------------
This folder contains a series of scripts created by priyesh to generate dummy data 
to use when testing the system (with AiOScript being the full set combined in one), it is advised to run them after the application 
has been started at least once to generate the tables in the database.