/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

goog.provide('aronnax.accessor');

aronnax.accessor = {
  get: function(attr) {
    for(var prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (prop === attr) {
          return this[prop];
        }
      }
    }
  },

  set: function(key, value, options) {
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
  }
};