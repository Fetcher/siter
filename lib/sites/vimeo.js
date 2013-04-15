var   request   = require('request'),
      URL       = require('url');

module.exports = function (url, callbacks) {
  
  // Video only
  if (!callbacks.video)
    return false;

  // If not vimeo URL, discarting
  var parsedUrl = URL.parse(url); 
  if (
    !(parsedUrl.host.match(/(www\.)?([0-9a-zA-Z]+\.)?vimeo\.com\.?/) && parsedUrl.pathname.match(/^\/(\w+\/\w+\/)?[0-9]+/)) && 
    !(parsedUrl.host.match(/^player\.vimeo\.com$/) && parsedUrl.pathname.match(/^\/video\/[0-9]+/))
  ) return false; 

  var site = "vimeo.com";

  try {
    callbacks.video(
      'http://player.vimeo.com/video/' + url.pathname.match(/\/([0-9]+)$/)[1],
      site
    );
  } catch(err) {
    callbacks.error(err.message, site);
  }

  return true;

}