(function(){
  var Q, HTTP, say, fetch;
  Q = require('./q-jscex');
  HTTP = require('q-http');
  say = function(it){
    console.log(it);
    console.log('');
  };
  fetch = eval(Q.async.$(function(url){
    var html;
    html = $await(HTTP.read(url));
    return html.toString('utf-8', 555, 600);
  }));
  say('[Demo: Fetching invalid host, expecting ENOENT...]');
  fetch('http://blog.zhaojie.error').fail(say).fin(function(){
    say('[Demo: Fetching valid host, expecting snippet...]');
    return fetch('http://blog.zhaojie.me').then(say);
  });
}).call(this);
