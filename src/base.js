// Copyright (c) 2013
// All Rights Reserved
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
   * @extends Base
   * @see Base
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

    /**
     * Will create the object and provide id and classIds for it.
     * @private
     * @param {Object} obj The object to create and ID.
     * @returns {Object} The object created.
     */
    function construct(obj) {
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

    /**
     * Base protype to extend off of. Provides class name property and method
     * to construct an instance of the prototype.
     * @class Base
     */
    var BaseProto = /** @lends Base.prototype */ {
      /**
       * Class name of the prototype being created.
       * @type String
       * @default Base
       */
      className: {
        value: 'Base',
        configurable: false,
        enumerable: false,
        writable: true
      },
      /**
       * Constructs an instance of the protoype, assigning an id and a class
       * id.
       * @return {Object} An instance object of the prototype.
       */
      construct: function() {
        return construct(this);
      }
    };

    var Base = /** @lends module:aronnax/Base */ {

      /**
       * Creates a new object, maps to Object.create.
       * @param {Object} obj The object to inherit from
       * @param {String} name The name of the object.
       * @param {Object} props Properties to add to the inherited object.
       * @returns {Object} The newly created instance.
       */
      create: function (obj, name, props) {
        var o,
            prop,
            f,
            key;

        if (obj && !obj.className) {
          f = Object.create(obj);
          f.prototype = Object.create(BaseProto);
        }

        o = Object.create(f || obj);
        o.className = name || 'Base';

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
        return construct(obj);
      }
    };

    return Base;
});
