// Copyright (c) 2013
// All Rights Reserved
// aronnax - v0.1.1
// https://github.com/msecret/aronnax
// Licensed MIT


define('aronnax/base',
 /**
  * Create an object with a classname and properties to add to it.
  * from.
  * @exports aronnax/base
  */
  ['underscore'],
  function(_) {
    "use strict";

    var _nextId = 0,
        _classIds = {};

    function nextClassId(className) {
      if (!_classIds[className]) {
        _classIds[className] = 0;
      }

      return _classIds[className]++;
    }

   /**
    * Create an object with a classname and properties to add to it.
    * from.
    * @name Base
    * @class Base
    * @exports aronnax/base
    */
    var Base = {
      /**
       * Creates a new object, maps to Object.create.
       * @method
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
