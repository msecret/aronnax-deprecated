// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the logger object
 */

define('aronnax/logger',
  ['underscore', 'aronnax/base', 'aronnax/config', 'deps/logWriter'],
  function(_, Base, config, logWriterObject) {
    "use strict";

   /**
    * A log which will provide logging capabilities
    */
    var Log = Base.create(Object.prototype, 'Log', {

      /**
       * Initializes the log.
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

    /**
     * An interface to control logs.
     * @exports aronnax/Logger
     */
    var Logger = {

      /**
       * List of currently active logs.
       */
      logs: [],

      /**
       * Settings for the logger
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
       * @returns {aronnax/Log} The log instance being requested, either new
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
