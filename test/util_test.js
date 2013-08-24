// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.util', function() {
  var util;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/util'],
        function(_util) {
      util = _util;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });

  describe('cleanAnything', function() {
    it('should remove all immediate properties from and object', function() {
      var testObj = {
            id:  3,
            testProp: 'test'
          };

      util.cleanAnything(testObj);

      expect(testObj).toBeDefined();
      expect(testObj.id).toBeUndefined();
      expect(testObj.testProp).toBeUndefined();
    });
    it('should  not clear an objects prototype properties', function() {
      var testPrototype = {
            testProp1: 1
          },
          testObj;

      testObj = Object.create(testPrototype);
      testObj.testProp2 = 2;

      util.cleanAnything(testObj);

      expect(testObj).toBeDefined();
      expect(testObj.testProp2).toBeUndefined();
      expect(testObj.testProp1).toBeDefined();
      expect(testObj.testProp1).toEqual(1);
    });
    it('should clear all keys of an array', function() {
      var testArray = [1,2,4,'test'];

      util.cleanAnything(testArray);

      expect(testArray.length).toEqual(0);
      expect(testArray[1]).toBeUndefined();
    });
  });
});
