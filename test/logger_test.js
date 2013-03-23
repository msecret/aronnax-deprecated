/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

goog.require('aronnax.main');

describe('aronnax.Logger', function() {
  
  describe('getLog', function() {
    var testLog = null;
    beforeEach(function() {
      testLog = aronnax.Logger.getLog('testLog'); 
    });   
    it('should create a new log with specified name if it doesnt exist', 
        function() {
      var actual = aronnax.Logger.getLog('newTestLog').name;  
      var expected = 'newTestLog';
      expect(actual).toEqual(expected);
    });
    it('should get the log of name when it exists', function() {
      var actual = aronnax.Logger.getLog('testLog').name;
      var expected = 'testLog';
      expect(actual).toEqual(expected);
    });
  });

  describe('error', function() {
    var testLog = null;
    beforeEach(function() {
      testLog = aronnax.Logger.getLog('testLog'); 
    });   
    it('should be correctly defined', function() {
      expect(testLog.error).toBeDefined();
    });
  });
});
