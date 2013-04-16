var   request   = require('request'),
      URL       = require('url');

module.exports = function (url, callbacks) {
  
  // Image only
  if (!callbacks.image)
    return false;

  // If not google URL, discarting
  var parsedUrl = URL.parse(url); 
  if (!(parsedUrl.host.match(/(www\.)?google(\.com|\.co\.\w\w\w?|\.\w\w\w?|\.com\.\w\w\w?)\.?/) && parsedUrl.pathname.match(/^\/imgres$/)))
    return false; 

  var site = "images.google.com";

  try {
    var imageUrl = parsedUrl.path.match(/imgurl=(.+?)&/)[1];
    
    if (imageUrl.substring(0, 5) == "http%")
      imageUrl = decodeURIComponent(imageUrl);  

    callbacks.image(imageUrl, site);
  } catch(err) {
    callbacks.error(err.message, site);
  }

  return true;

}