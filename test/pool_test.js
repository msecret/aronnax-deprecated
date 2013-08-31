// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Pool', function() {
  var Base,
      Pool,
      Pooled;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Base', 'aronnax/Pool', 'aronnax/Pooled'],
        function(__Base, __Pool, __Pooled) {
      Base = __Base;
      Pool = __Pool;
      Pooled = __Pooled;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });
  afterEach(function() {
    Pool.pools = {};
    Pool.totalPools = 0;
  });
  describe('getTotalActiveObjects', function() {
    it('should total number of active objects across all pools', function() {
      var testPool;
      expect(typeof Pool.totalActiveObjects).toEqual('number');
      expect(Pool.totalActiveObjects).toEqual(0);

      testPool = Pool.createPool('testClass', {}, 15);
      expect(Pool.totalActiveObjects).toEqual(0);

      testPool.acquireMember();
      expect(Pool.totalActiveObjects).toEqual(1);
    });

    it('should count the total number even with multiple pools', function() {
      var testPool1,
          testPool2;

      testPool1 = Pool.createPool('testPool1', {}, 15);
      testPool2 = Pool.createPool('testPool2', {}, 15);
      expect(Pool.totalActiveObjects).toEqual(0);

      testPool1.acquireMember();
      expect(Pool.totalActiveObjects).toEqual(1);
      testPool2.acquireMember();
      expect(Pool.totalActiveObjects).toEqual(2);
    });
  });
  describe('getTotalFreeObjects', function() {
    it('should total number of free objects across all pools', function() {
      var testPool;
      expect(typeof Pool.totalFreeObjects).toEqual('number');
      expect(Pool.totalFreeObjects).toEqual(0);

      testPool = Pool.createPool('testClass', {}, 15);
      expect(Pool.totalFreeObjects).toEqual(15);

      testPool.acquireMember();
      expect(Pool.totalFreeObjects).toEqual(14);
    });

    it('should count the total number even with multiple pools', function() {
      var testPool1,
          testPool2;

      testPool1 = Pool.createPool('testPool1', {}, 15);
      testPool2 = Pool.createPool('testPool2', {}, 15);
      expect(Pool.totalFreeObjects).toEqual(30);

      testPool1.acquireMember();
      expect(Pool.totalFreeObjects).toEqual(29);
      testPool2.acquireMember();
      expect(Pool.totalFreeObjects).toEqual(28);
    });
  });
  describe('acquire', function() {
    it('should return an object', function() {
      var testProto = Base.create(null, 'testProto'),
          testInst = Pool.acquire(testProto);

      expect(testInst).toBeDefined();
      expect(typeof testInst).toEqual('object');
    });

    it('should return an object with the correct properties', function() {
      var testProto = Base.create(null, 'testO', { testProp: { value: 1 } }),
          testInst = Pool.acquire(testProto);

      expect(testInst.testProp).toBeDefined();
      expect(typeof testInst.testProp).toEqual('number');
      expect(testInst.testProp).toEqual(1);
    });

    it('should return an object with the correct classname', function() {
      var testProto = Base.create(null, 'testProto'),
          testInst = Pool.acquire(testProto);

      expect(testInst.className).toEqual('testProto');
    });

    it('should return an array when an array is passed in', function() {
      var testInst = Pool.acquire(Array.prototype);

      expect(testInst instanceof Array).toBeTruthy();
      expect(testInst.length).toEqual(0);
      expect(testInst.sort).toBeDefined();
    });

    it('should return an object when an object is passed in', function() {
      var testInst = Pool.acquire(Object.prototype);

      expect(typeof testInst).toEqual('object');
    });

    it('should throw an error when an object without className is passed in',
        function() {
      var stub = sinon.stub(Pool, 'acquire'),
          testProto = { testProp: 1 };

      expect(stub.withArgs(testProto).throws('Error')).toBeTruthy();
      Pool.acquire.restore();
    });
  });

  describe('release', function() {
    it('should remove the member from the active pool and add to the free pool',
        function() {
      var testProto = {
            classId: 1,
            className: 'testProto'
          },
          testInst,
          testPool;

      testInst = Pool.acquire(testProto);
      testPool = Pool.acquirePool(testProto.className, testProto);
      expect(testPool.freePool.length).toEqual(11);

      Pool.release(testInst);
      expect(testPool.freePool.length).toEqual(12);
    });

    it('should call the releaseMember function on the correct class', function() {
      var testProto = {
            className: 'testProto'
          },
          testInst,
          testPool;

      testInst = Pool.acquire(testProto);
      testPool = Pool.acquirePool(testProto.className, testProto);
      sinon.spy(testPool, 'releaseMember');
      Pool.release(testInst);

      expect(testPool.releaseMember).toHaveBeenCalledOnce();

      testPool.releaseMember.restore();
    });
  });

  describe('acquirePool', function() {
    var testProto;
    beforeEach(function() {
      this.addMatchers({
        toBeArray: function(expected) {
          return this.actual instanceof Array;
        }
      });
      testProto = Base.create(null, 'testProto', {
        testProp: {
          value: 1
        }
      });
    });

    it('should return a Pool object', function() {
      var testPool = Pool.acquirePool(testProto.className, testProto);

      expect(testPool).toBeDefined();
      expect(typeof testPool).toEqual('object');
      expect(testPool.activePool).toBeDefined();
      expect(testPool.freePool).toBeDefined();
    });

    it('should create a new pool if none found', function() {
      var testPool;

      expect(Pool.totalPools).toEqual(0);
      testPool = Pool.acquirePool(testProto.className, testProto);
      expect(Pool.totalPools).toEqual(1);
    });

    it('should return the same Pool if already created', function() {
      var testPool1,
          testPool2;

      expect(Pool.totalPools).toEqual(0);
      testPool1 = Pool.acquirePool(testProto.className, testProto);
      expect(Pool.totalPools).toEqual(1);
      testPool2 = Pool.acquirePool(testProto.className, testProto);
      expect(Pool.totalPools).toEqual(1);
    });
  });

  describe('createPool', function() {
    var testProto;
    beforeEach(function() {
      this.addMatchers({
        toBeArray: function(expected) {
          return this.actual instanceof Array;
        }
      });
      testProto = Base.create(null, 'testProto', {
        testProp: {
          value: 1
        }
      });
    });

    it('should update the pools object with the new pool', function() {
      var testPool = Pool.createPool(testProto.className, testProto, 15);

      expect(Pool.pools[testProto.className]).toBeDefined();
    });

    it('should update the total Pools count', function() {
      var testPool;

      expect(Pool.totalPools).toEqual(0);
      testPool = Pool.createPool(testProto.className, testProto);
      expect(Pool.totalPools).toEqual(1);
    });

    it('will create a pool of initial size passed in', function() {
        var testSize = 25,
            testPool = Pool.createPool(testProto.className, testProto, testSize);

        expect(testPool.freePool.length).toEqual(testSize);
    });
  });

  describe('getPool', function() {
    it('should return the pool of an object if already created', function() {
      var testProto = {
            className: 'testProto'
          },
          testPool,
          actualPool;

      testPool = Pool.createPool('testProto', testProto, 15);

      actualPool = Pool.getPool(testProto);

      expect(actualPool).toBe(testPool);
    });

    it('should return undefined when the pool is not created', function() {
      var testProto = {
            className: 'testProto'
          },
          actualPool;

      actualPool = Pool.getPool(testProto);

      expect(actualPool).toBeUndefined();
    });
  });

  describe('PoolPrototype', function() {
    var testProto;
    beforeEach(function() {
      this.addMatchers({
        toBeArray: function(expected) {
          return this.actual instanceof Array;
        }
      });
      testProto = Base.create(null, 'testProto', {
        testProp: {
          value: 1
        }
      });
    });
    describe('init', function() {

      it('should set the active and free pools to empty arrays', function() {
        var testPool = Pool.createPool(testProto.className, testProto, 15);

        expect(testPool.activePool).toBeDefined();
        expect(testPool.freePool).toBeDefined();
        expect(testPool.freePool).toBeArray();
      });

      it('should set its base prototype as the object passed in', function() {
        var testPool = Pool.acquirePool(testProto.className, testProto);

        expect(testPool.basePrototype).toBe(testProto);
      });
    });

    describe('expandPool', function() {
      it('should expand the pool by the amount passed in', function() {
        var testPool = Pool.createPool(testProto.className, testProto, 1);

        expect(testPool.freePool.length).toEqual(1);
        testPool.expandPool(9);
        expect(testPool.freePool.length).toEqual(10);
      });

      // TODO this should use the config object
      it('should expand the pool by a default if not amount is passed in',
          function() {
        var testPool = Pool.createPool(testProto.className, testProto, 1),
            configAmount = 12;

        expect(testPool.freePool.length).toEqual(1);
        testPool.expandPool();
        expect(testPool.freePool.length).toEqual(13);
      });
    });

    describe('acquireMember', function() {
      it('should return the object passed in', function() {
        var testPool = Pool.createPool(testProto.className, testProto, 10),
            testInst = testPool.acquireMember();

        expect(testInst).toBeDefined();
        expect(typeof testInst).toEqual('object');
        expect(testInst.className).toEqual(testProto.className);
      });

      it('should expland the pool if it gets down to 0 members', function() {
        var testPool = Pool.createPool(testProto.className, testProto, 1);

        expect(testPool.freePool.length).toEqual(1);
        testPool.acquireMember();
        expect(testPool.freePool.length).toEqual(0);
        testPool.acquireMember();
        expect(testPool.freePool.length).toEqual(11);
      });

      it('should remove the member from the free pool', function() {
        var testPool = Pool.createPool(testProto.className, testProto, 1);

        expect(testPool.freePool.length).toEqual(1);
        testPool.acquireMember();
        expect(testPool.freePool.length).toEqual(0);
      });

      it('should add the member to the active pool', function() {
        var testPool = Pool.createPool(testProto.className, testProto, 1);

        expect(testPool.activePool.length).toEqual(0);
        testPool.acquireMember();
        expect(testPool.activePool.length).toEqual(1);
      });
    });

    describe('releaseMember', function() {
      it('should add a member to the free list and remove from the active list',
          function() {
        var testProto = {
              className: 'testProto'
            },
            testPool = Pool.createPool(testProto.className, testProto, 10);

        var s = testPool.acquireMember();
        expect(testPool.freePool.length).toEqual(9);
        expect(_.size(testPool.activePool.store)).toEqual(1);

        testPool.releaseMember(s);
        expect(testPool.freePool.length).toEqual(10);
        expect(testPool.activePool.length).toEqual(0);
      });

      it('should throw and error if the member doesn\'t exist yet', function() {
        var testProto = {
              id: 1,
              className: 'testProto'
            },
            testInst,
            testPool,
            stub;

        testPool = Pool.acquirePool(testProto.className, testProto);
        stub = sinon.stub(testPool, 'releaseMember');
        expect(stub.withArgs(testProto).throws('Error')).toBeTruthy();

        testPool.releaseMember.restore();
      });
    });
  });
});
