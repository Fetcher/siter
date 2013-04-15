var   request   = require('request'),
      URL       = require('url');

module.exports = function (argumentos) {
  
  // If not twitter URL, discarting
  var url = URL.parse(argumentos.url); 

  if (!url.host.match(/^pic\.twitter\.com\.?/) && !(url.path.match(/photo\/\d+$/) && url.host.match(/(www\.)?twitter\.com\.?/)))
    return false;


  var site = "pic.twitter.com";

  // Request to twitter, let's find out about the image
  request(argumentos.url, function (error, response, body) {
    
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      argumentos.error(error, site);
      return true;
    }

    // We look for the correct tag in the body
    var matches = body.match(/media-slideshow-image.+src="(.+?)"/);

    try {
      // If everything is all right (not actually testing though)
      argumentos.success(matches[1], site); 
    } catch (err) {
      argumentos.error(err.message, site);
    }

  });

  return true;
}