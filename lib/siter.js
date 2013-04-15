var   request   = require('request'),
      URL       = require('url');

var Checker = {

  /* Check URL for image */
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

      if (error) return argumentos.failure(error, null);

      var contentType = response.headers['content-type'];
      
      // Check if content type exists and is some kind of image
      if (contentType && contentType.match(/^image/)) 

        // If it really is an image, we just call the success callback
        argumentos.success(argumentos.url);

      // Otherwise try with all the sites managers
      else {

        // If no site captured the URL, we assume is not an image
        argumentos.failure(argumentos.url);

      }

    });
  },

  // Check URL for videos
  video: function (argumentos) {

    if (this._video(argumentos)) return;

    // If no site captured the URL, we assume is not a video
    argumentos.failure(argumentos.url);

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

module.exports = Checker;