// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file The aronnax specific utility class
 */

define('aronnax/util',
  ['underscore', 'aronnax/Config', 'aronnax/Logger'],
  function(_, Config, Logger) {
    "use strict";

    var _log = Logger.getLog('aronnax.util');

    function clearArray(array) {
      array.length = 0;
    }

    function clearObject(object) {
      var key;

      for (key in object) {
        if (object.hasOwnProperty(key)) {
          delete object[key];
        }
      }
    }

    /**
     * @module util
     */
    var util = {
      /**
       * Cleans any type of primitive, object or array. For an object will clear
       * all it's propertyes, for an array it will clear all it's elements.
       * @param {Object|Array} thing The primitive to be cleared.
       * @return {Object|Array} The cleaned thing.
       */
      cleanAnything: function(thing) {
        if (_.isArray(thing)) {
          clearArray(thing);
        }
        else if (_.isObject(thing)) {
          clearObject(thing);
        }

        return thing;
      }
    };

    return util;
});