// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Base', function() {
  var Base;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Base'], function(_Base) {
      Base = _Base;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });

  describe('create', function() {

    it('should be defined', function() {
      expect(Base.create).toBeDefined();
    });

    it('should return a new object', function() {
      var testCreatedObj = Base.create(null);
      expect(typeof testCreatedObj).toBe('object');
    });

    it('should not set the prototype props when passing in null object',
        function() {
      var testValue = 5,
          testProps = {testProp: testValue},
          testCreatedObj = Base.create(null, testProps);

      expect(testCreatedObj.prototype).toBeUndefined();
    });

    it('should set the props object on the main object when passing in a null' +
        'object', function() {
      var testValue = 5,
          testProps = {testProp: testValue},
          testCreatedObj = Base.create(null, testProps);

      expect(testCreatedObj.testProp).toBeDefined();
      expect(testCreatedObj.testProp).toEqual(testValue);
    });

    it('should return an object that inherits from one passed in', function() {
      var testValue = 4,
          testObj = {testProp: testValue},
          testProps = {testProp: testValue},
          testCreatedObj = Base.create(testObj, testProps);

      expect(testCreatedObj.testProp).toBeDefined();
      expect(testCreatedObj.testProp).toEqual(testValue);
    });
  });
});


