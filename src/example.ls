Q = require './q-jscex'
HTTP = require \q-http
say = !-> console.log it; console.log ''

fetch = eval Q.async.$ (url) ->
    html = $await HTTP.read url
    return html.toString(\utf-8, 555, 600)

say '[Demo: Fetching invalid host, expecting ENOENT...]'

<- fetch \http://blog.zhaojie.error .fail say .fin

say '[Demo: Fetching valid host, expecting snippet...]'

fetch \http://blog.zhaojie.me .then say
