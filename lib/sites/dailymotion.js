
module.exports = function (url, parsedUrl, callbacks) {
  
  // Video only
  if (!callbacks.video)
    return false;

  // If not dailymotion URL, discarting
  if (
    !(parsedUrl.host.match(/(www\.)?([0-9a-zA-Z]+\.)?dailymotion\.com\.?/) && parsedUrl.pathname.match(/\/video\/[0-9a-zA-Z]+/)) &&
    !(parsedUrl.host.match(/(www\.)?([0-9a-zA-Z]+\.)?dailymotion\.com\.?/) && parsedUrl.path.match(/video=[0-9a-zA-Z]+/))
  ) return false; 

  var site = "dailymotion.com"


  try {
    if (parsedUrl.pathname.match(/\/video\/[0-9a-zA-Z]+/)) {    
      callbacks.video(
        'http://www.dailymotion.com/embed/video/' + parsedUrl.pathname.match(/\/video\/([0-9a-zA-Z]+)/)[1],
        site
      );
    }
    else if (parsedUrl.path.match(/video=[0-9a-zA-Z]+/)) {    
      callbacks.video(
        'http://www.dailymotion.com/embed/video/' + parsedUrl.path.match(/\/video=([0-9a-zA-Z]+)/)[1],
        site
      );
    }
  } catch(err) {
    callbacks.error(err, site);
  }

  return true;

}