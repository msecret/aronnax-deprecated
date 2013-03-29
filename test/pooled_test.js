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

});

describe('aronnax.Pooled', function() {

});
