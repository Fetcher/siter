var   request   = require('request'),
      URL       = require('url'),
      color     = require('cli-color');

var winston = require('winston');

module.exports = function (argumentos) {
  
  // If not dailymotion URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?([0-9a-zA-Z]+\.)?dailymotion\.com\.?/) && url.pathname.match(/\/video\/[0-9a-zA-Z]+/)))
    return false; 


  winston.info("Is dailymotion");

  try {
    argumentos.success('http://www.dailymotion.com/embed/video/' + url.pathname.match(/\/video\/([0-9a-zA-Z]+)/)[1]);
  } catch(err) {
    winston.error(color.red(err.message));
  }

  return true;

}