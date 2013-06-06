var   request   = require('request');

module.exports = function (url, parsedUrl, callbacks) {

  // Image only
  if (!callbacks.image)  
    return false;

  // If not 9gag URL, discarting
//  http://9gag.com/gag/aq90mYL?ref=mobile
  if (!(parsedUrl.host.match(/^(www\.)?9gag\.com\.?$/) && parsedUrl.pathname.match(/^\/gag\/[0-9a-zA-Z]+\/?$/)))
    return false;

  var site = "9gag.com";

  // Request to twitter, let's find out about the image
  request({url:url.split('?')[0],pool:false}, function (error, response, body) {
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
      callbacks.error(err, site);
    }

  });
  return true;

}