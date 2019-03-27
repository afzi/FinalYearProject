To package for offline deployment:

From coordinator-service folder (internet connection, python3, pip and virtualenv required for this part):

pip install -r requirements.txt
virtualenv env --python=python3
tar -czvf coordinator-service.tar.gz *

Copy generated tarball to this folder.
To install, run install_coordinator.sh
Set any required parameters in coordinator-service/config.py
To launch, run launch_coordinator.sh
