// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the pooled object
 */

define('aronnax/Pooled',
  ['aronnax/Base', 'aronnax/Pool'],
  function(Base, Pool) {

   /**
    * An object the provides pooling functionality
    * @exports aronnax/Pooled
    */
    var Pooled = Base.create(null, 'Pooled', {

      /**
       * Gets a free object from the pool, enhances it and then returns it.
       * @return {Object|Array|Function} The object being returned from the pool
       */
      make: function() {
        var f = Pool.acquire(this),
            key;

        return f;
      },

      /**
       * Releases a used object, cleans it, and returns it to the free pool.
       */
      free: function() {
        Pool.release(this);
      }
    });

    return Pooled;
});
