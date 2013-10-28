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

    var _fps = config.fps || 60,
        _millisecondsPerFrame = 1000 / _fps,
        _isRunning = false,
        _requestId;


    var Core = Base.create(Object.prototype, 'Core', {
      /**
       * The frames per second the game should run at defaults to 60
       * @type Number
       */
      fps: {
        get: function() { return _fps; },
        set: function(value) {
          _fps = value;
          _millisecondsPerFrame = 1000 / _fps;
        }
      },
      /**
       * The number of milliseconds for each frame should be based on
       * the fps
       * @protected
       * @type Number
       */
      millisecondsPerFrame: {
        get: function () { return _millisecondsPerFrame; }
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
        get: function() { return _isRunning; }
      },
      /**
       * The ID of the animation frame, returned from requestAnimationFrame.
       * @type Number
       */
      requestId: {
        get: function() { return _requestId; }
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

        while (this.lag >= _millisecondsPerFrame) {
          this.update();
          this.lag -= _millisecondsPerFrame;
        }
        this.draw(this.lag / _millisecondsPerFrame);
        this.frame++;
      },

      /**
       * Runs the game if not already running, runs the loop with launchLoop.
       */
      run: function () {
        if (!_isRunning) {
          this.launchLoop();
          _isRunning = true;
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
          if (_isRunning) {
            _requestId = requestAnimationFrame(runner);
          }
        };
        runner();
      },

      /**
       * Stops the game by changing the isRunning variable.
       */
      stop: function() {
        _isRunning = false;
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

