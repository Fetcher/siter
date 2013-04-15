var   request   = require('request'),
      URL       = require('url'),
      winston   = require('winston'),
      color     = require('cli-color');

module.exports = function (argumentos) {
  
  // If not facebook URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.pathname.match(/photo\.php$/) && url.host.match(/(www\.)?facebook\.com\.?/)))
    return false;

  winston.info("Is Facebook");

  // Request to twitter, let's find out about the image
  request(argumentos.url, function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) return winston.debug(color.red(error));
    // We look for the correct tag in the body
    var matches = body.match(/id="fbPhotoImage".+src="(.+?)"/);

    try {
      argumentos.success(matches[1]);
    } catch(err) {
      winston.error(color.red(err.message));
    }

  });
  return true;

}