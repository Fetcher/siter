var   request   = require('request'),
      URL       = require('url');

module.exports = function (argumentos) {
  
  // If not deviantart URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?([0-9a-zA-Z]+\.)?deviantart\.com\.?/) && url.pathname.match(/^\/art\/[0-9a-zA-Z]+/)))
    return false; 


  var site = "deviantart.com";
  
  // Request to twitter, let's find out about the image
  request(argumentos.url, function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      argumentos.error(error, site);
      return true;
    }

    // We look for the correct tag in the body
    var matches = body.match(/og:image.+content="(.+?)"/);

    try {
      argumentos.success(matches[1], site);
    } catch(err) {
      argumentos.error(err.message, site);
    }

  });
  return true;

}