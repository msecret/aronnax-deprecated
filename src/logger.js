// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

define('aronnax/Logger',
  ['underscore', 'aronnax/Base', 'deps/logWriter'],
  function(_, Base, logWriter) {

    var Log = {
      init: function(name) {
        /**
         * The name of the log
         * @instance
         * @protected
         * @default window.location.hostname
         */
        this.name = name || window.location.hostname;
        Logger.logs.push(this);
      },


      /**
       * Logging message as the "log" type of message
       * @param {String|Object} message The message to log, as a string or an object
       * with different parameters
       */
      log: function(message) {
        _write('log', message);
      },

      /**
       * Logging message as the "warning" type of message
       * @param {String|Object} message The message to log, as a string or an object
       * with different parameters
       */
      warning: function(message) {
        _write('warning', message);
      },

      /**
       * Logging message as the "error" type of message
       * @param {String|Object} message The message to log, as a string or an object
       * with different parameters
       */
      error: function(message) {
        _write('error', message);
      }

    };

    /**
     * A logging instance to log errors
     * @class
     * @constuctor
     * @this aronnax.Logger
     * @mixes aronnax.accessor
     * @param name The name given to the particular log, sent to the server
     */
    var Logger = {

      logs: [],

      /**
       * Settings for the logger
       */
      settings: {
        // TODO replace with global config
        environment: 'staging',
        errorTypes: ['log', 'warn', 'error']
      },

      /**
       * Will get the logging instance by name, creating a new one if it doesn't
       * exist
       * @param name Name of the log being accessed, or created
       */
      getLog: function(name) {
        var i = 0,
            ilen = this.logs.length;

        for( ; i < ilen; i++) {
          var log = this.logs[i];
          // TODO accessor switch
          if (log.name === name) {
            return log;
          }
        }

        var log = Base.create(Log);
        log.init(name);

        return log;
      }
    };

    /**
     * Log an error or message
     * @protected
     * @param {String} type The type of log message, defaults to error,
     * warning and debug.
     * @param {String|Object} message The message to log, as a string or an object
     * with different parameters
     */
    function _write(type, message) {
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
          logWriter[type](this.name+ ':' +err.message);
          break;
        case 'production':
          break;
        default:
          logWriter[type](this.name+ ':' +err.message);
          break;
      }
    }

    return Logger;
});
