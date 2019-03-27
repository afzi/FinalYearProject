To package for offline:

-make sure any production dependencies are added to bundleDependencies in package.json
-from root folder (currently nfc-bird-application), run 'npm install --no-bin-link' (internet connection required for this part)
-run 'npm pack'
-copy generated tarball to this folder

To run:
-run install_echobook.sh (make sure the correct tarball name is set at the top of the script)
-run launch_echobook.sh