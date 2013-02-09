/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

(function() {
  'use strict';

  var bench = new Benchmark('aronnax.main', function() {
    aronnax.main();
  },
  {
    setup: function() {
      goog.require('aronnax.main');
    }
  });
})();

