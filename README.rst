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

Notes
-----

* Heavily indebted to the pyrocket code (http://code.google.com/p/pyrocket/) . The only reason that I developed the
  driver using Node and node-usb was that it didn't cause a segfault when
  trying to grab the device. 
* The pyrocket source code lists device ids and command addresses for a variety
  of other rocket launchers. It would be easy to modify this code to run with
  them. I just don't have other rocket launcher models to play with.
* The next step is clearly to add a camera!