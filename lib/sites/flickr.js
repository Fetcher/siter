var   request   = require('request');

module.exports = function (url, parsedUrl, callbacks) {
  
  // Image only
  if (!callbacks.image)
    return false;

  // If not flickr URL, discarting
  if (!(parsedUrl.host.match(/(www\.)?flickr\.com\.?/) && parsedUrl.pathname.match(/^\/photos\/[0-9a-zA-Z]+\/[0-9]+/)))
    return false; 


  var site = "flickr.com";
  // Request to twitter, let's find out about the image
  request({url:url,pool:false}, function (error, response, body) { 
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      callbacks.error(error, site);
      return true;
    }

    // We look for the correct tag in the body
    var matches = body.match(/og:image.+content="(.+?)"/);

    try {
      callbacks.image(matches[1], site);
    } catch(err) {
      callbacks.error(err, site);
    }

  });
  return true;

}