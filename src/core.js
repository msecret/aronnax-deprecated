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

    var _log = Logger.getLog('aronnax.Core');

    var Core = Base.create(Object.prototype, 'Core', {
      /**
       * The frames per second the game should run at defaults to 60
       * @type Number
       */
      fps: {
        value: config.fps || 60
      },
      /**
       * The number of milliseconds for each frame should be based on
       * the fps
       * @type Number
       */
      millisecondsPerFrame: {
        value: 1000 / config.fps
      },
      /**
       * The number of milliseconds for each frame should be based on
       * the fps
       * @type Date
       */
      previousTime: {
        writable: true
      },
      /**
       * The lag since the last loop completion, used to determine whether
       * to update more until the next draw.
       * @type Boolean
       */
      lag: {
        writable: true
      },
      /**
       * The total frames run since the first call.
       * @type Number
       */
      frame: {
        value: 0,
        writable: true
      },
      /**
       * Whether the game is currently running or not, used to actually
       * stop the loop.
       * @type Boolean
       */
      isRunning: {
        value: false,
        writable: true
      },
      /**
       * The ID of the animation frame, returned from requestAnimationFrame.
       * @type Number
       */
      requestId: {
        writable: true
      },

      /**
       * Moves the game forward by one tick. Will call update continually if
       * lag is larger or equal to milliseconds per frame. Will call draw
       * at the end of every loop and will update total frames.
       */
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

      /**
       * Runs the game if not already running, runs the loop with launchLoop.
       */
      run: function () {
        if (!this.isRunning) {
          this.launchLoop();
          this.isRunning = true;
        }
      },

      /**
       * Creates a loop that runs tick by request animation frames. Will 
       * check the isRunning boolean to see if it should continue running. 
       * Initializes previousTime and lag.
       */
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

      /**
       * Stops the game by changing the isRunning variable.
       */
      stop: function() {
        this.isRunning = false;
      },

      /**
       * Update function should be overwritten
       */
      update: function() {
        _log.log('update');
        if (this.frame > 100) {
          this.stop();
        }
      },

      /**
       * Draw function should be overwritten
       */
      draw: function() { _log.log('draw'); }

    });

    return Core;
 });

