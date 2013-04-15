var   request   = require('request'),
      URL       = require('url'),
      color     = require('cli-color');
var     winston   = require('winston');

module.exports = function (argumentos) {
  
  // If not twitter URL, discarting
  var url = URL.parse(argumentos.url); 

  if (!url.host.match(/^pic\.twitter\.com\.?/) && !(url.path.match(/photo\/\d+$/) && url.host.match(/(www\.)?twitter\.com\.?/)))
    return false;


  winston.info("Is twitter pic");

  // Request to twitter, let's find out about the image
  request(argumentos.url, function (error, response, body) {
    
    // If there was an error upon connecting, we log the error and get out
    if (error) return winston.debug(color.red(error));

    // We look for the correct tag in the body
    var matches = body.match(/media-slideshow-image.+src="(.+?)"/);

    try {
      // If everything is all right (not actually testing though)
      argumentos.success(matches[1]); 
    } catch (err) {
      winston.error(color.red(err.message));
    }

  });

  return true;
}