/*
 * Copyright (c) 2013 Marco Segreto
 * All Rights Reserved
 *
 * Development build file for requirejs.
 *
 */

({
  appDir: '../',
  baseUrl: 'src/',
  dir: '../dist',
  generateSourceMaps: true,
  locale: 'en-us',
  logLevel: 0,
  name: 'main',
  optimize: 'uglify',
  optimizeCss: 'none',
  paths: {
    'main': 'src/main'
  },
  useStrict: true,

  uglify: {
    ascii_only: true,
    beautify: true,
    indent: 2,
    max_line_length: 1000,
    no_mangle: true,
    toplevel: true,
  }
})
