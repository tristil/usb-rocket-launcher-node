var usb_binding = require('node-usb'),
    _  = require('underscore');


function RocketLauncher()
{
  this.launcher_device = null;

  this.commands = {
    'up'          :   0x01,
    'down'        :   0x02,
    'left'        :   0x04,
    'right'       :   0x08,
    'shoot'       :   0x10,
    'stop'        :   0x20,
    'boom'        :   0x40
  };

  this.acquireDevice = function()
  {
    var usb = new usb_binding.Usb();
    usb.refresh();
    usb.setDebugLevel(3);
    var devices = usb.getDevices();

    launcher_device = null;

    _.each(devices, function(device)
    {
      var descriptor = device.getDeviceDescriptor();
      if(descriptor.idVendor == 8483 && descriptor.idProduct == 4112)
      {
        console.log('Found device ' + descriptor.idProduct);
        launcher_device = device;
        return false;
      }
    }
    );

    this.launcher_device = launcher_device;
  }

  this.runCommand = function(command)
  {
    console.log('Command is "'+ command +'"');

    if(this.commands[command])
    {
      signal = this.commands[command];
    }
    else
    {
      signal = eval(command);
    }

    this.launcher_device.controlTransfer(
      [0x02, signal, 0x00,0x00,0x00,0x00,0x00,0x00],
      0x21,0x09, 0x0, 0x0,
      function(data)
      {
        console.log(command)
        console.log(data);
      }
    );
  };

  this.quit = function()
  {
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

    this.launcher_interface = this.launcher_device.getInterfaces()[0];
    this.launcher_interface.detachKernelDriver();
    this.launcher_interface.claim();
  };

  this.init();
}

launcher = new RocketLauncher();

var stdin = process.openStdin();
require('tty').setRawMode(true);


var queued_command = '';

stdin.on('keypress', function(chunk, key) {

    console.log(key);
    console.log(chunk);

    if(key && key.ctrl && key.name == 'c')
    {
      launcher.quit();
    }
    else if(key && key.name == 'j')
    {
      launcher.up();
    }
    else if(key && key.name == 'k')
    {
      launcher.down();
    }
    else if(key && key.name == 'h')
    {
      launcher.left();
    }
    else if(key && key.name == 'l')
    {
      launcher.right();
    }
    else if(key && key.name == 'g')
    {
      launcher.shoot();
    }
    else if(key && key.name == 'f')
    {
      launcher.stop();
    }
    else if(key && key.name == 'd')
    {
      launcher.boom();
    }
    else if(key && key.name == "enter")
    {
      launcher.runCommand(queued_command);
      queued_command = "";
    }
    else
    {
      queued_command = queued_command + chunk;
      console.log("Queued command is: " + queued_command + "\n");
    }
});
