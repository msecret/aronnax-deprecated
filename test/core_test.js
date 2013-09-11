// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Core', function() {
  var Base,
      Core,
      game;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Base', 'aronnax/Core'],
      function(__Base, __Core) {
      Base = __Base;
      Core = __Core;
      game = Base.create(Core, 'game');
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });

  afterEach(function() {
    game.stop();
  });

  describe('millisecondsPerFrame', function() {
    it('should be 1000 divided by the config fps', function() {
      var config = {};
      config.fps = 60;
      expect(game.millisecondsPerFrame).toBeDefined();
      expect(game.millisecondsPerFrame).toEqual(1000 / 60);
    });

    it('should change if the fps changes', function() {
      // TODO - not implemented
    });
  });

  describe('fps', function() {
    it('should be set to the config value if value is set', function() {
      expect(game.fps).toBeDefined();
      expect(game.fps).toEqual(60); // Hardcoded fps value in config
    });
  });

  describe('isRunning', function() {
    it('should be initialized to false', function() {
      expect(game.isRunning).toBeDefined();
      expect(game.isRunning).toBe(false);
    });
  });

  describe('frame', function() {
    it('should be initialized to zero', function() {
      expect(game.frame).toBeDefined();
      expect(game.frame).toEqual(0);
    });
  });

  describe('run', function() {
    it('should set isRunning to true', function() {
      expect(game.isRunning).toBe(false);

      game.run();

      expect(game.isRunning).toBe(true);
    });

    it('should not start the loop through launchLoop if already running', function() {
      game.isRunning = true;
      sinon.spy(game, 'launchLoop');

      game.run();

      expect(game.launchLoop).not.toHaveBeenCalled();

      game.launchLoop.restore();
    });

    it('should start the loop through launchLoop if not already running', function() {
      sinon.spy(game, 'launchLoop');

      game.run();

      expect(game.launchLoop).toHaveBeenCalledOnce();

      game.launchLoop.restore();
    });
  });

  describe('stop', function() {
    it('should set isRunning to false', function() {
      game.run();
      expect(game.isRunning).toBe(true);

      game.stop();
      expect(game.isRunning).toBe(false);
    });
  });

  describe('launchLoop', function() {
    it('should set the previous time to now', function() {
      var nowTime = (new Date()).getTime();
      game.launchLoop();
      expect(game.previousTime).toBeDefined();
      expect(game.previousTime).toEqual(nowTime);
    });
    it('should set the lag to 0', function() {
      game.launchLoop();
      expect(game.lag).toEqual(0);
    });
    it('should call the tick function', function() {
      sinon.spy(game, 'tick');

      game.launchLoop();

      expect(game.tick).toHaveBeenCalled();

      game.tick.restore();
    });
  });

  describe('tick', function() {
    var flag = false;

    it('should call the update function if lag is above milliseconds per frame', 
        function() {
      sinon.spy(game, 'update');

      game.run();
      game.lag = game.millisecondsPerFrame;
      game.tick();

      expect(game.update).toHaveBeenCalled();

      game.update.restore();
    });

    it('should call the update function when previous time is below milliseconds' +
        'per frame', function() {
      var currentTime = (new Date()).getTime();

      sinon.spy(game, 'update');

      game.run();
      game.previousTime = currentTime - game.millisecondsPerFrame;
      game.tick();

      expect(game.update).toHaveBeenCalled();

      game.update.restore();
      
    });

    it('should call the draw function', function() {
      sinon.spy(game, 'draw');

      game.run();

      expect(game.draw).toHaveBeenCalled();

      game.draw.restore();
    });

    it('should pass the draw function the interpolation', function() {
      sinon.spy(game, 'draw');

      game.run();

      expect(game.draw).toHaveBeenCalledWith(game.lag / game.millisecondsPerFrame);

      game.draw.restore();
    });

    it('should increase the frame count by one', function() {
      game.tick();
      expect(game.frame).toEqual(1);
    });
  });
});
