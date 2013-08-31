// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Pooled', function() {
  var Base,
      Pooled;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Base', 'aronnax/Pooled'], function(__Base, __Pooled) {
      Base = __Base;
      Pooled = __Pooled;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });
  describe('init', function() {

    it('should have correct methods', function() {
      expect(Pooled.make).toBeDefined();
      expect(Pooled.free).toBeDefined();
    });

    it('should have the correct class name', function() {
      expect(Pooled.className).toBeDefined();
      expect(Pooled.className).toEqual('Pooled');
    });
  });

  describe('make', function() {
    var TestProto = {};

    beforeEach(function() {
      TestProto = Base.create(Pooled, 'TestProto', {
        prop1: {
          value: 1
        },
        propFunc: function() { }
      });
    });

    it('should have the make function on inherited objects', function() {
      expect(TestProto.make).toBeDefined();
    });

    it('should return an object on make when its an object', function() {
      var testInst = TestProto.make();

      expect(typeof testInst).toEqual('object');
    });

    it('should inherit any properties of the base object', function() {
      var testProperties = {
        testProp1: {
          value: 1
          },
          testFunc1: function() { return 1; }
        },
        testBase = Base.create(Pooled, 'testBase', testProperties),
        testInst = testBase.make();

      expect(testInst.testProp1).toBeDefined();
      expect(testInst.testProp1).toEqual(1);
      expect(testInst.testFunc1).toBeDefined();
      expect(testInst.testFunc1()).toEqual(1);
    });

    it('should have the name of the base object', function() {
      var testInst = TestProto.make();

      expect(testInst.className).toEqual('TestProto');
    });

    it('should have a free function', function() {
      var testInst = TestProto.make();

      expect(testInst.free).toBeDefined();
      expect(typeof testInst.free).toEqual('function');
    });
  });

  describe('free', function() {
    var TestProto = {};

    beforeEach(function() {
      TestProto = Base.create(Pooled, 'TestProto', {
        prop1: {
          value: 1
        },
        propFunc: function() { }
      });
    });

    it('should set the object to instance of null', function() {
      var testInst = TestProto.make();

      testInst.free();
      // TODO this doesn't work yet
      // expect(testI).toBe(null);
    });
  });

  describe('pool', function() {
    it('should get the pool of the current prototype', function() {
      var TestProto = Base.create(Pooled, 'TestProto', {
            prop1: {
              value: 1
            },
          }),
          testInst = TestProto.make();

      expect(testInst.pool).toBeDefined();
    });
  });

});

