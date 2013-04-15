var   request   = require('request'),
      URL       = require('url'),
      color     = require('cli-color');

var winston = require('winston');

module.exports = function (argumentos) {
  
  // If not google URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?google(\.com|\.co\.\w\w\w?|\.\w\w\w?|\.com\.\w\w\w?)\.?/) && url.pathname.match(/^\/imgres$/)))
    return false; 

  winston.info("Is google images");

  try {
    argumentos.success(url.path.match(/imgurl=(.+?)&/)[1]);
  } catch(err) {
    winston.error(color.red(err.message));
  }

  return true;

}