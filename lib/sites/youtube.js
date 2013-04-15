var   request   = require('request'),
      URL       = require('url'),
      color     = require('cli-color');

var   winston   = require('winston');

module.exports = function (argumentos) {

  // If not youtube URL, discarting
  var url = URL.parse(argumentos.url); 
  if (!(url.host.match(/(www\.)?([0-9a-zA-Z]+\.)?youtube\.com\.?/) && url.pathname.match(/^\/(watch|embed\/)/)) && !(url.host.match(/^youtu\.be$/)))
    return false; 

  winston.info("Is youtube");

  try {
    if (url.host.match(/^youtu\.be$/))
      argumentos.success('http://youtube.com/embed/' + url.pathname.match(/^\/([a-zA-Z0-9\-]+)/)[1]);
    else
      if (url.pathname.match(/^\/embed\//))
        argumentos.success('http://youtube.com/embed/' + url.path.match(/^\/embed\/([a-zA-Z0-9\-]+)/)[1]);
      else
        argumentos.success('http://youtube.com/embed/' + url.path.match(/v=([a-zA-Z0-9\-\_]+)/)[1]);
  } catch (err) {
    winston.error(color.red(err.message));
  }

  return true;

}
