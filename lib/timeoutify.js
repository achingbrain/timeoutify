
module.exports = function(func, timeout) {
  if(!timeout) {
    timeout = 5000
  }

  return function() {
    var args = []

    for(var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i]
    }

    var callback = args.pop()

    if(!callback || typeof callback != 'function') {
      var error = new Error('The last argument should be a callback')
      error.code = 'INVALID_ARGUMENTS'

      throw error
    }

    var startTime = Date.now()
    var timeoutId = setTimeout(function() {
      var error = new Error('Function call timed out after ' + (Date.now() - startTime) + 'ms (' + timeout + 'ms permitted)')
      error.code = 'TIMEOUT'

      callback(error)
    }, timeout)

    args.push(function() {
      clearTimeout(timeoutId)

      callback.apply(callback, arguments)
    })

    func.apply(func, args)
  }
}
