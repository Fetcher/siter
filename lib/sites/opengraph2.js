var   request   = require('request');

module.exports = function (url, parsedUrl, callbacks) {

  // Article only

  // Request to the site, let's find out about the image
  request({url:url,
  	headers: { "User-Agent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410."},
   	pool:false}, function (error, response, body) {
    // If there was an error upon connecting, we log the error and get out
    if (error) {
      callbacks.error(error, site);
      return true;
    }

    // We look for the correct tag in the body
    try{
      var urlMatches = body.match(/property="og:url"\s+?content="(.+?)"/);
      var titleMatches = body.match(/property="og:title"\s+?content="(.+?)"/);
      var imageMatches = body.match(/property="og:image"\s+?content="(.+?)"/);
      var typeMatches = body.match(/property="og:type"\s+?content="(.+?)"/);

      if (!urlMatches){urlMatches=[];}
      if (!titleMatches){titleMatches=[];}
      if (!imageMatches){imageMatches=[];}
      if (!typeMatches){titleMatches=[];}

      if (!typeMatches){
      	if (imageMatches[1]){
      		typeMatches = 'image';
			    callbacks.image(
			    	imageMatches[1], null, 
			    		{title: titleMatches[1], type: typeMatches, url: urlMatches[1], image: imageMatches[1]}
			    );
      	}
      }else{
	      if (typeMatches[1].indexOf('product') > -1){
	      	typeMatches[1] = 'product';
			    callbacks.product(
			    	urlMatches[1], null, 
			    		{title: titleMatches[1], type: typeMatches[1], url: urlMatches[1], image: imageMatches[1]}
			    );
	      }
	      if (typeMatches[1].indexOf('image') > -1){
	      	typeMatches[1] = 'image';
			    callbacks.image(
			    	imageMatches[1], null, 
			    		{title: titleMatches[1], type: typeMatches[1], url: urlMatches[1], image: imageMatches[1]}
			    );
	      }
	    }

    } catch (err) {
      callbacks.noMedia(url, null);
    }

  });

  return true;

}