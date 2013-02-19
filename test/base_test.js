/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

describe('aronnax.base', function() {
  var testInstance, TestClass;
  beforeEach(function() {
    aronnax.base.resetAll();
    TestClass = function() {
      goog.base(this, 'TestClass');
      this.name = 'test class';
    };
    goog.inherits(TestClass, aronnax.base);
    testInstance = new TestClass();
  });

  describe('uniqueID', function() {
    it('will get a unique id string', function() {
      var actual = testInstance.uniqueID;
      expect(actual).toEqual('TestClass:0');
    });
    it('will increment unique id when objects are added', function() {
      var testInstance2 = new TestClass();
      var actual = testInstance2.uniqueID;
      expect(actual).toEqual('TestClass:1');
      expect(testInstance.uniqueID).toEqual('TestClass:0');
    });
  });

  describe('toString', function() {
    it('should return a string representation of the object', function() {
      var actual = testInstance.toString();
      var expected = 'TestClass:0';
      expect(actual).toEqual(expected);
    });
  });

  describe('getTotalObjects', function() {
    it('should return the total objects in a class', function() {
      var actual = aronnax.base.getTotalObjects('TestClass');
      expect(actual).toEqual(1);
    });
  });
});