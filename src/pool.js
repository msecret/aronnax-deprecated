// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the pool static class and the pooled class to make an object
 * pooled.
 */

define('aronnax/Pool',
  function() {

    /**
     * Creates a member of a certain type by looking at the passed in class name.
     * @private
     * @param {String} className The name of the class
     * @return {Object|Array|Function} The member of a certain type
     */
    var _createMember = function(className) {
      var toreturn = null;
      switch(className) {
        case 'Array':
          toreturn = [];
          break;
        case 'Function':
          toreturn = function() {};
          break;
        default:
        case 'Object':
          toreturn = {};
          break;
      }
    };

    var PoolPrototype = {
      init: function(className, initialSize) {
        /**
        * The current pool of active members, a hashtable
        * @instance
        */
        this.activePool = {};

        /**
         * The free pool of members
         * @type Array
         * @instance
         */
        this.freePool = [];

        /**
         * The class name of the member pool
         * @type String
         * @instance
         */
        this.className = className;
      },

      /**
       * Expand the free pool array by a certain amount
       * @param {Number} byAmount The amount to expand the pool by
       */
      expandPool:function(byAmount) {
        var i = 0,
            // TODO replace magic number with config
            amount = byAmount || 12;

        for ( ; i < amount; i++) {
          var item = _createMember(this.className);
          this.freePool.push(item);
        }
      },

      /**
       * Aquires a member from the free pool
       * @return {Object|Array|Function} The empty member returned from the pool
       */
      acquireMember: function() {
        if (this.freePool.length <= 0) {
          this.expandPool();
        }
        return this.freePool.pop();
      }

    };

    var Pool = Object.create(PoolPrototype);

    /**
     * All the current pools, as a hash with the class type as the key.
     * @static
     * @type aronnax.Pool
     */
    Pool.pools = {};

    /**
     * Count of the current total pools
     * @static
     * @type Number
     */
    Pool.totalPools = 0;

    /**
     * Gets the pool of the class type, creating one if it doesn't exists
     * @static
     * @param {Sting} className The name of the class
     * @return {arronax.Pool} The pool of the class type
     */
    Pool.acquirePool = function(className) {
      var pool = this.pools[className];
      if (!pool) {
        pool = this.createPool(className);
      }

      return pool;
    };

    /**
     * Aquires a free member from the pool. Maps directly to the acquire
     * pool methodand then the Pool.acquire method. Uses a non-standard
     * Function.name property to obtain the class name.
     * @static
     * @param {Object|Array|Function} classMember The object being fetch from
     * pool
     * @return {Object|Array|Function} The object being return from the pool
     */
    Pool.acquire = function(classMember) {
      var className = classMember.className;
      if (typeof className !== 'string') {
        //_log.error('Aquired Pool class not a string');
        return;
      }
      var pool = this.acquirePool(className);

      return pool.acquireMember();
    };


    /**
     * Creates a new pool of a certain type
     * @static
     * @param {Sting} className The name of the class
     * @param {Number} initialSize The initial size to make the free pool
     * @return {arronax.Pool} The new pool of the class type
     */
    Pool.createPool = function(className, initialSize) {
      var pool = Object.create(Pool);
      pool.init(className, initialSize);

      this.totalPools += 1;
      return pool;
    };

    return Pool;
});
