var siter = require('./lib/siter.js');

siter( process.argv[process.argv.length - 1], {
  image: function (url, site, data) {
    console.log(url + " from " + site);
    console.log(data);
  },

  video: function (url, site) {
    console.log(url + " from " + site);
  },

  noMedia: function (url) {
    console.log(url);
  },

  article: function(url,site,data){
    console.log(url);
    console.log(site);
    console.log(data);
  },

  product: function(url,site,data){
    console.log(url);
    console.log(site);
    console.log(data);
  },

  error: function (error, site) {
    console.log(error.message);
    console.log(error.stack);

    console.log("In site: " + site);
    console.log("With URL: " + process.argv[process.argv.length - 1]);
  }
});
