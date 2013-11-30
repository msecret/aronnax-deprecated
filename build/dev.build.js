/*
 * Copyright (c) 2013 Marco Segreto
 * All Rights Reserved
 *
 * Development build file for requirejs.
 *
 */
require.config({
  baseUrl: '../',
  insertRequire: ['aronnax'],
  name: 'aronnax/aronnax',
  exclude: [
    'underscore'
  ],
  out: '../dist/aronnax.js',

  // Options
  useStrict: true,
  wrap: true,

  paths: {
    aronnax: 'src',
    underscore: 'lib/components/underscore/underscore',
    // Renaming for dependencies
    'deps/logWriter': 'src/deps/console'
  },

  shim: {
    underscore: {
      exports: '_'
    }
  }
});

