#!/bin/bash

COORDINATOR_ARCHIVE=coordinator-service.tar.gz
echo "Installing Coordinator Service..."
rm -rf coordinator-service
mkdir coordinator-service
tar -xf $COORDINATOR_ARCHIVE -C coordinator-service
echo "Installation complete - don't forget to update config.py before launching"
