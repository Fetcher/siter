var   request   = require('request');

module.exports = function (url, parsedUrl, callbacks) {

  // Article only
  if (!callbacks.article)  
    return false;

  // Request to the site, let's find out about the image
  request({url:url, pool:false}, function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      callbacks.error(error, site);
      return true;
    }

    // We look for the correct tag in the body
    try{
      var urlMatches = body.match(/name="twitter:url"\s+?content="(.+?)"/);
      var titleMatches = body.match(/name="twitter:title"\s+?content="(.+?)"/);
      var descriptionMatches = body.match(/name="twitter:description".+?content="([\s\S]+?)"/);

      callbacks.article(
        urlMatches[1], null, {title: titleMatches[1], description: descriptionMatches[1]}
      );
    } catch (err) {
      callbacks.noMedia(url, null);
    }

  });

  return true;

}