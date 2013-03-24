/**
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

/**
 * @file Holds the logging classes
 */

goog.provide('aronnax.Logger');
goog.require('goog.object');
goog.require('aronnax.accessor');


aronnax.logs = [];

/**
 * A logging instance to log errors
 * @class
 * @constuctor
 * @this aronnax.Logger
 * @mixes aronnax.accessor
 * @param name The name given to the particular log, sent to the server
 */
aronnax.Logger = function(name) {

  /**
   * The name of the log 
   * @instance
   * @protected
   * @default window.location.hostname
   */
  this.name = name || window.location.hostname;
  aronnax.logs.push(this);
};
goog.mixin(aronnax.Logger.prototype, aronnax.accessor);

/**
 * Settings for the logger 
 */
aronnax.Logger.settings = {
  // TODO replace with global var for env
  environment: 'staging',
  errorTypes: ['log', 'warn', 'error']
};

/**
 * Log an error or message
 * @protected
 * @param {String} type The type of log message, defaults to error, 
 * warning and debug.
 * @param {String|Object} message The message to log, as a string or an object
 * with different parameters 
 */
aronnax.Logger.prototype._write = function(type, message) {
  var err = {};

  err.type = type;
  if (typeof message === 'string') {
    err.message = message;
  }
  else {
    goog.object.extend(err, message); 
  }
  
  // TODO replace with globals for environments
  switch (aronnax.Logger.settings.environment) {
    case 'staging':
      window.console[type](this.name+ ':' +err.message);
      break;
    case 'production':
      break;
    default:
      window.console[type](this.name+ ':' +err.message);
      break;
  }
};

/**
 * Logging message as the "log" type of message
 * @param {String|Object} message The message to log, as a string or an object
 * with different parameters
 */
aronnax.Logger.prototype.log = function(message) {
  this._write('log', message);  
};

/**
 * Logging message as the "warning" type of message
 * @param {String|Object} message The message to log, as a string or an object
 * with different parameters
 */
aronnax.Logger.prototype.warning = function(message) {
  this._write('warning', message);  
};

/**
 * Logging message as the "error" type of message
 * @param {String|Object} message The message to log, as a string or an object
 * with different parameters
 */
aronnax.Logger.prototype.error = function(message) {
  this._write('error', message);  
};

/**
 * Will get the logging instance by name, creating a new one if it doesn't exist 
 * @param name Name of the log being accessed, or created 
 */
aronnax.Logger.getLog = function(name) {
  var i = 0,
      ilen = aronnax.logs.length;

  for( ; i < ilen; i++) {
    var log = aronnax.logs[i];
    if (log.get('name') === name) {
      return log;
    }
  }

  return new aronnax.Logger(name);
};
