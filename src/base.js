// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the Base object
 */

/**
* A base object to inherit from the provide a shared object to inherit
* from.
* @module aronnax.Base
*/
define('aronnax/Base',
  ['underscore'],
  function(_) {
    "use strict";

   /**
    * A base object to inherit from the provide a shared object to inherit
    * from.
    * @exports aronnax.Base
    */
    var Base = {
      /**
       * Creates a new object, maps to Object.create.
       * @param {Object} obj The object to inherit from
       * @param {String} name The name of the object.
       * @param {Object} props Properties to add to the inherited object.
       * @returns {Object} The newly created instance.
       */
      create: function(obj, name, props) {
        var o = Object.create(obj),
            prop,
            key;

        Object.defineProperty(o, "className",
          { value : name || 'Base',
            configurable: false,
            enumerable: false,
            writable: false });

        for (key in props) {
          prop = props[key];
          if (props.hasOwnProperty(key)) {
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
      }
    }

    return Base;
});
