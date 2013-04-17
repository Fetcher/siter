var   request   = require('request');

module.exports = function (url, parsedUrl, callbacks) {
  
  // Image only
  if (!callbacks.image)
    return false;

  // If not twitter URL, discarting

  if (
    !parsedUrl.host.match(/^pic\.twitter\.com\.?/) && 
    !(parsedUrl.path.match(/photo\/\d+$/) && parsedUrl.host.match(/(www\.)?twitter\.com\.?/))
  ) return false;

  var site = "pic.twitter.com";
  // Request to twitter, let's find out about the image
  request({url:url,pool:false}, function (error, response, body) { 
    
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      callbacks.error(error, site);
      return true;
    }

    // We look for the correct tag in the body
    var matches = body.match(/media-slideshow-image.+src="(.+?)"/);

    try {
      // If everything is all right (not actually testing though)
      callbacks.image(matches[1], site); 
    } catch (err) {
      callbacks.error(err.message, site);
    }

  });

  return true;
}