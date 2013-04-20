// http://www.porntube.com/videos/livegonzo-madison-ivy-gorgeous-babe-gets-fucked_1260144
// http://embed.porntube.com/1260144

module.exports = function (url, parsedUrl, callbacks) {
  
  // Video only
  if (!callbacks.video)
    return false;

  // If not vine URL, discarting
  if (
    !(parsedUrl.host.match(/^(www\.)?porntube\.com\.?$/) && 
    parsedUrl.pathname.match(/^\/videos\/[a-zA-Z0-9\-]+_[0-9]+/))
  ) return false; 

  var site = "porntube.com";

  try {
    callbacks.video(
      'http://embed.porntube.com/' + parsedUrl.pathname.match(/^\/videos\/[a-zA-Z0-9\-]+_([0-9]+)/)[1],
      site
    );
  } catch(err) {
    callbacks.error(err.message, site);
  }

  return true;

}
