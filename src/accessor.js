/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

/**
 * @file Holds the accessor mixin class
 */

goog.provide('aronnax.accessor');

/**
 * A mixin class for adding accessor methods to a classes properties.
 * @mixin
 */
aronnax.accessor = {
  /**
   * Gets the attribute in the object
   * @this aronnax.accessor
   * @param {String} attr The attribute on the object you want to get
   * @return The attribute of the object
   */
  get: function(attr) {
    for(var prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (prop === attr) {
          return this[prop];
        }
      }
    }
  },

  /**
   * Sets the attribute, either with a key and value as params or as one param
   * with key values pairs.
   * @this aronnax.accessor
   * @param {String|Object} key Either a key to set or a full object of key
   * value pairs you want to set
   * @param {String} [value] The value you want to set on the key
   */
  set: function(key, value) {
    var attrs;
    if (key === null) {
      return this;
    }

    // key being set with a key value object
    if (typeof key === 'object') {
      attrs = key;
      for (var attr in attrs) {
        if (this.hasOwnProperty(attr)) {
          this[attr] = attrs[attr];
        }
      }
    }
    else { // key being set with a key value as params
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
      return;
    }
  },

  /**
   * Returns all the attributes as an object
   * @this aronnax.accessor
   * @return {Object} All the attributes of the object
   */
  attrs: function() {
    var returnObj = {};
    for(var prop in this) {
      if (this.hasOwnProperty(prop)) {
        returnObj[prop] = this[prop];
      }
    }
    return returnObj;
  }
};