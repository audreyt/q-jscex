if module?
    module.exports = Q = require \q
    Jscex = require \jscex
    require \jscex-jit .init Jscex
    require \jscex-async .init Jscex
else
    Q ?= @Q ? throw new Error "Q not available -- Please include q.min.js"
    Jscex ?= @Jscex ? throw new Error "Jscex not available -- Please include jscex.min.js"

/* Our own monad that runs on Q promises */
class AsyncBuilder extends Jscex.BuilderBase
    Start: (_this, step) ->
        __ = Q.defer!
        step.next _this, !(type, value, target) ->
            switch type
            | \normal \return   => __.resolve value
            | \throw            => __.reject value
            | otherwise         => throw new Error "Unsupported type: #type"
        __.promise
    Bind: (promise, generator) ->
        next: (_this, cb) -> promise.then do
            !(result) ->
                try  step = generator.call _this, result
                catch return cb \throw, e
                step.next _this, cb
            !(error) -> cb \throw, error

Jscex.binders. \async-q = \$await
Jscex.builders.\async-q = new AsyncBuilder
Jscex.modules. \async-q = true

/* Compile a function containing the special $await keyword.

   Once invoked, we implicitly start the task, and return a
   deferred Promise object representing its result.
*/
Q.async.$ = (cb) -> Jscex.compile(\async-q, cb).replace do
    /(Jscex.builders\["async-q"\])/
    'Q.async.$.$1'

/* Turn off Jscex logging by default */
Jscex.logger.level = 999

Q.async.$.Jscex = Jscex
