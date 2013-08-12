// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the pooled object
 */

define('aronnax/Pooled',
  ['aronnax/Pool'],
  function(Pool) {

   /**
    * An object the provides pooling functionality
    * @exports aronnax/Pooled
    */
    var Pooled = {

      /**
       * Gets a free object from the pool, enhances it and then returns it.
       * @return {Object|Array|Function} The object being returned from the pool
       */
      make: function() {
        var f = Pool.acquire(this),
            key;

        f = {};

        for (key in this) {
          if (this.hasOwnProperty(key)) {
            f[key] = this[key];
          }
        }

        f.release = Pooled.release;
        this.init.apply(f, arguments);

        return f;
      },

      /**
       * Releases a used object, cleans it, and returns it to the free pool.
       */
      release: function() {

      }
    };

    return Pooled;
});
