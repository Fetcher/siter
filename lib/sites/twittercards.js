//var winston     = require('winston'),
var URL         = require('url'),
    cheerio     = require('cheerio'),
    request     = require('request');
//    color       = require('cli-color');

//winston.info(color.yellow("Twitter Cards:"));
module.exports = function (url, parsedUrl, callbacks) {
  var url      = url;

  var result   = {};
  attr        = function( tag, prop ){ return tag.attribs && tag.attribs[prop] || ""; }

  request({ uri: url ,followRedirect: false ,maxRedirects:0, setMaxListeners:0, jar: false ,pool:false, headers: { "User-Agent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410."}} , function( err, res, body ) {

    var metas = cheerio.load(body)('meta')
    var keys = Object.keys(metas)

    keys.forEach(function(i){
      var meta = metas[i],
        property = attr(meta,'name'),
        parts = property.split(":");

      if ( property ) {
        var twitter = property.split(':'),
          parent = result;

        for ( var j = 0; j < twitter.length; j++ ){
          var token = twitter[j],
            current = parent[token],
            name;

          if ( j+1 == twitter.length ) { // leaf node

            // expected leaf is already a branch so append a name attr
            if ( current instanceof Object ) name = token;
            // leaf should take the value given
            else {
              if ("" == attr(meta,'content')){
                  parent[token] = attr(meta,'value');
                }else{
                  parent[token] = attr(meta,'content');
              }}

          } else { // branch node

            // if no such branch exists, make one
            if ( !(current instanceof Object) ) {
              // if the branch is already a leaf, move value to name attr
              if ( typeof current == "string" ) name = current;
              current = {};
              parent[token] = current;  
            }
          }
          if ( name ) current["name"] = name;
          name = undefined
          parent = current;
        }
      }
    });
    if (result.twitter != undefined){
      //winston.info(color.red("sii es tw-card"));
      if (result.twitter.card.toLowerCase() == "summary"){
        callbacks.article(result.twitter.url, null, {title: result.twitter.title, description: result.twitter.description});
            // Opengraph / Our Last Hope
        if (require('./opengraph.js')(url, parsedUrl, callbacks,body)) return;  
        return true;
    } }
    //winston.info(color.red("Nope, chuck testa"));
    // Opengraph / Our Last Hope
    if (require('./opengraph.js')(url, parsedUrl, callbacks,body)) return;  
    return false; 

  });
}
