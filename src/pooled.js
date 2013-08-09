// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the pool static class and the pooled class to make an object
 * pooled.
 */

define('aronnax/Pooled',
  ['aronnax/Pool'],
  function(Pool) {
    /**
     * A class that provides object pooling
     * @class
     * @mixes aronnax.accessor
     */
    var Pooled = {

      /**
       * function that gets a free object from the pool and returns it after
       * created.
       * @return {Object|Array|Function} The object being return from the pool
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

      release: function() {

      }
    };

    return Pooled;
});
