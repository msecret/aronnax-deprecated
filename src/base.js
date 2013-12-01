// Copyright (c) 2013
// All Rights Reserved
// aronnax - v0.1.1
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file base Holds the Base module
 */

define('aronnax/base',
  /**
   * Provides functionality to create a base prototype with a classname and 
   * properties to add to it.
   * @exports aronnax/Base
   */
  ['underscore'],
  function(_) {
    "use strict";

    /**
     * Used for getting the next id while assigning ids to new objects
     * @private
     */
    var _nextId = 0,
    /**
     * Hash structure for class ids to set next classId.
     * @private
     */
        _classIds  = {};

    /**
     * Returns the next id for a class;
     *
     * @private
     */
    function nextClassId(className) {
      if (!_classIds[className]) {
        _classIds[className] = 0;
      }

      return _classIds[className]++;
    }

    var Base = /** @lends module:aronnax/Base */ {

      /**
       * Creates a new object, maps to Object.create.
       * @param {Object} obj The object to inherit from
       * @param {String} name The name of the object.
       * @param {Object} props Properties to add to the inherited object.
       * @returns {Object} The newly created instance.
       */
      create: function (obj, name, props) {
        var o = Object.create(obj),
            prop,
            key;

        Object.defineProperty(o, "className",
          {
            value: name || 'Base',
            configurable: false,
            enumerable: false,
            writable: false
          });

        for (key in props) {
          if (props.hasOwnProperty(key)) {
            prop = props[key];
            if (typeof prop === 'function') {
              o[key] = prop;
            }
            else {
              Object.defineProperty(o, key, prop);
            }
          }
        }

        // TODO wrap init function so that it does its stuff then returns the
        // object to allow for chaining: ie Base.create(thing).init();

        return o;
      },

      /**
       * Will create the object and provide id and classIds for it.
       * @param {Object} obj The object to create and ID.
       * @returns {Object} The object created.
       */
      construct: function (obj) {
        var classId = nextClassId(obj.className),
          o = Object.create(obj, {
            'id': {
              enumerable: false,
              writable: false,
              value: _nextId++
            },
            'classId': {
              enumerable: false,
              writable: false,
              value: classId
            }
          });

        return o;
      }
    };

    return Base;
});
