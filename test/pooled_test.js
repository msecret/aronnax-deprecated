/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
  set et ts=2 sw=2 tw=80:*/

goog.require('aronnax.main');

describe('aronnax.Pool', function() {

  describe('createPool', function() {
    var testClassName = 'testClass';
    var testInitialzSize = 20;
    var testPool = null;
    beforeEach(function() {
      aronnax.Pool.pools = {};
      aronnax.Pool.totalPools = 0;
      testPool = aronnax.Pool.createPool(testClassName); 
    });
    it('should create a pool of a certain type', function() {
      var actual = testPool.get('className');
      var expected = testClassName;
      expect(actual).toEqual(expected); 
    }); 
    it('should initialize an array of free members', function() {
      var actual = testPool.get('freePool');
      expect(actual.length).toBeGreaterThan(0);
    });
    it('should initialize the free pool by the amount specifed', function() {
      var testPool = aronnax.Pool.createPool(testClassName, 20); 
      var actual = testPool.get('freePool');
      expect(actual.length).toEqual(20);
    });
    it('should initialized the free pool by config var if not specified', 
        function() {
      var expected = aronnax.config.INITIAL_POOL_SIZE;
      var actual = testPool.get('freePool');
      expect(actual.length).toEqual(expected);
    });
    it('should increase the total pools count', function() {
      var actual = aronnax.Pool.totalPools;
      expect(actual).toEqual(1);
      var testClass = aronnax.Pool.createPool('newTestClass');
      actual = aronnax.Pool.totalPools;
      expect(actual).toEqual(2);
    });
  });

  describe('expandPool', function() {
    var testClassName = 'testClass';
    var testPool = null;
    beforeEach(function() {
      aronnax.Pool.pools = {};
      aronnax.Pool.totalPools = 0;
      testPool = aronnax.Pool.createPool(testClassName); 
    });
    it('should expand the pool by the size passed in', function() {
      testPool.expandPool(20);
      var expected = 20 + aronnax.config.INITIAL_POOL_SIZE;
      var actual = testPool.freePool.length;
      expect(actual).toEqual(expected);
    });
  });

  describe('acquirePool', function() {
    var testClassName = 'testClass';
    it('should create a new pool of name if not created yet', function() {
      var pool = aronnax.Pool.acquirePool(testClassName);
      var actual = pool.get('className');
      expect(actual).toEqual(testClassName);
    });
    it('should get the pool if already created', function() {
      var pool = aronnax.Pool.createPool(testClassName);
      var gottenPool = aronnax.Pool.acquirePool(testClassName);
      expect(gottenPool).toBe(pool);
    });
  });

  describe('acquire', function() {
    function TestClass() {}
    it('should return an empty object from a custom class', function() {
      var actual = aronnax.Pool.acquire(TestClass);
      expect(actual).toEqual({});
    });
    it('should return an empty object from Object class', function() {
      var actual = aronnax.Pool.acquire(Object);
      expect(actual).toEqual({});
    });
    it('should return an empty array from Array class', function() {
      var actual = aronnax.Pool.acquire(Array);
      expect(actual).toEqual([]);
    });
    it('should return an empty  function from Function class', function() {
      var actual = aronnax.Pool.acquire(Function);
      expect(typeof actual).toEqual('function');
    });
  });

  describe('acquireMember', function() {
    var testClassName = 'testClass';
    it('should return an empty member', function() {
      var pool = aronnax.Pool.acquirePool(testClassName);
      var actual = pool.acquireMember();
      expect(actual).toEqual({});
    });
  });

});

describe('aronnax.Pooled', function() {
  
});
