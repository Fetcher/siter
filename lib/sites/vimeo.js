var   request   = require('request'),
      URL       = require('url'),
      color     = require('cli-color');

var winston =  require('winston');

module.exports = function (argumentos) {
  
  // If not vimeo URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?([0-9a-zA-Z]+\.)?vimeo\.com\.?/) && url.pathname.match(/^\/(\w+\/\w+\/)?[0-9]+/))
    && !(url.host.match(/^player\.vimeo\.com$/) && url.pathname.match(/^\/video\/[0-9]+/)))
    return false; 


  winston.info("Is vimeo");
  try {
    argumentos.success('http://player.vimeo.com/video/' + url.pathname.match(/\/([0-9]+)$/)[1]);
  } catch(err) {
    winston.error(color.red(err.message));
  }

  return true;

}