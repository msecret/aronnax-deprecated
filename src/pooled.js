// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file pooled Holds the Pooled module
 */

define('aronnax/pooled',
  /**
   * Pooled module.
   * @exports aronnax/Pooled
   * @see Pooled
   */
  ['aronnax/base', 'aronnax/pool'],
  function(Base, Pool) {

   /**
    * An object the provides pooling functionality
    * @class Pooled
    * @extends Base
    */
    var Pooled = Base.create(Object.prototype, 'Pooled',
      /** @lends Pooled.prototype */
      {

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
