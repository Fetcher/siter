var   request   = require('request'),
      URL       = require('url');

/*
var Checker = {

  // Check URL for image
  image: function (argumentos) {
    // Twitter Picture
    if (require('./sites/picTwitter.js')(argumentos)) return;

    // 9gag! Picture
    if (require('./sites/9gag.js')(argumentos)) return;

    // Instagram! Picture
    if (require('./sites/instagram.js')(argumentos)) return;

    // Facebook! Picture
    if (require('./sites/facebook.js')(argumentos)) return;

    // Google! Picture
    if (require('./sites/google.js')(argumentos)) return;

    // Google Plus+! Picture
    if (require('./sites/googleplus.js')(argumentos)) return;

    // Pinterest! Picture
    if (require('./sites/pinterest.js')(argumentos)) return;

    // Flickr Picture
    if (require('./sites/flickr.js')(argumentos)) return;
    
    // Deviantart Picture
    if (require('./sites/deviantart.js')(argumentos)) return;

    request.head(argumentos.url, function (error, response, body) {

      if (error) return argumentos.error(error, null);

      var contentType = response.headers['content-type'];
      
      // Check if content type exists and is some kind of image
      if (contentType && contentType.match(/^image/)) 

        // If it really is an image, we just call the success callback
        argumentos.success(argumentos.url);

      // Otherwise try with all the sites managers
      else {

        // If no site captured the URL, we assume is not an image
        argumentos.error(argumentos.url);

      }

    });
  },

  // Check URL for videos
  video: function (argumentos) {

    if (this._video(argumentos)) return;

    // If no site captured the URL, we assume is not a video
    argumentos.error(argumentos.url);

  },

  _video: function (argumentos) {

    // YouTube
    if (require('./sites/youtube.js')(argumentos)) return true;
    
    // Vimeo
    if (require('./sites/vimeo.js')(argumentos)) return true;

    // Dailymotion
    if (require('./sites/dailymotion.js')(argumentos)) return true;

    // Vine.co
    if (require('./sites/vine.js')(argumentos)) return true;

    return false;

  },

  // Mashup! for convenience
  imageAndVideo: function (argumentos) {

    // Bogus video is just a reference to success
    argumentos.success = argumentos.video;
    if (this._video(argumentos)) return;

    // Bogus image is just a reference to success
    argumentos.success = argumentos.image;
    if (this.image(argumentos)) return;

    // Opengraph / Our Last Hope
    // if (require('./sites/opengraph.js')(argumentos)) return;

  }

}
*/

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
  if (require('./sites/facebook.js')(url, parsedUrl, callbacks)) return;

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

  // HEAD request of none has captured it
  if (callbacks.image) {
    request.head(url, function (error, response, body) {

      if (error) return callbacks.error(error, null);

      var contentType = response.headers['content-type'];
      
      // Check if content type exists and is some kind of image
      if (contentType && contentType.match(/^image/)) 

        // If it really is an image, we just call the success callback
        callbacks.image(url, null);

      // Otherwise try with all the sites managers
      else {

        // If no site captured the URL, we assume is not an image
        callbacks.noMedia(url);
      }

    });
  }  

}