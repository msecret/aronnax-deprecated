// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds various Jasmine matchers to use globally in tests.
 */

beforeEach(function() {
  var matchers = {
    toBeAnArray: function(expected) {
      var notText = this.isNot ? " not" : "";

      this.message = function () {
        return "Expected " + this.actual + notText + " to be an array" ;
      };

      return _.isArray(this.actual);
    },
    toBeANumber: function(expected) {
      var notText = this.isNot ? " not" : "";

      this.message = function () {
        return "Expected " + this.actual + notText + " to be a number" ;
      };
      return typeof this.actual === 'number';
    },
    toBeAFunction: function(expected) {
      var notText = this.isNot ? " not" : "";

      this.message = function () {
        return "Expected " + this.actual + notText + " to be a function" ;
      };
      return _.isFunction(this.actual);
    },
    toBeAnObject: function(expected) {
      var notText = this.isNot ? " not" : "";

      this.message = function () {
        return "Expected " + this.actual + notText + " to be an object" ;
      };
      return _.isObject(this.actual);
    }
  };

  this.addMatchers(matchers);
});
