// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Pooled', function() {
  var Base,
      Pooled;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Base', 'aronnax/Pooled'], function(_Base, _Pooled) {
      Base = _Base;
      Pooled = _Pooled;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });
  describe('init', function() {

    it('should have correct methods', function() {
      expect(Pooled.make).toBeDefined();
    });

    it('should have the correct class name', function() {
      expect(Pooled.className).toBeDefined();
      expect(Pooled.className).toEqual('Pooled');
    });
  });

  describe('make', function() {
    var TestO = {};

    beforeEach(function() {
      TestO = Base.create(Pooled, 'TestO', {
        prop1: {
          value: 1
        },
        propFunc: function() { }
      });
    });

    it('should have the make function on inherited objects', function() {
      expect(TestO.make).toBeDefined();
    });

    it('should return an object on make when its an object', function() {
      var testI = TestO.make();

      expect(typeof testI).toEqual('object');
    });

    it('should inherit any properties of the base object', function() {
      var testProperties = {
        testProp1: {
          value: 1
        },
        testFunc1: function() { return 1; }
      },
        testBase = Base.create(Pooled, 'testBase', testProperties);

      var testI = testBase.make();

      expect(testI.testProp1).toBeDefined();
      expect(testI.testProp1).toEqual(1);
      expect(testI.testFunc1).toBeDefined();
      expect(testI.testFunc1()).toEqual(1);
    });

    it('should have the name of the base object', function() {
      var testI = TestO.make();

      expect(testI.className).toEqual('TestO');
    });

    it('should have a free function', function() {
      var testI = TestO.make();

      expect(testI.free).toBeDefined();
      expect(typeof testI.free).toEqual('function');
    });
  });

  describe('free', function() {
    var TestO = {};

    beforeEach(function() {
      TestO = Base.create(Pooled, 'TestO', {
        prop1: {
          value: 1
        },
        propFunc: function() { }
      });
    });

    it('should set the object to instance of null', function() {
      var testI = TestO.make();

      testI.free();
      // TODO this doesn't work yet
      // expect(testI).toBe(null);
    });
  });

  describe('pool', function() {
    it('should get the pool of the current prototype', function() {
      var TestO = Base.create(Pooled, 'TestO', {
            prop1: {
              value: 1
            },
          }),
          testInstance = TestO.make();

      expect(testInstance.pool).toBeDefined();
    });
  });

});

