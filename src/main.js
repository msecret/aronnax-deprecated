/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

/**
 * @file Holds the main class
 */

/**
 * Main aronnax namespace
 * @namespace aronnax
 */

goog.provide('aronnax.main');
goog.require('goog.dom');
goog.require('aronnax.accessor');
goog.require('aronnax.LinkedListNode');
goog.require('aronnax.UnorderedList');
goog.require('aronnax.OrderedList');
goog.require('aronnax.base');


/**
  Initialization for aronnax engine
  @exports aronnax/main
 */
aronnax.main = function( appTitle, parent ){
  console.log('Aronnax initialized');
};

goog.exportSymbol('aronnax.main', aronnax.main);