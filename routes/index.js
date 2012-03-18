
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Foam Dart Rocket Launcher' })
};

exports.perform_command = function(req, res){
  var launcher = require('../launcher');
  launcher = new launcher.RocketLauncher();
  launcher.runCommand(req.params.command);
  res.send(req.params.command);
};
