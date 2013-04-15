var   request   = require('request'),
      URL       = require('url');

module.exports = function (argumentos) {
  
  // If not dailymotion URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?([0-9a-zA-Z]+\.)?dailymotion\.com\.?/) && url.pathname.match(/\/video\/[0-9a-zA-Z]+/)))
    return false; 


  var site = "dailymotion.com"

  try {
    argumentos.success(
      'http://www.dailymotion.com/embed/video/' + url.pathname.match(/\/video\/([0-9a-zA-Z]+)/)[1],
      site
    );
  } catch(err) {
    argumentos.error(err.message, site);
  }

  return true;

}