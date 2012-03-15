import unittest
import launcher

class RocketLauncherTest(unittest.TestCase):
  def testGetDevice(self):
    rocker_launcher = launcher.RocketLauncher()
    device = rocker_launcher.getDevice()
    self.assertEqual(device.__class__.__name__, 'Device')

if __name__ == '__main__':
  unittest.main()
