var   request   = require('request'),
      URL       = require('url');


module.exports = function (argumentos) {
  
  // If not googleplus+ URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?plus\.google\.com\.?/) && url.pathname.match(/^\/photos\/[0-9a-zA-Z]+\/albums\/[0-9a-zA-Z]+/)))
    return false; 


  var site = "plus.google.com";

  // Request to twitter, let's find out about the image
  request(argumentos.url, function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      argumentos.failure(error, site);
      return;
    }
    // We look for the correct tag in the body
    var matches = body.match(/og:image"\s+content="(.+?)"/);

    try {
      argumentos.success(matches[1], site);
    } catch(err) {
      argumentos.failure(err.message, site);
    }

  });

  return true;

}