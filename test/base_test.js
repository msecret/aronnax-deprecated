// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Base', function() {
  var Base;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Base'], function(__Base) {
      Base = __Base;
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

    it('should extend functions when they are passed in', function() {
      var testBaseObj = {testProp1: 1},
          testFunc = function testFunction() { },
          testChildObj = Base.create(testBaseObj, 'testInherited', {
            testFunc: testFunc
          });

      expect(testChildObj.testFunc).toBeDefined();
      expect(testChildObj.testFunc).toBeDefined();
      expect(typeof testChildObj.testFunc).toEqual('function');
      expect(testChildObj.testFunc).toEqual(testFunc);
    });

    it('should still extend properties when passing in functions', function() {
      var testBaseObj = {testProp1: 1},
          testFunc = function() {},
          testProp = {value: 'testProp'};
          testChildObj = Base.create(testBaseObj, 'testInherited', {
            'testFunc': testFunc,
            'testProp': testProp
          });

      expect(testChildObj.testFunc).toBeDefined();
      expect(testChildObj.testProp).toBeDefined();
    });

    it('should define the className as a property', function() {
      var testBaseObj = Base.create(null, 'testName1');

      expect(testBaseObj.className).toBeDefined();
      expect(testBaseObj.className).toEqual('testName1');
    });

    it('should provide an id for objects created with prototypes of original',
        function() {
      var testProto = Base.create(Object.prototype, 'testClass'),
          testInst1 = Base.construct(testProto),
          testInst2 = Base.construct(testProto),
          testInst3 = Base.construct(testProto),
          testInst4 = Base.construct(testProto);

      expect(testInst1.id).toBeDefined();
      expect(testInst1.id).toEqual(0);
      expect(testInst2.id).toEqual(1);
      expect(testInst4.id).toEqual(3);
    });

    it('should set a specific id just for the class', function() {
      var testProto1 = Base.create(Object.prototype, 'testClass1'),
          testProto2 = Base.create(Object.prototype, 'testClass2'),
          testInst1 = Base.construct(testProto1),
          testInst2 = Base.construct(testProto1),
          testInst3 = Base.construct(testProto2),
          testInst4 = Base.construct(testProto2);

      expect(testInst1.classId).toBeDefined();
      expect(testInst1.classId).toEqual(0);
      expect(testInst2.classId).toEqual(1);
      expect(testInst3.classId).toEqual(0);
      expect(testInst4.classId).toEqual(1);
    });
  });
});


