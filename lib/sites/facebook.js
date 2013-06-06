var   request   = require('request');

module.exports = function (url, parsedUrl, callbacks) {
  
  // Image only
  if (!callbacks.image)
    return false;

  // If not facebook URL, discarting
  if (!(parsedUrl.pathname.match(/^\/photo\.php$/) && parsedUrl.host.match(/(www\.)?facebook\.com\.?/)))
    return false;

  var site = "facebook.com";
  // Request to twitter, let's find out about the image
  request({url:url,pool:false, headers: { "User-Agent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410."}}, function (error, response, body) { 
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      callbacks.error(error, site);
      return true;
    }

    console.log(body);

    // We look for the correct tag in the body
    var matches = body.match(/id="fbPhotoImage".+src="(.+?)"/);

    try {
      callbacks.image(matches[1], site);
    } catch(err) {
      callbacks.error(err, site);
    }

  });
  return true;

}