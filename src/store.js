// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the Store object
 */

/**
* A Store that uses hashing
* @module aronnax.Store
*/

define('aronnax/Store',
  ['underscore', 'aronnax/Base'],
  function(_, Base) {

    function objectToString(obj) {
      if (_.isArray(obj)) {
        return obj.join('*');
      }
      else if (_.isFunction(obj)) {
        return obj.toString();
      }
      else if (_.isObject(obj)) {
        return JSON.stringify(obj);
      }
      else {
        return obj.toString();
      }
    }

    var Store = Base.create(null, 'Store', {

      _dataStore: {
        writable: true,
        value: {}
      },

      store: {
        get: function() { return this._dataStore; }
      },

      init: function() {
        this._dataStore = {};
      },

      put: function(item) {
        var stringObjectValue;

        if (item.id) {
          if (this._dataStore[item.id]) {
            throw new Error('Object key collision occurred, cannot store key');
          }
          this._dataStore[item.id] = item;
        }
        else {
          stringObjectValue = this.stringify(item);
          if (!this._dataStore[stringObjectValue]) {
            this._dataStore[stringObjectValue] = [];
          }
          this._dataStore[stringObjectValue].push(item);
        }

        return item;
      },

      get: function(item) {
        var stringObjectValue;

        if (item.id) {
          return this._dataStore[item.id];
        }
        else {
          stringObjectValue = this.stringify(item);
          if (!this._dataStore[stringObjectValue]) {
            return;
          }
          return this._dataStore[stringObjectValue].pop();
        }
      },

      stringify: function(item) {
        return objectToString(item);
      }
    });

    return Store;
});
