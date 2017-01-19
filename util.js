const Q = require('q')

function $call(registry, fn, ...args){
    let deferred = Q.defer();
    console.log("Calling with", ...args);
    registry[fn](...args, function(err) {
        if (err) {
            deferred.reject(new Error(err))
        } else {
            console.log("Register resolve");
            let result = Array.prototype.splice.apply(arguments, [1])
            console.log("Result", result);
            deferred.resolve(...result)
        }
    })
    return deferred.promise
}

exports.$create = function(registry, ...args) {
    return $call(registry, 'create', ...args)
}

exports.$set = function(registry, ...args) {
    return $call(registry, 'set', ...args)
}
