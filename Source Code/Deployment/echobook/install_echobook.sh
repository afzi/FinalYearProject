#!/bin/bash
NODE_X64=./dependencies/x64/node-v9.8.0-linux-x64.tar.xz
NODE_X86=./dependencies/x64/node-v9.8.0-linux-x86.tar.xz

ECHOBOOK_ARCHIVE=echobook-0.0.1.tgz

echo "Installing Node & NPM..."
rm -rf nodejs
mkdir nodejs
if [ `getconf LONG_BIT` = "64" ]
then
	tar -xJf $NODE_X64 -C ./nodejs
else
	tar -xJf $NODE_X86 -C ./nodejs
fi

mv ./nodejs/* ./nodejs/installation

echo "Installing EchoBook..."
rm -rf package
tar -xf $ECHOBOOK_ARCHIVE