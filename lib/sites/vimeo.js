
module.exports = function (url, parsedUrl, callbacks) {
  
  // Video only
  if (!callbacks.video)
    return false;

  // If not vimeo URL, discarting
  if (
    !(parsedUrl.host.match(/(www\.)?([0-9a-zA-Z]+\.)?vimeo\.com\.?/) && parsedUrl.pathname.match(/^\/(\w+\/\w+\/)?[0-9]+/)) && 
    !(parsedUrl.host.match(/^player\.vimeo\.com$/) && parsedUrl.pathname.match(/^\/video\/[0-9]+/))
  ) return false; 

  var site = "vimeo.com";

  try {
    callbacks.video(
      'http://player.vimeo.com/video/' + parsedUrl.pathname.match(/\/([0-9]+)$/)[1],
      site
    );
  } catch(err) {
    callbacks.error(err, site);
  }

  return true;

}