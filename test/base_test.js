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
          testProps = {testProp: {
            value: testValue
          }},
          testCreatedObj = Base.create(null, null, testProps);

      expect(testCreatedObj.prototype).toBeUndefined();
    });

    it('should set the props object on the main object when passing in a null' +
        'object', function() {
      var testValue = 5,
          testProps = {testProp: {
            value: testValue
          }},
          testCreatedObj = Base.create(null, null, testProps);

      expect(testCreatedObj.testProp).toBeDefined();
      expect(testCreatedObj.testProp).toEqual(testValue);
    });

    it('should return an object that inherits from one passed in', function() {
      var testValue = 4,
          testObj = {prop: 'value'},
          testProp = {testProp: {
            value: testValue
          }},
          testCreatedObj = Base.create(testObj, null, testProp);

      expect(testCreatedObj.testProp).toBeDefined();
      expect(testCreatedObj.testProp).toEqual(testValue);
    });
    it('should set new object instances to have correct prototype', function() {
      var testBaseObj = {testProp1: 1};

      var r = Base.create(testBaseObj, 'testClass', {
        testProp2: {
          value: 2
        }
      });

      var s = Base.create(r);
    });
    it('should extend functions when they are passed in', function() {
      var testBaseObj = {testProp1: 1},
          testFunc = function testFunction() { };

      var ex = Base.create(testBaseObj, 'testInherited', {
        testFunc: testFunc
      });

      expect(ex.testFunc).toBeDefined();
      expect(ex.testFunc).toBeDefined();
      expect(typeof ex.testFunc).toEqual('function');
      expect(ex.testFunc).toEqual(testFunc);
    });
    it('should still extend properties when passing in functions', function() {
      var testBaseObj = {testProp1: 1},
          testFunc = function() {},
          testProp = {value: 'testProp'};

      var ex = Base.create(testBaseObj, 'testInherited', {
        'testFunc': testFunc,
        'testProp': testProp
      });

      expect(ex.testFunc).toBeDefined();
      expect(ex.testProp).toBeDefined();
    });
    it('should keep the same properites when extended from', function() {

    });
    it('should define the className as a property', function() {
      var testBaseObj = Base.create(null, 'testName1');

      expect(testBaseObj.className).toBeDefined();
      expect(testBaseObj.className).toEqual('testName1');
    });
    it('should provide an id for objects created with prototypes of original',
        function() {
      var testPrototype = Base.create(Object.prototype, 'testClass'),
          testInst1 = Base.construct(testPrototype),
          testInst2 = Base.construct(testPrototype),
          testInst3 = Base.construct(testPrototype),
          testInst4 = Base.construct(testPrototype);

      expect(testInst1.id).toBeDefined();
      expect(testInst1.id).toEqual(0);
      expect(testInst2.id).toEqual(1);
      expect(testInst4.id).toEqual(3);
    });
    it('should set a specific id just for the class', function() {
      var testPrototype1 = Base.create(Object.prototype, 'testClass1'),
          testPrototype2 = Base.create(Object.prototype, 'testClass2'),
          testInst1 = Base.construct(testPrototype1),
          testInst2 = Base.construct(testPrototype1),
          testInst3 = Base.construct(testPrototype2),
          testInst4 = Base.construct(testPrototype2);

      expect(testInst1.classId).toBeDefined();
      expect(testInst1.classId).toEqual(0);
      expect(testInst2.classId).toEqual(1);
      expect(testInst3.classId).toEqual(0);
      expect(testInst4.classId).toEqual(1);
    });
  });
});


