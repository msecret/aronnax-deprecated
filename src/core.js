// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file time Holds the game loop and any other timing functionality
 */

define('aronnax/Core',
  ['aronnax/Base',
    'aronnax/Logger',
    'aronnax/util',
    'aronnax/Config',
    'aronnax/shims/requestAnimationFrame'],
  function(Base, Logger, util, config, requestAnimationFrame) {
    "use strict";

    var _log = Logger.getLog('aronnax.Time');

    var Core = Base.create(Object.prototype, 'Core', {
      fps: {
        value: config.fps || 60
      },
      millisecondsPerFrame: {
        value: 1000 / config.fps
      },
      previousTime: {
        writable: true
      },
      lag: {
        writable: true
      },
      frame: {
        value: 0,
        writable: true
      },
      isRunning: {
        value: false,
        writable: true
      },
      requestId: {
        writable: true
      },

      tick: function() {
        var currentTime = (new Date()).getTime(),
            elapsed;

        elapsed = currentTime - this.previousTime;
        this.previousTime = currentTime;
        this.lag += elapsed;

        while (this.lag >= this.millisecondsPerFrame) {
          this.update();
          this.lag -= this.millisecondsPerFrame;
        }
        this.draw(this.lag / this.millisecondsPerFrame);
        this.frame++;
      },

      run: function () {
        if (!this.isRunning) {
          this.launchLoop();
          this.isRunning = true;
        }
      },

      launchLoop: function() {
        var runner,
            self = this;

        this.previousTime = (new Date()).getTime();
        this.lag = 0;

        runner = function() {
          self.tick();
          if (self.isRunning) {
            self.requestId = requestAnimationFrame(runner);
          }
        };
        runner();
      },

      stop: function() {
        this.isRunning = false;
      },

      update: function() {
        _log.log('update');
        if (this.frame > 100) {
          this.stop();
        }
      },

      draw: function() { _log.log('draw'); }

    });

    return Core;
 });

