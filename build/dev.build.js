/*
 * Copyright (c) 2013 Marco Segreto
 * All Rights Reserved
 *
 * Development build file for requirejs.
 *
 */
require.config({
  baseUrl: '../src',
  dir: '../dist',

  // Options
  removeCombined: true,
  useStrict: true,

  modules: [{
    name: 'aronnax/aronnax',
    exclude: [
      'underscore'
    ]
  }],

  paths: {
    aronnax: './',
    underscore: '../lib/components/underscore/underscore',
    // Renaming for dependencies
    'aronnax/deps/logWriter': 'deps/console'
  },

  shim: {
    underscore: {
      exports: '_'
    }
  }
  
});


/*
({
  generateSourceMaps: true,
  locale: 'en-us',
  logLevel: 0,
  mainConfigFile: '../src/main.js',
  optimize: 'uglify',
  optimizeCss: 'none',
  useStrict: true,

  uglify: {
    ascii_only: true,
    beautify: true,
    indent: 2,
    max_line_length: 1000,
    no_mangle: true,
    toplevel: true
  }
});
*/

/*
 * Directory structure
 *
 * src/*.js
 * src/deps/*.js
 * lib/components/*.js
 *
 * dist/aronax.min.js
 * dist/lib/*.js
 */
