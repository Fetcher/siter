var   request   = require('request'),
      URL       = require('url');

module.exports = function (url, callbacks) {

  // Image only
  if (!callbacks.image)  
    return false;

  // If not 9gag URL, discarting
  var parsedUrl = URL.parse(url); 
  if (!(parsedUrl.host.match(/(www\.)?9gag\.com\.?$/) && parsedUrl.pathname.match(/^\/gag\/\d+\/?$/)))
    return false;

  var site = "9gag.com";

  // Request to twitter, let's find out about the image
  request(url.split('?')[0], function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      callbacks.error(error, site);
      return true;
    }

    // We look for the correct tag in the body
    try{
      var matches = body.match(/src="(.+?)".+max-width:/);

      callbacks.image(matches[1], site);
    } catch (err) {
      callbacks.error(err.message, site);
    }

  });
  return true;

}