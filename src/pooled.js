// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the pooled object
 */

define('aronnax/pooled',
  ['aronnax/base', 'aronnax/pool'],
  function(Base, Pool) {

   /**
    * An object the provides pooling functionality
    * @exports aronnax/Pooled
    */
    var Pooled = Base.create(Object.prototype, 'Pooled', {

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
        return undefined;
      },

      /**
       * The current Pool object for this object prototype
       */
      pool: {
        // TODO is it possible to cache this?
        get: function() {
          var pool = Pool.getPool(this);
          return pool;
        }
      }
    });

    return Pooled;
});
