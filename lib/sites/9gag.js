var   request   = require('request'),
      URL       = require('url');

module.exports = function (argumentos) {
  
  // If not 9gag URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?9gag\.com\.?$/) && url.pathname.match(/^\/gag\/\d+\/?$/)))
    return false;

  var site = "9gag.com";

  // Request to twitter, let's find out about the image
  request(argumentos.url.split('?')[0], function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      argumentos.failure(error, site);
      return true;
    }

    // We look for the correct tag in the body
    try{
      var matches = body.match(/src="(.+?)".+max-width:/);

      argumentos.success(matches[1], site);
    } catch (err) {
      argumentos.failure(err.message, site);
    }

  });
  return true;

}