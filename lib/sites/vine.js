var   request   = require('request'),
      URL       = require('url');
      
module.exports = function (url, callbacks) {
  
  // Video only
  if (!callbacks.video)
    return false;

  // If not vine URL, discarting
  var parsedUrl = URL.parse(url); 
  if (
    !(parsedUrl.host.match(/^(www\.)?vine\.co\.?$/) && 
    parsedUrl.pathname.match(/^\/v\/[0-9a-zA-Z]+/))
  ) return false; 

  var site = "vine.com";

  try {
    callbacks.video(
      'http://vine.co/v/' + url.pathname.match(/^\/v\/([0-9a-zA-Z]+)/)[1] + '/embed/simple',
      site
    );
  } catch(err) {
    callbacks.error(err.message, site);
  }

  return true;

}
