var   request   = require('request'),
      URL       = require('url');

module.exports = function (url, callbacks) {
  
  // Image only
  if (!callbacks.image)
    return false;

  // If not facebook URL, discarting
  var parsedUrl = URL.parse(url); 
  if (!(parsedUrl.pathname.match(/photo\.php$/) && parsedUrl.host.match(/(www\.)?facebook\.com\.?/)))
    return false;

  var site = "facebook.com";

  // Request to twitter, let's find out about the image
  request(url, function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      callbacks.error(error, site);
      return true;
    }

    // We look for the correct tag in the body
    var matches = body.match(/id="fbPhotoImage".+src="(.+?)"/);

    try {
      callbacks.image(matches[1], site);
    } catch(err) {
      callbacks.error(err.message, site);
    }

  });
  return true;

}