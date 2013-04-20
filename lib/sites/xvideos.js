
// http://www.xvideos.com/video545198/sasha_grey_pov_centerfolds
// http://flashservice.xvideos.com/embedframe/545198

module.exports = function (url, parsedUrl, callbacks) {
  
  // Video only
  if (!callbacks.video)
    return false;

  // If not vine URL, discarting
  if (
    !(parsedUrl.host.match(/^(www\.)?xvideos\.com\.?$/) && 
    parsedUrl.pathname.match(/^\/video[0-9]+/))
  ) return false; 

  var site = "xvideos.com";

  try {
    callbacks.video(
      'http://flashservice.xvideos.com/embedframe/' + parsedUrl.pathname.match(/^\/video([0-9]+)/)[1],
      site
    );
  } catch(err) {
    callbacks.error(err.message, site);
  }

  return true;

}
