var winston     = require('winston'),
    URL         = require('url'),
    cheerio     = require('cheerio'),
    request     = require('request'),
    color       = require('cli-color');

winston.info(color.yellow("Open Graph:"));

module.exports = function (argumentos) {

  //var url      = URL.parse(argumentos.url);
  var url      = argumentos.url;
  var result   = {};
  attr         = function( tag, prop ){ return tag.attribs && tag.attribs[prop] || ""; }

  request( url, function( err, res, body ) {

    winston.info(color.yellow(url));

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

    winston.info(color.green(JSON.stringify( result.og, undefined, 2)));

    return true;

  });

}