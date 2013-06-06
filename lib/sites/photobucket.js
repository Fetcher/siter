// http://s29.photobucket.com/user/GI_Joe13/media/1237850127853-1.jpg.html
// http://i29.photobucket.com/albums/c299/GI_Joe13/1237850127853-1.jpg

var   request   = require('request');

module.exports = function (url, parsedUrl, callbacks) {

  // Image only
  if (!callbacks.image)  
    return false;

  // If not photobucket URL (not direct link), discart it
  if (!(parsedUrl.host.match(/\.photobucket\.com\.?$/) && parsedUrl.pathname.match(/^\/user\/.+?\/media(\/.+?)?\/.+?\.html$/)))
    return false;


  var site = "photobucket.com";

  // Request to photobucket, let's find out about the image
  request({url:url.split('?')[0],pool:false}, function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      callbacks.error(error, site);
      return true;
    }

    // We look for the correct tag in the body 
    try{
      text = body.split("\n").join("");
      var matches = text.match(/detail_direct_link_linkcode_click.+?value="(.+?)"/);

      callbacks.image(matches[1], site);
    } catch (err) {
      callbacks.error(err, site);
    }

  });
  return true;

}