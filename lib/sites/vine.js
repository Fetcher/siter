var   request   = require('request'),
      URL       = require('url'),
      color     = require('cli-color');

var   winston   = require('winston');
module.exports = function (argumentos) {
  
  // If not vine URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/^(www\.)?vine\.co\.?$/) && url.pathname.match(/^\/v\/[0-9a-zA-Z]+/)))
    return false; 


  winston.info("Is Vine");

  try {
    argumentos.success('http://vine.co/v/' + url.pathname.match(/^\/v\/([0-9a-zA-Z]+)/)[1] + '/embed/simple');
  } catch(err) {
    winston.error(color.red(err.message));
  }

  return true;

}
