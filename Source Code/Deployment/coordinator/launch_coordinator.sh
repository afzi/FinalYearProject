#!/bin/bash
if [ ! -f ./coordinator-service/start.py ]; then
    echo "Could not find ./coordinator-service/start.py - please make sure you've installed the service before running this script"
	exit 1
fi

source ./coordinator-service/env/bin/activate
python coordinator-service/start.py
