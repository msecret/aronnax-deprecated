// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Store', function() {
  var Store,
      store;

  beforeEach(function() {
    var flag = false;
    this.addMatchers({
      toBeArray: function(expected) {
        return this.actual instanceof Array;
      }
    });

    require(['aronnax/Store'], function(_Store) {
      Store = _Store;
      store = Object.create(Store);
      store.init();
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });

  describe('init', function() {
    it('should create a private dataStore property', function() {
      store.init();

      expect(store._dataStore).toBeDefined();
      expect(store.store).toBeDefined();
      expect(typeof store.store).toEqual('object');
    });
  });

  describe('stringify', function() {
    it('should stringy an array by concatting all values', function() {
      var testArray = ['value1', 'value2'],
          stringedArray = store.stringify(testArray);

      expect(stringedArray).toEqual('value1*value2');
    });

    it('should stringify a function by compiling a string of it', function() {
      var testFunction = function(arg1) { return arg1; },
          stringedFunc = store.stringify(testFunction);

      expect(stringedFunc).toEqual('function (arg1) { return arg1; }');
    });

    it('should stringify an object by JSON stringifying it', function() {
      var testObj = {'testProp1': 1},
          sttingedObj = store.stringify(testObj);

      expect(sttingedObj).toEqual(JSON.stringify(testObj));
    });
  });

  describe('put', function() {
    it('should return the item put in', function() {
      var testObj = { },
          storeItem;

      storeItem = store.put(testObj);

      expect(storeItem).toBe(testObj);
    });

    it('should put an IDd object into the data store by id', function() {
      var testObj = {
            id: 1,
            testProp: 'test'
          },
          storeItem;

      store.put(testObj);
      storeItem = store.store[1];

      expect(storeItem).toBe(testObj);
    });

    it('should throw a key collision error if two objects with the same id' +
        'are stored', function() {
      var testObj = {
            id: 1,
            testProp: 'test'
          },
          stub;

      store.put(testObj);
      stub = sinon.stub(store, 'put');
      expect(store.store[1]).toEqual(testObj);
      expect(stub.withArgs(testObj).throws('Error')).toBeTruthy();

      store.put.restore();
    });

    it('should put a non IDd object with an array', function() {
      var testArray = ['sdf'],
          storeArray,
          stringedArray;

      store.put(testArray);
      stringedArray = store.stringify(testArray);
      storeArray = store.store[stringedArray];

      expect(storeArray).toBeArray();
      expect(storeArray.length).toEqual(1);
    });

    it('should put a non IDd object onto the array', function() {
      var testArray = ['sdf'],
          storeArray,
          stringedArray;

      store.put(testArray);
      stringedArray = store.stringify(testArray);
      storeArray = store.store[stringedArray][0];

      expect(storeArray).toEqual(testArray);
    });

    it('should push objects that are equal onto the array', function() {
      var testArray = ['sdf'],
          testVal,
          stringedArray;

      store.put(testArray);
      stringedArray = store.stringify(testArray);
      testVal = store.store[stringedArray][0];

      expect(testVal).toEqual(testArray);

      store.put(testArray);
      stringedArray = store.stringify(testArray);
      testVal = store.store[stringedArray][1];

      expect(testVal).toEqual(testArray);
    });

    it('should put a non IDd function onto the array', function() {
      var testFunction = function moon() { return 1; },
          storeResult,
          stringedFunc;

      store.put(testFunction);
      stringedFunc = store.stringify(testFunction);
      storeResult = store.store[stringedFunc][0];

      expect(storeResult).toEqual(testFunction);
    });

    it('should put a non IDd object onto the array', function() {
      var testObject = {'test': 'testa'},
          storeResult,
          stringedObject;

      store.put(testObject);
      stringedObject = store.stringify(testObject);
      storeResult = store.store[stringedObject][0];

      expect(storeResult).toEqual(testObject);

    });
  });

  describe('get', function() {
    var store;

    beforeEach(function() {
      store = {};
      store = Object.create(Store);
      store.init();
    });
    it('should get an IDd object thats in the store', function() {
      var testObj1 = {
            id: 1
          },
          testObj2 = {
            id: 2
          };

      store.put(testObj1);
      store.put(testObj2);

      expect(store.get(testObj1)).toBe(testObj1);
      expect(store.get(testObj2)).toBe(testObj2);
    });

    it('should return nothing for an IDd object not in the store', function() {
      var testObj1 = {
            id: 1
          },
          storeResult;

      storeResult = store.get(testObj1);
      expect(storeResult).toBeUndefined();
    });

    it('should get a non IDd object thats in the store', function() {
      var testArray1 = ['moon'],
          testArray2 = ['soom'];

      store.put(testArray1);
      store.put(testArray2);

      expect(store.get(testArray1)).toBe(testArray1);
      expect(store.get(testArray2)).toBe(testArray2);
    });

    it('should return none for a non IDd object not in the store', function() {
      var testArray1 = ['moon'];

      expect(store.get(testArray1)).toBeUndefined();
    });
  });

  describe('remove', function() {
    it('should remove a found IDd item from the store', function() {
      var testObj = {
        id: 1
      };

      store.put(testObj);
      expect(store.get(testObj)).toBe(testObj);
      expect(store.store[1]).toBe(testObj);

      store.remove(testObj);
      expect(store.get(testObj)).toBeUndefined();
      expect(store.store[1]).toBeUndefined();
    });

    it('should remove a found non IDd item from the store', function() {
      var testArr1 = ['sdf'],
          testArr2 = ['sdfg'];

      store.put(testArr1);
      expect(store.get(testArr1)).toBe(testArr1);
      store.put(testArr2);
      expect(store.get(testArr2)).toBe(testArr2);

      store.remove(testArr1);
      expect(store.get(testArr1)).toBeUndefined();
      expect(store.get(testArr2)).toBe(testArr2);

      store.remove(testArr2);
      expect(store.get(testArr2)).toBeUndefined();
    });

    it('should remove one item from a non IDd item when there are multiple',
        function() {
      var testArr1 = ['asd'],
          testArr2 = ['asd'],
          arrStr = store.stringify(testArr1);

      store.put(testArr1);
      store.put(testArr2);

      expect(store.store[arrStr].length).toEqual(2);

      store.remove(testArr1);
      expect(store.store[arrStr].length).toEqual(1);

      store.remove(testArr2);
      expect(store.store[arrStr].length).toEqual(0);
    });
  });

  describe('length', function() {
    it('should start out at zero', function() {
      expect(store.length).toEqual(0);
    });

    it('should return the amount of objects in the store when added', function() {
      var testObj1 = {
            id: 1
          },
          testObj2 = {
            id: 2
          };

      store.put(testObj1);
      expect(store.length).toEqual(1);
      store.put(testObj2);
      expect(store.length).toEqual(2);
    });

    it('should return the amount of objects in the store when removed',
        function() {
      var testObj1 = {
            id: 1
          },
          testObj2 = {
            id: 2
          };

      store.put(testObj1);
      store.put(testObj2);
      expect(store.length).toEqual(2);

      store.remove(testObj1);
      expect(store.length).toEqual(1);
      store.remove(testObj2);
      expect(store.length).toEqual(0);
    });
  });
});
