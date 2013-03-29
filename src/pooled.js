/**
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

/**
 * @file Holds the pooled class 
 */

goog.provide('aronnax.Pool');
goog.provide('aronnax.Pooled');
goog.require('aronnax.accessor');
goog.require('aronnax.Logger');

(function(goog, aronnax) {


/**
 * A local log 
 * @private
 * @type aronnax.Logger
 */
var _log = aronnax.Logger.getLog('pooled');

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

  return toreturn;
};

/** 
 * A class that holds and works with the actual pool of objects 
 * @class
 * @constuctor
 * @this aronnax.Pooled
 * @mixes aronnax.accessor
 */
aronnax.Pool = function(className, initialSize) {
  var amount = initialSize || aronnax.config.INITIAL_POOL_SIZE;
  /**
   * The current pool of active members, a hashtable 
  * @type Hashtable
  * @instance
  */
  this.activePool = new Hashtable();
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

  // Setup initial pool
  this.expandPool(amount);
};
goog.mixin(aronnax.Pool.prototype, aronnax.accessor);

/** 
 * Expand the free pool array by a certain amount 
 * @param {Number} byAmount The amount to expand the pool by
 */
aronnax.Pool.prototype.expandPool = function(byAmount) {
  var i = 0,
      amount = byAmount || aronnax.config.POOL_EXPAND_AMOUNT;
 
  for ( ; i < amount; i++) {
    var item = _createMember(this.className);
    this.freePool.push(item);
  }
};

/** 
 * Aquires a member from the free pool 
 * @return {Object|Array|Function} The empty member returned from the pool
 */
aronnax.Pool.prototype.acquireMember = function() {
  if (this.freePool.length <= 0) {
    this.expandPool();
  }
  return this.freePool.pop();  
};

/**
 * All the current pools, as a hash with the class type as the key.
 * @static
 * @type aronnax.Pool
 */
aronnax.Pool.pools = {};

/**
 * Count of the current total pools 
 * @static
 * @type Number 
 */
aronnax.Pool.totalPools = 0;

/**
 * Gets the pool of the class type, creating one if it doesn't exists 
 * @static
 * @param {Sting} className The name of the class
 * @return {arronax.Pool} The pool of the class type 
 */
aronnax.Pool.acquirePool = function(className) {
  var pool = aronnax.Pool.pools[className];
  if (!pool) {
    pool = aronnax.Pool.createPool(className);
  }

  return pool;
};

/**
 * Creates a new pool of a certain type 
 * @static
 * @param {Sting} className The name of the class
 * @param {Number} initialSize The initial size to make the free pool
 * @return {arronax.Pool} The new pool of the class type
 */
aronnax.Pool.createPool = function(className, initialSize) {
  var pool = new aronnax.Pool(className, initialSize);
  aronnax.Pool.pools[className] = pool;
  aronnax.Pool.totalPools += 1;
  return pool;
};

/**
 * Aquires a free member from the pool. Maps directly to the acquire pool method
 * and then the Pool.acquire method. Uses a non-standard Function.name property
 * to obtain the class name. 
 * @static
 * @param {Object|Array|Function} classMember The object being fetch from pool
 * @return {Object|Array|Function} The object being return from the pool
 */
aronnax.Pool.acquire = function(classMember) {
  var className = classMember.name;
  if (typeof className !== 'string') {
    _log.error('Aquired Pool class not a string');
  }
  var pool = aronnax.Pool.acquirePool(className);

  return pool.acquireMember();
};


/**
 * A class that provides object pooling 
 * @class
 * @constuctor
 * @this aronnax.Pooled
 * @mixes aronnax.accessor
 */
aronnax.Pooled = function() {
};

aronnax.Pooled.make = function(params) {
  // Get empty pooled member of certain type
  var member = aronnax.Pool.acquire(this);
  // Call the create method on it to put in props, if it has them
  // member = member.parent.create();
  // Fill in prototype
};

})(goog, aronnax);
