var   request   = require('request'),
      URL       = require('url');

module.exports = function (argumentos) {
  
  // If not google URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?google(\.com|\.co\.\w\w\w?|\.\w\w\w?|\.com\.\w\w\w?)\.?/) && url.pathname.match(/^\/imgres$/)))
    return false; 

  var site = "images.google.com";

  try {
    argumentos.success(url.path.match(/imgurl=(.+?)&/)[1], site);
  } catch(err) {
    argumentos.failure(err.message, site);
  }

  return true;

}