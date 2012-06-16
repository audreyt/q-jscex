(function(){
  var Q, HTTP, say, $async, fetch;
  Q = require('./q-jscex');
  HTTP = require('q-http');
  say = function(it){
    console.log(it);
    console.log('');
  };
  $async = Q.async.$;
  fetch = eval(Q.async.$(function(url){
    var bufs;
    bufs = $await(Q.all([HTTP.read(url), HTTP.read(url + "/2012/06/jscex-unit-tests-with-mocha-chai.html")]));
    return bufs.map(function(it){
      return it.toString('utf-8').replace(/[\d\D]*<title>|<\/title>[\d\D]*$/g, '').trim();
    });
  }));
  say('[Demo: Fetching invalid host, expecting ENOENT...]');
  fetch('http://blog.zhaojie.error').fail(say).fin(function(){
    say('[Demo: Fetching valid host, expecting snippets...]');
    return fetch('http://blog.zhaojie.me').then(say);
  });
}).call(this);
