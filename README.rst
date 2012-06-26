What Is It?
-----------

This code contains two things:

* A driver for the Dream Cheeky Thunder Missile Launcher
  (http://www.dreamcheeky.com/thunder-missile-launcher), written in Nodejs
  using the node-usb library (https://github.com/schakko/node-usb).
* A Nodejs/Express web interface for controlling the launcher. The frontend
  interface is implemented with jQuery Mobile (http://jquerymobile.com)
  allowing the rocket launcher to be controlled with a touch screen on a smart
  phone or tablet.

Requirements
------------

* Nodejs (developed on 0.6.13
* node-usb package
* express and dependencies
* run_server.sh uses supervisor package

Setup
-----
* Run ./install.sh to download and compile a copy of node-usb library and
  install a udev rule that will grant access to the usb device for members of
  group 'rocket'. This will require sudo.
* After this you will have to add your current user to group 'rocket'. You may
  have to unplug and replug the device to get the correct permissions.
* ./cli will give direct access to the rocket launcher, using f(stop),
  g(shoot), h(left), j(up), k(down), l(right) keys.
* ./run_dev_server.sh will launch the web interface at port 3033 and
  automatically restart the server when code is changed.
* Use NODE_ENV=production node app.js to run in production. If you already have
  Apache running on port 80 you'll have to change the port in app.js.

Notes
-----

* Heavily indebted to the pyrocket code (http://code.google.com/p/pyrocket/) . The only reason that I developed the
  driver using Node and node-usb was that it didn't cause a segfault when
  trying to grab the device on the hardware I was using (a Beaglebone running Angstrom). 
* The pyrocket source code lists device ids and command addresses for a variety
  of other rocket launchers. It would be easy to modify this code to run with
  them. I just don't have other rocket launcher models to play with.
* The next step is clearly to add a camera!
