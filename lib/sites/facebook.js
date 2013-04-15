var   request   = require('request'),
      URL       = require('url');

module.exports = function (argumentos) {
  
  // If not facebook URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.pathname.match(/photo\.php$/) && url.host.match(/(www\.)?facebook\.com\.?/)))
    return false;

  var site = "facebook.com";

  // Request to twitter, let's find out about the image
  request(argumentos.url, function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      argumentos.error(error, site);
      return true;
    }

    // We look for the correct tag in the body
    var matches = body.match(/id="fbPhotoImage".+src="(.+?)"/);

    try {
      argumentos.success(matches[1], site);
    } catch(err) {
      argumentos.error(err.message, site);
    }

  });
  return true;

}