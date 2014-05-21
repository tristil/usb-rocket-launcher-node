var usb         = require('usb'),
    _           = require('underscore'),
    async       = require('async');

usb.setDebugLevel(3);

function RocketLauncher()
{
  this.launcher_device = null;

  this.commands = {
    'down'        :   0x01,
    'up'          :   0x02,
    'left'        :   0x04,
    'right'       :   0x08,
    'shoot'       :   0x10,
    'stop'        :   0x20,
    'boom'        :   0x40
  };

  this.acquireDevice = function()
  {
    var launcher_device = usb.findByIds(8483, 4112);
    this.launcher_device = launcher_device;
  }

  this.runCommand = function(command)
  {
    console.log('Command is "'+ command +'"');

    if(this.commands[command])
    {
      signal = this.commands[command];
    }
    else if(command == 'test')
    {
      return this.testFunctions();
    }
    else
    {
      signal = eval(command);
    }

    this.launcher_device.controlTransfer(
      0x21,
      0x09,
      0x0,
      0x0,
      new Buffer([0x02, signal, 0x00,0x00,0x00,0x00,0x00,0x00]),
      function(data)
      {
        console.log(command)
        console.log(data);
      }
    );
  };

  this.testFunctions = function()
  {
    var launcher = this;
    var tests = [];
    var i = 0;
    while(i < 100)
    {
      (function (i)
       {
         var func = function(callback)
         {
           console.log('i is ' + i);
           launcher.runCommand(i);
           setTimeout(
             function()
             {
               callback(null, i);
             },
             1000
             );
         };
         tests.push(func);
       })(i);

       i++;
    }

    async.series(
        tests,
        function(err, results)
        {
        }
        );
    return;
  }

  this.quit = function() {
    this.launcher_interface.release(
    function(data) {
      console.log('released')
      process.exit();
    });
  }

  this.up = function() { this.runCommand('up') };
  this.down = function() { this.runCommand('down') };
  this.left = function() { this.runCommand('left') };
  this.right = function() { this.runCommand('right') };
  this.shoot = function() { this.runCommand('shoot') };
  this.stop = function() { this.runCommand('stop') };
  this.boom = function() { this.runCommand('boom') };

  this.init = function()
  {
    this.acquireDevice();

    this.launcher_device.open();
    this.launcher_interface = this.launcher_device.interfaces[0];
    if (this.launcher_interface.isKernelDriverActive()) {
      this.launcher_interface.detachKernelDriver();
    }
    // this.launcher_interface.claim();
  };

  this.init();
}

exports.RocketLauncher = RocketLauncher;
