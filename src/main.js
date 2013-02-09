/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

goog.provide('aronnax.main');
goog.require('goog.dom');

/**
  Initialization for aronnax engine
  @exports aronnax/main
 */
aronnax.main = function( appTitle, parent ){
  console.log('Aronnax initialized');
};

goog.exportSymbol('aronnax.main', aronnax.main);