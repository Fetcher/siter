var   request   = require('request'),
      URL       = require('url');

module.exports = function (url, callbacks) {
  
  // Video only
  if (!callbacks.video)
    return false;

  // If not dailymotion URL, discarting
  var parsedUrl = URL.parse(url); 
  if (!(parsedUrl.host.match(/(www\.)?([0-9a-zA-Z]+\.)?dailymotion\.com\.?/) && parsedUrl.pathname.match(/\/video\/[0-9a-zA-Z]+/)))
    return false; 


  var site = "dailymotion.com"

  try {
    callbacks.video(
      'http://www.dailymotion.com/embed/video/' + parsedUrl.pathname.match(/\/video\/([0-9a-zA-Z]+)/)[1],
      site
    );
  } catch(err) {
    callbacks.error(err.message, site);
  }

  return true;

}