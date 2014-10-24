var expect = require('chai').expect,
  timeoutify = require('../lib/timeoutify')

describe('timeoutify', function() {

  it('should error when callback not passed', function () {
    var func = timeoutify(function (callback) {
    })

    try {
      func()
    } catch (e) {
      expect(e.code).to.equal('INVALID_ARGUMENTS')
    }
  })

  it('should call through to callback when callback invoked', function (done) {
    var func = timeoutify(function (callback) {
      callback()
    })

    func(function (error) {
      expect(error).to.not.exist

      done()
    })
  })

  it('should support an arbitrary number of arguments', function (done) {
    var func = timeoutify(function () {
      var args = []

      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i]
      }

      var callback = args.pop()

      setTimeout(function () {
        var result = ''

        args.forEach(function (arg) {
          result += arg
        })

        callback(undefined, result)
      }, 1000)
    })

    var result = ''

    func('a', 'b', function (error, arg) {
      expect(error).to.not.exist

      result += arg
    })
    func('c', function (error, arg) {
      expect(error).to.not.exist

      result += arg

      expect(result).to.equal('abc')

      done()
    })
  })

  it('should timeout when no response received', function (done) {
    var func = timeoutify(function (callback) {}, 500)

    func(function (error) {
      expect(error).to.exist
      expect(error.code).to.equal('TIMEOUT')

      done()
    })
  })
})
