// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the Store object
 */

define('aronnax/Store',
  ['underscore', 'aronnax/Base'],
  function(_, Base) {

    /**
     * Takes any object and creates a string representation of it.
     * @private
     * @param {Object|Array|Function} obj The object to stringify
     * @returns {String} The string representation of the object.
     */
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

    /**
     * A Store that uses hashing
     * @module aronnax/Store
     * @exports aronnax/Store
    */
    var Store = Base.create(null, 'Store', {

      /**
       * The actual data store structure, as a hash.
       * @protected
       */
      _dataStore: {
        writable: true,
        value: {}
      },

      /**
       * The accessible data store.
       * @type Object
       */
      store: {
        get: function() { return this._dataStore; }
      },

      /**
       * Initializes the store
       */
      init: function() {
        this._dataStore = {};
      },

      /**
       * Will add a new item to the store, either ID'ed or not
       * @param {Object|Array|Function} item The item to add
       * @returns {Object|Array|Function} The item passed in.
       */
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

      /**
       * Will get the passed in object from the store.
       * @param {Object|Array|Function} item The item to add
       * @returns {Object|Array|Function} The item passed in.
       */
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
