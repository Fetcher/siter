var   request   = require('request'),
      URL       = require('url');

exports = module.exports = siter;

function siter(url, callbacks) {

  var parsedUrl = URL.parse(url);
  if (!parsedUrl.protocol ||
     !(parsedUrl.protocol.toLowerCase() == "http:" || 
       parsedUrl.protocol.toLowerCase() == "https:"))
  {
    return callbacks.error('Invalid URL, not http OR https');
  }

  // Twitter Picture
  if (require('./sites/picTwitter.js')(url, parsedUrl, callbacks)) return;

  // 9gag! Picture
  if (require('./sites/9gag.js')(url, parsedUrl, callbacks)) return;

  // Instagram! Picture
  if (require('./sites/instagram.js')(url, parsedUrl, callbacks)) return;

  // Facebook! Picture
  // Doesn't work
  //if (require('./sites/facebook.js')(url, parsedUrl, callbacks)) return;

  // Google! Picture
  if (require('./sites/google.js')(url, parsedUrl, callbacks)) return;

  // Google Plus+! Picture
  if (require('./sites/googleplus.js')(url, parsedUrl, callbacks)) return;

  // Pinterest! Picture
  if (require('./sites/pinterest.js')(url, parsedUrl, callbacks)) return;

  // Flickr Picture
  if (require('./sites/flickr.js')(url, parsedUrl, callbacks)) return;
  
  // Deviantart Picture
  if (require('./sites/deviantart.js')(url, parsedUrl, callbacks)) return;

  // YouTube
  if (require('./sites/youtube.js')(url, parsedUrl, callbacks)) return;
  
  // Vimeo
  if (require('./sites/vimeo.js')(url, parsedUrl, callbacks)) return;

  // Dailymotion
  if (require('./sites/dailymotion.js')(url, parsedUrl, callbacks)) return;

  // Vine.co
  if (require('./sites/vine.js')(url, parsedUrl, callbacks)) return;  

  // Xvideos.com
  if (require('./sites/xvideos.js')(url, parsedUrl, callbacks)) return;  

  // Porntube.com
  if (require('./sites/porntube.js')(url, parsedUrl, callbacks)) return;  

  // Photobucket.com
  if (require('./sites/photobucket.js')(url, parsedUrl, callbacks)) return;  

  // Tumblr.com
  if (require('./sites/tumblr.js')(url, parsedUrl, callbacks)) return;

  //if (require('./sites/twittercards.js')(url, parsedUrl, callbacks)) return;  

  
  // HEAD request of none has captured it
  if (callbacks.image) {
    request.head({ uri: url ,
                     headers: { "User-Agent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410."}}
                    , function (error, response, body) {

      if (error) return callbacks.error(error, null);

      var contentType = response.headers['content-type'];
      
      // Check if content type exists and is some kind of image
      if (contentType && contentType.match(/^image/)) 

        // If it really is an image, we just call the success callback
        callbacks.image(url, null);

      // Otherwise try with all the sites managers
      else {
        
        // OpenGraph
        if (require('./sites/opengraph2.js')(url, parsedUrl, callbacks)) return;  

        // Twitcards / Our Last Hope
        if (require('./sites/twitternocheerio.js')(url, parsedUrl, callbacks)) return;  

        // If no site captured the URL, we assume is not an image
        callbacks.noMedia(url);
      }

    });
  }  

}