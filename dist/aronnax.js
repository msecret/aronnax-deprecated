// Copyright (c) 2013
// All Rights Reserved
// aronnax - v0.2.0
// https://github.com/msecret/aronnax
// Licensed MIT

// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file base Holds the Base module
 */

define('aronnax/base',
  /**
   * Provides functionality to create a base prototype with a classname and 
   * properties to add to it.
   * @exports aronnax/Base
   * @extends Base
   * @see Base
   */
  ['underscore'],
  function(_) {
    "use strict";

    /**
     * Used for getting the next id while assigning ids to new objects
     * @private
     */
    var _nextId = 0,
    /**
     * Hash structure for class ids to set next classId.
     * @private
     */
        _classIds  = {};

    /**
     * Returns the next id for a class;
     *
     * @private
     */
    function nextClassId(className) {
      if (!_classIds[className]) {
        _classIds[className] = 0;
      }

      return _classIds[className]++;
    }

    /**
     * Will create the object and provide id and classIds for it.
     * @private
     * @param {Object} obj The object to create and ID.
     * @returns {Object} The object created.
     */
    function construct(obj) {
      var classId = nextClassId(obj.className),
        o = Object.create(obj, {
          'id': {
            enumerable: false,
            writable: false,
            value: _nextId++
          },
          'classId': {
            enumerable: false,
            writable: false,
            value: classId
          }
        });

      return o;
    }

    /**
     * Base protype to extend off of. Provides class name property and method
     * to construct an instance of the prototype.
     * @class Base
     */
    var BaseProto = /** @lends Base.prototype */ {
      /**
       * Class name of the prototype being created.
       * @type String
       * @default Base
       */
      className: {
        value: 'Base',
        configurable: false,
        enumerable: false,
        writable: true
      },
      /**
       * Constructs an instance of the protoype, assigning an id and a class
       * id.
       * @return {Object} An instance object of the prototype.
       */
      construct: function() {
        return construct(this);
      }
    };

    var Base = /** @lends module:aronnax/Base */ {

      /**
       * Creates a new object, maps to Object.create.
       * @param {Object} obj The object to inherit from
       * @param {String} name The name of the object.
       * @param {Object} props Properties to add to the inherited object.
       * @returns {Object} The newly created instance.
       */
      create: function (obj, name, props) {
        var o,
            prop,
            f,
            key;

        if (obj && !obj.className) {
          f = Object.create(obj);
          f.prototype = Object.create(BaseProto);
        }

        o = Object.create(f || obj);
        o.className = name || 'Base';

        for (key in props) {
          if (props.hasOwnProperty(key)) {
            prop = props[key];
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
      },

      /**
       * Will create the object and provide id and classIds for it.
       * @param {Object} obj The object to create and ID.
       * @returns {Object} The object created.
       */
      construct: function (obj) {
        return construct(obj);
      }
    };

    return Base;
});

// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

define('aronnax/config', [],function() { 
'use strict';
var Config = {"env":"dev","initialPoolSizeAmount":12,"fps":60};
return Config;
});

/**
 * @file base Holds the logWriter dependency 
 */

define('deps/logWriter',
  [],function() {
    return window.console;
});

// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file logger holds the Logger module
 */

define('aronnax/logger',
  /**
   * A factory interface to create named logs of instance {Log}
   * @exports aronnax/Logger
   * @see Log
   */
  ['underscore', 'aronnax/base', 'aronnax/config', 'deps/logWriter'],
  function(_, Base, config, logWriterObject) {
    "use strict";

   /**
    * A log which will provide logging capabilities
    * @class Log
    * @extends Base
    */
    var Log = Base.create(Object.prototype, 'Log',
      /** @lends Log.prototype **/
      {

      /**
       * Initializes the log.
       *
       * @param {String} name The name of the log, displayed in output.
       * @param {Object} logWriter The interface to use to write the log. This
       * interface can be window.console or other solutions. It should conform
       * to the same interface as window.console; debug, log, warn, error.
       */
      init: function(name, logWriter) {
        /**
         * The name of the log
         * @instance
         * @default window.location.hostname
         */
        this.name = name || window.location.hostname;

        /**
         * The object responsible for writing the log, such as console.
         * @protected
         * @instance
         */
        this._logWriter = logWriter;
        Logger.logs.push(this);
      },


      /**
       * Logging message as the "log" type of message
       * @param {String|Object} message The message to log, as a string or an
       * object with different parameters
       */
      log: function(message) {
        this._write('log', message);
      },

      /**
       * Logging message as the "warn" type of message
       * @param {String|Object} message The message to log, as a string or an
       * object with different parameters
       */
      warn: function(message) {
        this._write('warn', message);
      },

      /**
       * Logging message as the "error" type of message
       * @param {String|Object} message The message to log, as a string or an
       * object with different parameters
       */
      error: function(message) {
        this._write('error', message);
      },

      /**
       * Log an error or message, intermediate function
       * @protected
       * @param {String} type The type of log message, defaults to error,
       * warning and debug.
       * @param {String|Object} message The message to log, as a string or an object
       * with different parameters
       */
      _write: function(type, message) {
        var err = {};

        err.type = type;
        if (typeof message === 'string') {
          err.message = message;
        }
        else {
          _.extend(err, message);
        }

        // TODO replace with globals for environments
        switch (Logger.settings.environment) {
          case 'staging':
            this._logWriter[type](this.name+ ':' +err.message);
            break;
          case 'production':
            break;
          default:
            this._logWriter[type](this.name+ ':' +err.message);
            break;
        }
      }
    });

    var Logger = /** @lends module:aronnax/Logger */ {

      /**
       * List of currently active logs.
       * @type Array
       */
      logs: [],

      /**
       * Settings for the logger
       * @type Object
       * @default
       */
      settings: {
        environment: config.env,
        errorTypes: ['log', 'warn', 'error']
      },

      /**
       * Will get the logging instance by name, creating a new one if it doesn't
       * exist
       * @static
       * @param name Name of the log being accessed, or created
       * @returns {Log} The log instance being requested, either new
       * or one already created.
       */
      getLog: function(name) {
        var i = 0,
            ilen = this.logs.length,
            log;

        for( ; i < ilen; i++) {
          log = this.logs[i];
          // TODO accessor switch
          if (log.name === name) {
            return log;
          }
        }

        log = Base.create(Log);
        log.init(name, logWriterObject);

        return log;
      }
    };

    return Logger;
});

// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file util Holds the Util module
 */

define('aronnax/util',
  /**
   * Utility methods.
   * @exports aronnax/Util
   */
  ['underscore', 'aronnax/config', 'aronnax/logger'],
  function(_, Config, Logger) {
    "use strict";

    var _log = Logger.getLog('aronnax.util');

    /**
     * Clear out an array.
     * @private
     */
    function clearArray(array) {
      array.length = 0;
    }

    /**
     * Clear out an object of all properties
     * @private
     */
    function clearObject(object) {
      var key;

      for (key in object) {
        if (object.hasOwnProperty(key)) {
          // Ensures only writable properties are deleted.
          try {
            delete object[key];
          } catch (e) { }
        }
      }
    }

    var util = /** @lends module:aronnax/Util **/ {

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

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
define('aronnax/shims/requestAnimationFrame',
  [],function() {
    (function() {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
                                      window[vendors[x]+'CancelRequestAnimationFrame'];
      }

      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      }

      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
      }
    }());

    return window.requestAnimationFrame;
});

// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file core Holds the Core module
 */

define('aronnax/core',
  /**
   * Core game engine functionality.
   * @exports aronnax/Core
   * @extends Base
   * @requires requestAnimationFrame
   */
  ['aronnax/base',
    'aronnax/logger',
    'aronnax/util',
    'aronnax/config',
    'aronnax/shims/requestAnimationFrame'],
  function(Base, Logger, util, config, requestAnimationFrame) {
    "use strict";

    /**
     * The local log for the file.
     * @private
     */
    var _log = Logger.getLog('aronnax.Core');

    /**
     * Local private frames per second
     * @type Number
     * @private
     */
    var _fps = config.fps || 60,
    /**
     * Local private miliseconds per frame
     * @type Number
     * @private
     */
        _millisecondsPerFrame = 1000 / _fps,
    /**
     * Local private for if the game is running
     * @type Boolean
     * @private
     */
        _isRunning = false,
    /**
     * Request animation frame request id
     * @type Number
     * @private
     */
        _requestId;


    var Core = Base.create(Object.prototype, 'Core',
       /** @lends module:aronnax/Core */
       {

      /**
       * The frames per second the game should run at defaults to 60
       * @default 60
       * @type Number
       */
      fps: {
        get: function() { return _fps; },
        set: function(value) {
          _fps = value;
          _millisecondsPerFrame = 1000 / _fps;
        }
      },
      /**
       * The number of milliseconds for each frame should be based on
       * the fps
       * @protected
       * @type Number
       */
      millisecondsPerFrame: {
        get: function () { return _millisecondsPerFrame; }
      },
      /**
       * The number of milliseconds for each frame should be based on
       * the fps
       * @type Date
       */
      previousTime: {
        writable: true
      },
      /**
       * The lag since the last loop completion, used to determine whether
       * to update more until the next draw.
       * @type Boolean
       */
      lag: {
        writable: true
      },
      /**
       * The total frames run since the first call.
       * @type Number
       */
      frame: {
        value: 0,
        writable: true
      },
      /**
       * Whether the game is currently running or not, used to actually
       * stop the loop.
       * @readonly
       * @type Boolean
       */
      isRunning: {
        get: function() { return _isRunning; }
      },
      /**
       * The ID of the animation frame, returned from requestAnimationFrame.
       * @readonly
       * @type Number
       */
      requestId: {
        get: function() { return _requestId; }
      },

      /**
       * Moves the game forward by one tick. Will call update continually if
       * lag is larger or equal to milliseconds per frame. Will call draw
       * at the end of every loop and will update total frames.
       */
      tick: function() {
        var currentTime = (new Date()).getTime(),
            elapsed;

        elapsed = currentTime - this.previousTime;
        this.previousTime = currentTime;
        this.lag += elapsed;

        while (this.lag >= _millisecondsPerFrame) {
          this.update();
          this.lag -= _millisecondsPerFrame;
        }
        this.draw(this.lag / _millisecondsPerFrame);
        this.frame++;
      },

      /**
       * Runs the game if not already running, runs the loop with launchLoop.
       */
      run: function () {
        if (!_isRunning) {
          this.launchLoop();
          _isRunning = true;
        }
      },

      /**
       * Creates a loop that runs tick by request animation frames. Will 
       * check the isRunning boolean to see if it should continue running. 
       * Initializes previousTime and lag.
       */
      launchLoop: function() {
        var runner,
            self = this;

        this.previousTime = (new Date()).getTime();
        this.lag = 0;

        runner = function() {
          self.tick();
          if (_isRunning) {
            _requestId = requestAnimationFrame(runner);
          }
        };
        runner();
      },

      /**
       * Stops the game by changing the isRunning variable.
       */
      stop: function() {
        _isRunning = false;
      },

      /**
       * Update function should be overwritten
       */
      update: function() {
        _log.log('update');
        if (this.frame > 100) {
          this.stop();
        }
      },

      /**
       * Draw function should be overwritten
       */
      draw: function() { }

    });

    return Core;
 });


// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file store Holds the Store module
 */

define('aronnax/store',
  /**
   * Provides an object store that uses a hash.
   * @exports aronnax/Store
   * @requires underscore
   * @see Store
   */
  ['underscore', 'aronnax/base'],
  function(_, Base) {

    /**
     * Takes any object and creates a string representation of it.
     * @private
     * @param {Object|Array|Function} obj The object to stringify
     * @returns {String} The string representation of the object.
     */
    function objectToString(obj) {
      if (_.isArray(obj)) {
        return obj.join('*');
      }
      else if (_.isFunction(obj)) {
        return obj.toString();
      }
      else if (_.isObject(obj)) {
        return JSON.stringify(obj);
      }
      else {
        return obj.toString();
      }
    }

    /**
     * A Store that uses hashing
     * @class Store
     * @extends Base
    */
    var Store = Base.create(Object.prototype, 'Store',
      /** @lends Store.prototype **/
      {

      /**
       * The accessible data store.
       * @type Object
       */
      store: {
        get: function() { return this._dataStore; }
      },

      /**
       * The current amount of objects in the store
       * @type Number
       */
      // TODO Cache this, flush cache on changes.
      length: {
        get: function() { return _.size(this._dataStore); }
      },

      /**
       * Initializes the store
       */
      init: function() {
        this._dataStore = {};
      },

      /**
       * Will add a new item to the store, either ID'ed or not
       * @param {Object|Array|Function} item The item to add
       * @returns {Object|Array|Function} The item passed in.
       */
      put: function(item) {
        var stringObjectValue;
        if (item.classId) {
          if (this._dataStore[item.classId]) {
            throw new Error('Object key collision occurred, cannot store key');
          }
          this._dataStore[item.classId] = item;
        }
        else if (item.id) {
          if (this._dataStore[item.id]) {
            throw new Error('Object key collision occurred, cannot store key');
          }
          this._dataStore[item.id] = item;
        }
        else {
          stringObjectValue = this.stringify(item);
          if (!this._dataStore[stringObjectValue]) {
            this._dataStore[stringObjectValue] = [];
          }
          this._dataStore[stringObjectValue].push(item);
        }

        return item;
      },

      /**
       * Will get the passed in object from the store.
       * @param {Object|Array|Function} item The item to add
       * @returns {Object|Array|Function} The item passed in.
       */
      get: function(item) {
        var stringObjectValue;

        if (item.classId) {
          return this._dataStore[item.classId];
        }
        if (item.id) {
          return this._dataStore[item.id];
        }
        else {
          stringObjectValue = this.stringify(item);
          if (!this._dataStore[stringObjectValue]) {
            return;
          }
          return this._dataStore[stringObjectValue][0];
        }
      },

      /**
       * Creates a string representation of an object
       * @param {Array|Object|Funciton} item The item to stringify
       * @returns {String} The string representation
       */
      stringify: function(item) {
        return objectToString(item);
      },

      /**
       * Removes an item from the data store, if it is found.
       * @param {Object|Array|Function} item The item to remove
       * @returns {Undefined}
       */
      // TODO Parts of this just reuse the gets functionality
      remove: function(item) {
        var existingItem = this.get(item),
            stringObjectValue;

        if (existingItem) {
          if (item.classId) {
            delete this._dataStore[item.classId];
          }
          if (item.id) {
            delete this._dataStore[item.id];
          }
          else {
            stringObjectValue = this.stringify(item);
            return this._dataStore[stringObjectValue].pop();
          }
          return existingItem;
        }
      }
    });

    return Store;
});

// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file pool Holds the Pool module
 */

define('aronnax/pool',
  /** Object Pooling, the implementation behing Pooling class interface.
   * @exports aronnax/Pool
  */
  ['aronnax/base', 'aronnax/logger', 'aronnax/util', 'aronnax/config',
      'aronnax/store'],
  function(Base, Logger, util, config, Store) {
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
          toreturn = Base.construct(this.basePrototype);
          break;
      }

      return toreturn;
    }

   /**
    * Pool protoype object, an object to build pools off of.
    * @class Pool
    * @extends Base
    * @see module:aronnax/Pool
    */
    var PoolPrototype = Base.create(Object.prototype, 'Pool',
      /** @lends Pool.prototype */
      {
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
       * The amount of objects free in the pool that are ready for use.
       * @type Number
       */
      totalObjectsFree: {
        get: function() { return this.freePool.length; }
      },

      /**
       * The amount of objects that are in the active pool and are considered
       * to be in active use.
       * @type Number
       */
      totalObjectsActive: {
        get: function() { return this.activePool.length; }
      },

      init: function(initialSize, basePrototype, className) {
        this.freePool = [];
        this.activePool = Object.create(Store);
        this.activePool.init();
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
      },

      /**
       * Releases a member back to the pool, adding it to free pools and taking
       * away from active pool.
       * @param {Object} member The object to release
       */
      releaseMember: function(member) {
        var activeMember = this.activePool.get(member),
            released;

        if (!activeMember) {
          throw new Error('Member not found, cannot be released');
        }

        released = this.activePool.remove(member);
        util.cleanAnything(released);
        this.freePool.push(released);
      }

    });

   /**
    * A log which will provide logging capabilities
    */
    var Pool = /** @lends module:aronnax/Pool */ {
      /**
       * All the current pools, as a hash with the class type as the key.
       * @static
       * @type Pool
       */
      pools: {},

      /**
       * Count of the current total pools
       * @static
       * @type Number
       */
      totalPools: 0,

      /**
       * Returns the total amount of active objects in all the pools
       * @type Number
       */
      get totalActiveObjects() {
        var total = 0,
            className,
            pool;

        for (className in this.pools) {
          pool = this.pools[className];
          total += pool.totalObjectsActive;
        }

        return total;
      },

      /**
       * Returns the total amount of free objects in all the pools
       * @type Number
       */
      get totalFreeObjects() {
        var total = 0,
            className,
            pool;

        for (className in this.pools) {
          pool = this.pools[className];
          total += pool.totalObjectsFree;
        }

        return total;

      },

      /**
       * Gets the pool of the class type, creating one if it doesn't exists
       * @static
       * @param {Sting} className The name of the class
       * @return {Pool} The pool of the class type
       */
      acquirePool: function(className, objPrototype) {
        var pool = this.getPool(objPrototype, className);
        if (!pool) {
          pool = this.createPool(className, objPrototype);
        }

        return pool;
      },

      /**
       * Will get the pool from the current pools by looking up the classname
       * on the object prototype.
       * @param {Object|Array|Function} objPrototype The prototype of the pool
       * being searched for.
       * @param {String} poolClassName The name of the pool class
       * @returns {Pool} The Pool object.
       */
      getPool: function(objPrototype, poolClassName) {
        var className = poolClassName || this.getClassName(objPrototype);
        return this.pools[className];
      },

      /**
       * Gets the class name of the member, whether Based or not
       * @param {Object|Array|Function} classMember The member to get name of
       * @returns {String} The name of the member
       */
      getClassName: function(classMember) {
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
        return className;
      },

      /**
       * Aquires a free member from the pool. Maps directly to the acquire
       * pool methodand then the Pool.acquire method. Uses a non-standard
       * Function.name property to obtain the class name.
       * @static
       * @param {Object|Array|Function} classMember The object being fetch from
       * pool
       * @return {Object|Array|Function} The object being return from the pool
       */
      acquire: function(classMember) {
        var className,
            pool;

        try {
          className = this.getClassName(classMember);
        } catch (e) {
          throw new Error(e);
        }
        pool = this.acquirePool(className, classMember);

        return pool.acquireMember();
      },

      /**
       * Releases a member back to the free pool, removing from inactive pool.
       * @param {Object|Array|Function} classMember The object to release
       */
      release: function(classMember) {
        var className = this.getClassName(classMember),
            pool = this.acquirePool(className);

        if (pool) {
          pool.releaseMember(classMember);
        }
      },

      /**
       * Creates a new pool of a certain type
       * @static
       * @param {Sting} className The name of the class
       * @param {Number} initialSize The initial size to make the free pool
       * @return {Pool} The new pool of the class type
       */
      createPool: function(className, objPrototype, initialSize) {
        var pool = Object.create(PoolPrototype);
        // overwrite class name to the actual class name, not Pool
        Object.defineProperty(pool, 'className', {
          value: className
        });
        pool.init(initialSize, objPrototype, className);

        this.totalPools += 1;
        this.pools[className] = pool;
        return pool;
      }
    };

    return Pool;
});

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

// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file entity Holds the Entity module
 */

define('aronnax/entity', [
  /**
   * A factory interface to create new entities.
   * @exports aronnax/Entity
   * @extends Entity
   * @requires underscore
   * @see Entity
   */
    'underscore',
    'aronnax/base',
    'aronnax/logger',
    'aronnax/config',
    'aronnax/pooled'
  ],
  function(_, Base, Logger, config, Pooled) {

   /**
    * A base game entity object which is pooled
    * @class Entity
    * @extends Pooled
    */
    var EntityProto = Base.create(Pooled, 'Entity',
                                  /** @lends Entity.prototype */ {
      /**
       * A hash of component name to component object.
       * @type Object
       */
      components: {
        value: {},
        writable: true
      },

      /**
       * A list of component names on the entity
       * @type Array
       */
      componentLcst: {
        value: [],
        writable: true
      },

      /**
       * Initialize the entity and all components.
       * @param {Object} opts Options passed to entity and components as hash.
       */
      init: function(opts) {
        this.initComponents(opts);
      },

      /**
       * Initialize just the components
       * @param {Object} opts Options passed to entity and components as hash.
       */
      initComponents: function(opts) {
        var key,
            component;
        for (key in this.components) {
          if (this.components.hasOwnProperty(key)) {
            component = this.components[key];
            this[component.className] = Base.construct(component);
            this[component.className].init(opts);
          }
        }
      },

      /**
       * Adds a single mixin to the Entity.
       *
       * @param {String} name Name of the mixin to become the method name
       * @param {Function} mixin The actual function
       */
      addMixin: function(name, mixin) {
        this[name] = mixin;
      },

      /**
       * Add an object of mixins to the current prototype.
       *
       * @param {Object} mixins A full object of mixins to add.
       */
      addMixins: function(mixins) {
        _.extend(this, mixins);
      }
    });

    var Entity = Base.create(EntityProto, 'Entity', 
      /** @lends module:aronnax/Entity */ {
      /**
       * Creates the new entity and adds the components to it.
       * @param {Sting} entityName The name of the type of entity
       * @param {Array} components A list of components to add to the entity
       * @return {Object} The entity prototype to create to entities with
       */
      create: function(entityName, components) {
        var o = Base.create(EntityProto, entityName),
            component,
            i = 0,
            ilen;

        o.components = {};
        o.componentList = [];

        if (components) {
          for (ilen = components.length; i < ilen; i++) {
            component = components[i];
            // make unwritable?
            o[component.className] = component;
            o.components[component.className] = component;
            o.componentList.push(component.className);
          }
        }

        return o;
      },

      /**
       * Add an object of mixins to the current prototype.
       *
       * @param {Object} obj Object to add mixins to
       * @param {Object} mixins A full object of mixins to add.
       */
      addMixins: function(obj, mixins) {
        _.extend(obj, mixins);
      }

    });

    return Entity;
});

// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file aronnax Holds the aronnax module
 */

define('aronnax/aronnax',[
       'aronnax/base',
       'aronnax/config',
       'aronnax/core',
       'aronnax/entity',
       'aronnax/logger',
       'aronnax/pool',
       'aronnax/pooled',
       'aronnax/store',
       'aronnax/util'],
  /**
   * The base Aronnax core object. All aronnax modules available from here.
   * @exports aronnax/Aronnax
   */
  function(Base, Config, Core, Entity, Logger, Pool, Pooled, Store, Util) {

    var Aronnax = /** @lends module:aronnax/Aronnax */ {
      /**
       * Aronnax.Base
       * @type module:aronnax/Base
       */
      Base: Base,

      /**
       * Aronnax.Config
       * @type module:aronnax/Config
       */
      Config: Config,

      /**
       * Aronnax.Core
       * @type module:aronnax/Core
       */
      Core: Core,

      /**
       * Aronnax.Logger
       * @type module:aronnax/Logger
       */
      Logger: Logger,

      /**
       * Aronnax.Entity
       * @type module:aronnax/Entity
       */
      Entity: Entity,

      /**
       * Aronnax.Pool
       * @type module:aronnax/Pool
       */
      Pool: Pool,

      /**
       * Aronnax.Pooled
       * @type module:aronnax/Pooled
       */
      Pooled: Pooled,

      /**
       * Aronnax.Store
       * @type module:aronnax/Store
       */
      Store: Store,

      /**
       * Aronnax.Util
       * @type module:aronnax/Util
       */
      Util: Util
    };

    return Aronnax;
});

require(["aronnax"]);
