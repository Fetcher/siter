      
module.exports = function (url, parsedUrl, callbacks) {
  
  // Video only
  if (!callbacks.video)
    return false;

  // If not vine URL, discarting
  if (
    !(parsedUrl.host.match(/^(www\.)?vine\.co\.?$/) && 
    parsedUrl.pathname.match(/^\/v\/[0-9a-zA-Z]+/))
  ) return false; 

  var site = "vine.com";

  try {
    callbacks.video(
      'http://vine.co/v/' + parsedUrl.pathname.match(/^\/v\/([0-9a-zA-Z]+)/)[1] + '/embed/simple',
      site
    );
  } catch(err) {
    callbacks.error(err.message, site);
  }

  return true;

}
