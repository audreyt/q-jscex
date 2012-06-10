q-jscex
=======

# Synopsis

```javascript
// Drop-in replacement to require('q')
var Q = require('q-jscex');
var HTTP = require('q-http');

// Define an Async function with a special $await keyword in it
var fetch = eval(Q.async.$(function(url) {
    // $await takes anything that returns a Q Promise
    var buf = $await( HTTP.read(url) );
    // ...pauses one second...
    $await( Q.delay(1000) );
    // ...do something with the returned buffer...
    return buf;
}));

// Return value of Async functions is always a Q Promise
fetch('http://.../').done(...).fail(...).fin(...);
```
    
# Description

This module exports a Q root object (`Q`) containing an
`Q.async.$` helper; it compiles a regular function into one
that returns a Q Promise object.

Functions defined with `Q.async.$` has access to an extra `$await`
keyword, which implicitly waits for other Q Promise objects.

Please see `example.js` for a sample usage, and type `make demo`
to see it in action.

The source code is in `src` directory and written in LiveScript.
Note that LiveScript is _not_ a runtime dependency of this module;
it's only used for development.

The underlying JIT compiler is available as the `Q.async.$.Jscex` object.

# See Also

* Jscex: http://jscex.info/
* Q: https://github.com/kriskowal/q
* LiveScript: https://gkz.github.com/LiveScript

# CC0 1.0 Universal

To the extent possible under law, 唐鳳 has waived all copyright
and related or neighboring rights to q-jscex.

This work is published from Taiwan.

http://creativecommons.org/publicdomain/zero/1.0
