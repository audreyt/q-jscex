Q = require './q-jscex'
HTTP = require \q-http
say = !-> console.log it; console.log ''
$async = Q.async.$

fetch = eval Q.async.$ (url) ->
    bufs = $await Q.all [
        HTTP.read url
        HTTP.read "#url/2012/06/jscex-unit-tests-with-mocha-chai.html"
    ]
    bufs.map ->
        it.toString \utf-8
          .replace /[\d\D]*<title>|<\/title>[\d\D]*$/g, ''
          .trim!

say '[Demo: Fetching invalid host, expecting ENOENT...]'

<- fetch \http://blog.zhaojie.error .fail say .fin

say '[Demo: Fetching valid host, expecting snippets...]'

fetch \http://blog.zhaojie.me .then say
