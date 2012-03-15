import usb
import warnings

class RocketLauncher(object):

  device = None

  def __init__(self):
    self.getDevice()

  def getDevice(self):
    if self.device == None:
      devices = usb.core.find(True)
      for device in devices:
        print device
        for cfg in device:
          print cfg
          for interface in cfg:
            print interface

            interface_number = interface.bInterfaceNumber

            intf = usb.util.find_descriptor(
                cfg,
                bInterfaceNumber = interface.bInterfaceNumber
            )
            print dir(intf)

            print "===="

    return self.device

rocket_launcher = RocketLauncher()
