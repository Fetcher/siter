//var winston     = require('winston'),
var    URL         = require('url'),
    cheerio     = require('cheerio'),
    request     = require('request').defaults({maxRedirects:0});
    //color       = require('cli-color');

//winston.info(color.yellow("Open Graph:"));
module.exports = function (url, parsedUrl, callbacks,body) {

  var url      = url;

  var result   = {};
  attr         = function( tag, prop ){ return tag.attribs && tag.attribs[prop] || ""; }

    var metas = cheerio.load(body)('meta')
    var keys = Object.keys(metas)

    keys.forEach(function(i){
      var meta = metas[i],
        property = attr(meta,'property'),
        parts = property.split(":");

      if ( property ) {
        var og = property.split(':'),
          parent = result;

        for ( var j = 0; j < og.length; j++ ){
          var token = og[j],
            current = parent[token],
            name;

          if ( j+1 == og.length ) { // leaf node

            // expected leaf is already a branch so append a name attr
            if ( current instanceof Object ) name = token;
            // leaf should take the value given
            else parent[token] = attr(meta,'content');

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
    if (result.og != undefined){
      if (result.og.title != "" && result.og.title != undefined){
        //winston.info(color.red("is fb article"));
        callbacks.article(result.og.url, null, {title: result.og.title, description: result.og.description});
        return true;
      }
     }
    //winston.info(color.red("Nope, chuck testa"));
    return false;
}