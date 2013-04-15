var winston     = require('winston'),
    url         = URL.parse(argumentos.url),
    cheerio     = require('cheerio'),
    request     = require('request'),
    result      = {},
    attr        = function( tag, prop ){ return tag.attribs && tag.attribs[prop] || ""; }

request( url, function( err, res, body ) {

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
  console.log(JSON.stringify( result.twitter, undefined, 2));
});