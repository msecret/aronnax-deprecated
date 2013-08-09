// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Logger', function() {
  var Logger;

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

      var log1 = Logger.getLog('testLog1');
      expect(Logger.logs.length).toEqual(2);
    });
  });
});
