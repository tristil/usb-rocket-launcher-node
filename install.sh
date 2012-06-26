#!/usr/bin/env bash

echo ""
echo "npm install..."
echo ""

npm install

echo ""
echo "cd node_modules..."
echo ""

cd node_modules

if [ ! -d "node-usb" ];
then

  echo ""
  echo "Cloning node-usb..."
  echo ""

  git clone git://github.com/schakko/node-usb.git
fi

cd node-usb
git checkout -b old-reliable 61986afa8d9cdf28121d29d47d28a57da0f7d853

echo ""
echo "Compiling..."
echo ""

make
cd ../..

echo ""
echo "Installing udev rule..."
echo ""

sudo cp 70-usb-rocket-launcher.rules /etc/udev/rules.d/

echo ""
echo "Create 'rocket' group..."
echo ""
sudo addgroup rocket

echo ""
echo "Adding current user to 'rocket' group..."
echo ""
sudo addgroup `whoami` rocket
