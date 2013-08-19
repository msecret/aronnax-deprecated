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
          actual = store.stringify(testArray);

      expect(actual).toEqual('value1*value2');
    });

    it('should stringify a function by compiling a string of it', function() {
      var testFunction = function(arg1) { return arg1; },
          actual = store.stringify(testFunction);

      expect(actual).toEqual('function (arg1) { return arg1; }');
    });
    it('should stringify an object by JSON stringifying it', function() {
      var testObj = {'testProp1': 1},
          actual = store.stringify(testObj);

      expect(actual).toEqual(JSON.stringify(testObj));
    });
  });

  describe('put', function() {
    it('should return the item put in', function() {
      var testObj = { },
          actual;

      actual = store.put(testObj);

      expect(actual).toBe(testObj);
    });
    it('should put an IDd object into the data store by id', function() {
      var testObj = {
        id: 1,
        testProp: 'test'
      },
          actual;

      store.put(testObj);
      actual = store.store[1];

      expect(actual).toBe(testObj);
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
          actual,
          stringedArray;

      store.put(testArray);
      stringedArray = store.stringify(testArray);
      actual = store.store[stringedArray];

      expect(actual).toBeArray();
      expect(actual.length).toEqual(1);
    });
    it('should put a non IDd object onto the array', function() {
      var testArray = ['sdf'],
          actual,
          stringedArray;

      store.put(testArray);
      stringedArray = store.stringify(testArray);
      actual = store.store[stringedArray][0];

      expect(actual).toEqual(testArray);
    });
    it('should push objects that are equal onto the array', function() {
      var testArray = ['sdf'],
          actual,
          stringedArray;

      store.put(testArray);
      stringedArray = store.stringify(testArray);
      actual = store.store[stringedArray][0];

      expect(actual).toEqual(testArray);

      store.put(testArray);
      stringedArray = store.stringify(testArray);
      actual = store.store[stringedArray][1];

      expect(actual).toEqual(testArray);
    });
    it('should put a non IDd function onto the array', function() {
      var testFunction = function moon() { return 1; },
          actual,
          stringedFunc;

      store.put(testFunction);
      stringedFunc = store.stringify(testFunction);
      actual = store.store[stringedFunc][0];

      expect(actual).toEqual(testFunction);
    });
    it('should put a non IDd object onto the array', function() {
      var testObject = {'test': 'testa'},
          actual,
          stringedObject;

      store.put(testObject);
      stringedObject = store.stringify(testObject);
      actual = store.store[stringedObject][0];

      expect(actual).toEqual(testObject);

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
          actual;

      actual = store.get(testObj1);
      expect(actual).toBeUndefined();
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


});
