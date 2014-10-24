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

## Arguments

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

## Function signature

The wrapped function must be invoked with a callback as the last argument:

```javascript
// this is ok
wrapped(function() {

})

// These will all cause errors
wrapped()
wrapped(1)
wrapped(function(){}, true)
```
