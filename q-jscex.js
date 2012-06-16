(function(){
  var Q, Jscex, AsyncBuilder, __ref;
  if (typeof module != 'undefined' && module !== null) {
    module.exports = Q = require('q');
    Jscex = require('jscex');
    require('jscex-jit').init(Jscex);
    require('jscex-async').init(Jscex);
  } else {
    Q == null && (Q = (__ref = this.Q) != null
      ? __ref
      : (function(){
        throw new Error("Q not available -- Please include q.min.js");
      }()));
    Jscex == null && (Jscex = (__ref = this.Jscex) != null
      ? __ref
      : (function(){
        throw new Error("Jscex not available -- Please include jscex.min.js");
      }()));
  }
  /* Our own monad that runs on Q promises */
  AsyncBuilder = (function(superclass){
    AsyncBuilder.displayName = 'AsyncBuilder';
    var prototype = __extend(AsyncBuilder, superclass).prototype, constructor = AsyncBuilder;
    prototype.Start = function(_this, step){
      var __;
      __ = Q.defer();
      step.next(_this, function(type, value, target){
        switch (type) {
        case 'normal':
        case 'return':
          __.resolve(value);
          break;
        case 'throw':
          __.reject(value);
          break;
        default:
          throw new Error("Unsupported type: " + type);
        }
      });
      return __.promise;
    };
    prototype.Bind = function(promise, generator){
      return {
        next: function(_this, cb){
          return promise.then(function(result){
            var step;
            try {
              step = generator.call(_this, result);
            } catch (e) {
              return cb('throw', e);
            }
            step.next(_this, cb);
          }, function(error){
            cb('throw', error);
          });
        }
      };
    };
    function AsyncBuilder(){}
    return AsyncBuilder;
  }(Jscex.BuilderBase));
  Jscex.binders['async-q'] = '$await';
  Jscex.builders['async-q'] = new AsyncBuilder;
  Jscex.modules['async-q'] = true;
  /* Compile a function containing the special $await keyword.
  
     Once invoked, we implicitly start the task, and return a
     deferred Promise object representing its result.
  */
  Q.async.$ = function(cb){
    return Jscex.compile('async-q', cb).replace(/(Jscex.builders\["async-q"\])/, 'Q.async.$.$1');
  };
  /* Turn off Jscex logging by default */
  Jscex.logger.level = 999;
  Q.async.$.Jscex = Jscex;
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
