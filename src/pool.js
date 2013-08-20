// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the pool static class and the pooled class to make an object
 * pooled.
 */

define('aronnax/Pool',
  ['aronnax/Base', 'aronnax/Logger', 'aronnax/Config', 'aronnax/Store'],
  function(Base, Logger, config, Store) {
    "use strict";

    var _log = Logger.getLog('aronnax.Pool');

    /**
     * Creates a member of a certain type by looking at the passed in class name.
     * @private
     * @param {String} className The name of the class
     * @return {Object|Array|Function} The member of a certain type
     */
    function _createMember(className) {
      /*jshint validthis:true */
      var toreturn;
      switch(className) {
        case 'array':
          toreturn = [];
          break;
        case 'function':
          toreturn = function() {};
          break;
        case 'Base':
        case 'object':
          toreturn = {};
          break;
        default:
          toreturn = Object.create(this.basePrototype);
          break;
      }

      return toreturn;
    }

    var PoolPrototype = Base.create(null, 'Pool', {
      /**
      * The current pool of active members, a store
      * @type Object
      */
      activePool: {
        writable: true
      },
      /**
      * A free pool of objects ready to be used
      * @type Array
      */
      freePool: {
        writable: true
      },
      /**
      * The base prototype to use when creating new objects for the pool
      * @type Object
      */
      basePrototype: {
        configurable: true,
        writable: true
      },
      init: function(initialSize, basePrototype) {
        this.freePool = [];
        this.activePool = Object.create(Store);
        this.basePrototype = basePrototype;

        this.expandPool(initialSize);
      },

      /**
       * Expand the free pool array by a certain amount
       * @param {Number} byAmount The amount to expand the pool by
       */
      expandPool:function(byAmount) {
        var i = 0,
            amount = byAmount || config.initialPoolSizeAmount;

        for ( ; i < amount; i++) {
          var item = _createMember.call(this, this.className);
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
        var member = this.freePool.pop();
        this.activePool.put(member);
        return member;
      }

    });

    // TODO return this into regular way.
    var Pool = {};
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
    Pool.acquirePool = function(className, objPrototype) {
      var pool = this.pools[className];
      if (!pool) {
        pool = this.createPool(className, objPrototype);
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
        if (window.toString.call(classMember) === '[object Array]') {
          className = 'array';
        }
        else if (typeof classMember === 'function') {
          className = 'function';
        }
        else if (typeof classMember === 'object') {
          className = 'object';
        }
        else {
          _log.error('Aquired Pool class not a string');
          throw new Error('Aquired Pool class not a string');
        }
      }
      var pool = this.acquirePool(className, classMember);

      return pool.acquireMember();
    };


    /**
     * Creates a new pool of a certain type
     * @static
     * @param {Sting} className The name of the class
     * @param {Number} initialSize The initial size to make the free pool
     * @return {arronax.Pool} The new pool of the class type
     */
    Pool.createPool = function(className, objPrototype, initialSize) {
      var pool = Object.create(PoolPrototype);
      pool.init(initialSize, objPrototype);

      this.totalPools += 1;
      this.pools[className] = pool;
      return pool;
    };

    return Pool;
});
