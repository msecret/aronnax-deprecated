// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('Integration Tests', function() {
  var Base,
      Pooled,
      Pool,
      _;

  beforeEach(function() {
    var flag = false;

    require(['underscore', 'aronnax/Base', 'aronnax/Pooled', 'aronnax/Pool'],
        function(underscore, _Base, _Pooled, _Pool) {
      Base = _Base;
      Pooled = _Pooled;
      Pool = _Pool;
      _ = underscore;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });

  describe('Object Pooling', function() {
    var Test;

    beforeEach(function() {
      Test = Base.create(Pooled, 'Test', {
        testProp: {
          value: 1
        },
        testFunc: function() { return 1; },
        init: function(num) {
          this.num = num;
        }
      });
    });

    afterEach(function() {
      Pool.totalPools = 0;
      Pool.pools = {};
    });

    describe('Pool structures', function() {
      it('should have no pools on when initialized', function() {
        expect(_.size(Pool.pools)).toEqual(0);
      });
      it('should bet set up the correct ids', function() {
        var testInstance = Test.make(),
            currentPool,
            dataStore,
            testInstance1;

        testInstance.init(3);

        expect(_.size(Pool.pools)).toEqual(1);
        currentPool = Pool.pools[Test.className];
        expect(currentPool).toBeDefined();
        expect(Pool.totalPools).toEqual(1);
        expect(currentPool.freePool.length).toEqual(11);

        dataStore = currentPool.activePool.store;
        expect(_.size(dataStore)).toEqual(1);
        expect(dataStore[testInstance.id]).toEqual(testInstance);

        testInstance1 = Test.make();
        testInstance1.init(4);
        expect(_.size(dataStore)).toEqual(2);
        expect(dataStore[testInstance1.id]).toEqual(testInstance1);
        expect(currentPool.freePool.length).toEqual(10);
      });
      it('expands correctly without breaking', function() {
        var testInstance = Test.make(),
            currentPool = Pool.pools[Test.className],
            instance,
            lastInstance,
            i,
            ilen;

        expect(currentPool.freePool.length).toEqual(11);

        for (i = 0, ilen = 11; i < ilen; i++) {
          instance = Test.make();
        }

        expect(currentPool.freePool.length).toEqual(0);

        lastInstance = Test.make();
        expect(currentPool.freePool.length).toEqual(11);
      });
      it('can be freed and the pools maintain', function() {
        var testInstance = Test.make()
            currentPool = Pool.pools[Test.className],
            store = currentPool.activePool.store;

        testInstance.init(1);
        expect(store[testInstance.id]).toBe(testInstance);
        expect(store[testInstance.id].num).toEqual(1);
        expect(store[testInstance.id].id).toBeDefined();
        expect(currentPool.freePool.length).toEqual(11);

        testInstance.free();
        expect(store[testInstance.id]).toBeUndefined();
        expect(currentPool.activePool.get(testInstance)).toBeUndefined();
        expect(currentPool.freePool.length).toEqual(12);
      });
      it('can be freed and made and pools maintain', function() {
          var testInstance = Test.make(),
              testInstance1,
              testInstance2,
            currentPool = Pool.pools[Test.className],
            store = currentPool.activePool.store;

        testInstance.init(0);
        expect(store[testInstance.id]).toBe(testInstance);
        expect(currentPool.freePool.length).toEqual(11);

        testInstance.free();
        expect(store[testInstance.id]).toBeUndefined();
        expect(currentPool.freePool.length).toEqual(12);

        testInstance1 = Test.make();
        testInstance2 = Test.make();
        testInstance1.init(1);
        testInstance2.init(2);

        expect(currentPool.freePool.length).toEqual(10);
        expect(_.size(store)).toEqual(2);
        expect(store[testInstance1.id]).toBe(testInstance1);
        expect(store[testInstance2.id]).toBe(testInstance2);

        testInstance1.free();
        expect(store[testInstance1.id]).toBeUndefined();
        expect(_.size(store)).toEqual(1);
        expect(currentPool.freePool.length).toEqual(11);
      });
      it('should correctly maintain the object', function() {
        var testInstance = Test.make(),
            freeInstance,
            currentPool = Pool.pools[Test.className],
            store = currentPool.activePool.store;

        testInstance.init(0);
        expect(store[testInstance.id].num).toBeDefined();
        expect(store[testInstance.id].num).toEqual(0);
        expect(store[testInstance.id].testProp).toEqual(1);
        expect(store[testInstance.id].testFunc).toBeDefined();
        expect(currentPool.activePool.get(testInstance).num).toEqual(0);

        testInstance.free();
        freeInstance = currentPool.freePool[currentPool.freePool.length - 1];

        expect(testInstance.id).toEqual(freeInstance.id);
        expect(testInstance.classId).toEqual(freeInstance.classId);
        expect(freeInstance.testProp).toEqual(1);
        expect(freeInstance.testFunc).toBeDefined();
        expect(freeInstance.num).toBeUndefined();
      });

      it('should correctly store different object prototypes', function() {
        var Test1 = Base.create(Pooled, 'Test1', {
              testProp: {
                value: 1
              },
              testFunc: function() { return 1; },
              init: function(num) {
                this.num = num;
              }
            }),
            Test2 = Base.create(Pooled, 'Test2', {
              testProp: {
                value: 2
              },
              testFunc: function() { return 2; },
              init: function(num) {
                this.num = num;
              }
            }),
            testInstance1 = Test1.make(),
            testInstance2 = Test2.make(),
            pool1 = Pool.pools[Test1.className],
            pool2 = Pool.pools[Test2.className],
            store1 = pool1.activePool.store,
            store2 = pool2.activePool.store;

        testInstance1.init();
        testInstance2.init();

        expect(pool1.activePool.get(testInstance1)).toBe(testInstance1);
        expect(pool2.activePool.get(testInstance2)).toBe(testInstance2);
        expect(_.size(store1)).toEqual(1);
        expect(_.size(store2)).toEqual(1);
      });
    });
  });
});
