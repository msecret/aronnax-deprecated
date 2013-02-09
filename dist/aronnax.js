/*! aronnax - v0.0.1 - 2013-02-08
* https://github.com/msecret/aronnax
* Copyright (c) 2013 ; Licensed MIT */

goog.provide('aronnax.main');
goog.require('goog.dom');

console.log('mainjs');
aronnax.main = function( appTitle, parent ){
  var header =  {'style':'background:#FF0000'};
  var content = "Application " + appTitle + " Starting";
  var element = goog.dom.createDom( 'div', header, content );
  goog.dom.appendChild( parent, element );
};