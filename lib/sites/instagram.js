var   request   = require('request'),
      URL       = require('url'),
      color     = require('cli-color');
var     winston   = require('winston');

module.exports = function (argumentos) {
  
  // If not instagram URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?instagram\.com\.?$/) && url.pathname.match(/^\/p\/[0-9a-zA-Z\-]+\/?$/)))
    return false;

  winston.info("Is instagram");

  // Request to twitter, let's find out about the image
  request(argumentos.url, function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) return winston.debug(color.red(error));
    // We look for the correct tag in the body
    var matches = body.match(/og:image.+content="(.+?)"/);

    try {
      argumentos.success(matches[1]);
    } catch(err) {
      winston.error(color.red(err.message));
    }

  });
  return true;

}