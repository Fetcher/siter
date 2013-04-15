var   request   = require('request'),
      URL       = require('url');

module.exports = function (argumentos) {
  
  // If not vimeo URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?([0-9a-zA-Z]+\.)?vimeo\.com\.?/) && url.pathname.match(/^\/(\w+\/\w+\/)?[0-9]+/))
    && !(url.host.match(/^player\.vimeo\.com$/) && url.pathname.match(/^\/video\/[0-9]+/)))
    return false; 

  var site = "vimeo.com";

  try {
    argumentos.success(
      'http://player.vimeo.com/video/' + url.pathname.match(/\/([0-9]+)$/)[1],
      site
    );
  } catch(err) {
    argumentos.failure(err.message, site);
  }

  return true;

}