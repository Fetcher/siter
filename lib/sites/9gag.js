var   request   = require('request'),
      URL       = require('url'),
      winston   = require('winston'),
      color     = require('cli-color');

module.exports = function (argumentos) {
  
  // If not 9gag URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?9gag\.com\.?$/) && url.pathname.match(/^\/gag\/\d+\/?$/)))
    return false;

  winston.info(color.yellow("Is 9GAG!"));

  // Request to twitter, let's find out about the image
  request(argumentos.url.split('?')[0], function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) return winston.debug(color.red(error));
    // We look for the correct tag in the body
    try{
      var matches = body.match(/src="(.+?)".+max-width:/);

      argumentos.success(matches[1]);
    } catch (err) {
      winston.error(color.red(err.message));
    }

  });
  return true;

}