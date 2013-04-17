var siter = require('./lib/siter.js');

siter( process.argv[process.argv.length - 1], {
  image: function (url, site) {
    console.log(url + " from " + site);
  },

  video: function (url, site) {
    console.log(url + " from " + site);
  },

  noMedia: function (url) {
    console.log(url);
  },

  error: function (error, site) {
    console.log(error);
    console.log("In site: " + site);
    console.log("With URL: " + process.argv[process.argv.length - 1]);
  }
});
