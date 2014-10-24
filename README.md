# Timeoutify

A module that will call the passed callback with an error if a timeout threshold is passed.

```javascript
var timeoutify = require('timeoutify')

// timeout after 500ms - defaults to 5000ms if omitted
var wrapped = timeoutify(function(callback) {
  callback()
}, 500)

wrapped(function(error) {
  console.info('I was invoked')

  if(error && error.code == 'TIMEOUT') {
    console.info('I timed out')
  }
})
```

## Other function arguments

Arguments to the wrapped function are passed through as you'd expect:

```javascript
var wrapped = timeoutify(function(arg1, arg2, callback) {
  callback(null, arg1 + arg2)
})

wrapped(1, 2, function(error, result) {
  // prints '3' or 'timed out'
  console.info(error ? 'timed out' : result)
})
```

## Callback function

By convention the last argument to the invocation of the wrapped function is treated as a callback.  If the last argument is not a function, no notification of timeouts will occur:

```javascript
var wrapped = timeoutify(function(callback) {
  if(typeof callback == 'function') callback()
})

// don't care about success/failure so don't pass a callback
wrapped()
```
