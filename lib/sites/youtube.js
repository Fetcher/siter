
module.exports = function (url, parsedUrl, callbacks) {

  // Video only
  if (!callbacks.video)
    return false;

  // If not youtube URL, discarting
  if (
    !(parsedUrl.host.match(/(www\.)?([0-9a-zA-Z]+\.)?youtube\.com\.?/) && 
    parsedUrl.pathname.match(/^\/(watch|embed\/)/)) && 
    !(parsedUrl.host.match(/^youtu\.be$/))
  ) return false; 

  var site = "youtube.com";

  try {
    if (parsedUrl.host.match(/^youtu\.be$/))
      callbacks.video(
        'http://youtube.com/embed/' + parsedUrl.pathname.match(/^\/([a-zA-Z0-9\-]+)/)[1],
        site
      );
    else
      if (parsedUrl.pathname.match(/^\/embed\//))
        callbacks.video(
          'http://youtube.com/embed/' + parsedUrl.path.match(/^\/embed\/([a-zA-Z0-9\-]+)/)[1],
          site
        );
      else
        callbacks.video(
          'http://youtube.com/embed/' + parsedUrl.path.match(/v=([a-zA-Z0-9\-\_]+)/)[1],
          site
        );
  } catch (err) {
    callbacks.error(
      err.message, 
      site
    );
  }

  return true;

}
