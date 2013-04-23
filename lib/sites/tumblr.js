var   request   = require('request');

module.exports = function (url, parsedUrl, callbacks) {


  if (!callbacks.image)
    return false;


  // If not photobucket URL (not direct link), discart it
  if (!(parsedUrl.host.match(/^(.+?)\.tumblr\.com\.?$/) && parsedUrl.pathname.match(/^\/post\//)))
    return false;

  var site = "tumblr.com";

  // Request to tumblr, let's find out about the content
  request({url:url.split('?')[0],pool:false}, function (error, response, body) {

    // If there was an error upon connecting, we log the error and get out
    if (error) {
      callbacks.error(error, site);
      return true;
    }

    // We look for the correct tag in the body 
    try{
    
      // Image only section
      if (body.match(/twitter:card.+?content="photo"/)) {
        var matches = body.match(/twitter:image.+?content="(.+?)"/);
        callbacks.image(matches[1], site);
      }

      else 
        if (callbacks.noMedia)
          callbacks.noMedia(url);

    } catch (err) {
      callbacks.error(err.message, site);
    }

  });
  return true;

}