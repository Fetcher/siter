var   request   = require('request'),
      URL       = require('url');
      
module.exports = function (argumentos) {
  
  // If not vine URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/^(www\.)?vine\.co\.?$/) && url.pathname.match(/^\/v\/[0-9a-zA-Z]+/)))
    return false; 


  var site = "vine.com";

  try {
    argumentos.success(
      'http://vine.co/v/' + url.pathname.match(/^\/v\/([0-9a-zA-Z]+)/)[1] + '/embed/simple',
      site
    );
  } catch(err) {
    argumentos.error(err.message, site);
  }

  return true;

}
