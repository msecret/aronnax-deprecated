// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Logger', function() {
  var Logger;

  // Set up mock logger
  define('deps/logWriter', function() {
    return {
      log: function(msg) { return; },
      warn: function(msg) { return; },
      error: function(msg) { return; }
    };
  });

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Logger'], function(_Logger) {
      Logger = _Logger;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });

  describe('getLog', function() {
    it('should create a new log with specified name if it doesnt exist',
        function() {
      var actual = Logger.getLog('newTestLog').name;
      var expected = 'newTestLog';
      expect(actual).toEqual(expected);
    });

    it('should get the log of name when it exists', function() {
      var actual = Logger.getLog('testLog').name;
      var expected = 'testLog';
      expect(actual).toEqual(expected);
    });

    it('should not create a new log if it already exists', function() {
      // Manually ensure there are no logs
      Logger.logs.length = 0;

      var log1 = Logger.getLog('testLog1');
      expect(Logger.logs.length).toEqual(1);

      var log2 = Logger.getLog('testLog2');
      expect(Logger.logs.length).toEqual(2);

      var log3 = Logger.getLog('testLog1');
      expect(Logger.logs.length).toEqual(2);
    });
  });
});

describe('aronnax.Log', function() {
  var Logger,
      logWriter,
      testLog;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Logger', 'deps/logWriter'], function(_Logger, _logWriter) {
      Logger = _Logger;
      logWriter = _logWriter;
      testLog =  Logger.getLog('test log');
      testLog._logWriter = logWriter;
      sinon.spy(testLog._logWriter, 'log');
      sinon.spy(testLog._logWriter, 'error');
      sinon.spy(testLog._logWriter, 'warn');
      Logger.settings.environment = 'staging';

      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });

  afterEach(function() {
    testLog._logWriter.log.restore();
    testLog._logWriter.error.restore();
    testLog._logWriter.warn.restore();
  });

  describe('log', function() {
    it('calls logWriter when calling log method', function() {
      testLog.log('test message');

      expect(testLog._logWriter.log).toHaveBeenCalledOnce();
    });

    it('calls the log function with the log name and message', function() {
      var testMessage = 'test message',
          expected = testLog.name + ':' + testMessage;

      testLog.log(testMessage);

      expect(testLog._logWriter.log).toHaveBeenCalledWith(expected);
    });

    it('does not call the log function in production environemnts', function() {
      testLog.log('test message');
      Logger.settings.environment = 'production';
      testLog.log('test message');

      expect(testLog._logWriter.log).toHaveBeenCalledOnce();
    });

    it('calls the various logging functions', function() {
      testLog.error('test log error');
      testLog.warn('warning log error');

      expect(testLog._logWriter.error).toHaveBeenCalledOnce();
      expect(testLog._logWriter.warn).toHaveBeenCalledOnce();
    });
  });
});
