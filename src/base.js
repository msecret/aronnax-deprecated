/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

/**
 * @file Holds the base class
 */

goog.provide('aronnax.base');

var baseCount = {};

/**
 * A base class that assigns unique ids to objects
 * @class
 * @this aronnax.base
 * @param {String} className The name of the class being created
 */
aronnax.base = function(className) {
  /**
  * The name of the class
  * @type String
  * @instance
  * @protected
  */
  this._class = className;

  var currentClassCount = baseCount[this._class];

  if (currentClassCount === undefined) {
    currentClassCount = 0;
    baseCount[this._class] = currentClassCount;
  }
  this._objectId = currentClassCount;
  /**
  * The full unique id of the object. A string in the form of className:id.
  * @type String
  * @instance
  */
  this.uniqueID = this._class + ':' + this._objectId;
  baseCount[this._class] += 1;
};


/**
 * Returns a string represnation of the current object
 * @return {String}
 */
aronnax.base.prototype.toString = function() {
  return this._class + ':' + this._objectId;
};

/**
 * Returns the total number of objects for a givn class
 * @param {Sting} className The name of the class
 * @return {Number} The total number of initialized objects of a class
 */
aronnax.base.getTotalObjects = function(className) {
  return baseCount[className];
};

aronnax.base.resetAll = function() {
  baseCount = {};
};

