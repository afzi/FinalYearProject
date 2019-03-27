#!/bin/bash

if [ ! -f ./package/app.js ]; then
    echo "Could not find ./package/app.js - please make sure you've installed EchoBook before running this script"
	exit 1
fi

echo "Reading configuration..."

if [[ ! -n $BIRD_DB_HOST ]];
then
	read -p "Enter the database hostname (set environment variable BIRD_DB_HOST to read automatically on launch)
	" BIRD_DB_HOST
fi
if [[ ! -n $BIRD_DB_PORT ]];
then
	read -p "Enter the database port (set environment variable BIRD_DB_PORT to read automatically on launch) [default: 3306]
	" BIRD_DB_PORT
	BIRD_DB_PORT=${BIRD_DB_PORT:-3306}
fi
if [[ ! -n $BIRD_DB_NAME ]]; 
then
	read -p "Enter the database name (set environment variable BIRD_DB_NAME to read automatically on launch) [default: nfcbirds]
	" BIRD_DB_NAME
	BIRD_DB_NAME=${BIRD_DB_NAME:-nfcbirds}
fi
if [[ ! -n $BIRD_DB_USER ]]; 
then
	read -p "Enter the database username (set environment variable BIRD_DB_USER to read automatically on launch)
	" BIRD_DB_USER
fi
if [[ ! -n $BIRD_DB_PW ]]; 
then
	read -p "Enter the database password (set environment variable BIRD_DB_PW to read automatically on launch)
	" BIRD_DB_PW
fi

if [[ ! -n $BIRD_URL ]]; 
then
	read -p "Enter the URL to access the front-end (set environment variable BIRD_URL to read automatically on launch)
	" BIRD_URL
fi

if [[ ! -n $BIRD_PORT ]]; 
then
	read -p "Enter the port to access the front-end (set environment variable BIRD_PORT to read automatically on launch)
	" BIRD_PORT
fi

echo Database hostname: $BIRD_DB_HOST
echo Database port: $BIRD_DB_PORT
echo Database name: $BIRD_DB_NAME
echo Database username: $BIRD_DB_USER
echo Database password: $BIRD_DB_PW
echo URL: $BIRD_URL
echo PORT: $BIRD_PORT

echo "Launching server..."
sudo NODE_ENV=production BIRD_DB_HOST=$BIRD_DB_HOST BIRD_DB_PORT=$BIRD_DB_PORT BIRD_DB_NAME=$BIRD_DB_NAME BIRD_DB_USER=$BIRD_DB_USER BIRD_DB_PW=$BIRD_DB_PW BIRD_URL=$BIRD_URL BIRD_PORT=$BIRD_PORT ./nodejs/installation/bin/node package/app.js