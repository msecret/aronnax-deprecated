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
       * The accessible data store.
       * @type Object
       */
      store: {
        get: function() { return this._dataStore; }
      },

      /**
       * The current amount of objects in the store
       * @type Number
       */
      length: {
        get: function() { return _.size(this._dataStore); }
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
        if (item.classId) {
          if (this._dataStore[item.classId]) {
            throw new Error('Object key collision occurred, cannot store key');
          }
          this._dataStore[item.classId] = item;
        }
        else if (item.id) {
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

        if (item.classId) {
          return this._dataStore[item.classId];
        }
        if (item.id) {
          return this._dataStore[item.id];
        }
        else {
          stringObjectValue = this.stringify(item);
          if (!this._dataStore[stringObjectValue]) {
            return;
          }
          return this._dataStore[stringObjectValue][0];
        }
      },

      /**
       * Creates a string representation of an object
       * @param {Array|Object|Funciton} item The item to stringify
       * @returns {String} The string representation
       */
      stringify: function(item) {
        return objectToString(item);
      },

      /**
       * Removes an item from the data store, if it is found.
       * @param {Object|Array|Function} item The item to remove
       * @returns {Undefined}
       */
      // TODO Parts of this just reuse the gets functionality
      remove: function(item) {
        var existingItem = this.get(item),
            stringObjectValue;

        if (existingItem) {
          if (item.classId) {
            delete this._dataStore[item.classId];
          }
          if (item.id) {
            delete this._dataStore[item.id];
          }
          else {
            stringObjectValue = this.stringify(item);
            return this._dataStore[stringObjectValue].pop();
          }
          return existingItem;
        }
      }
    });

    return Store;
});
