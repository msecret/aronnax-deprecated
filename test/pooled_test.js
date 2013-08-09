// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Pooled', function() {
  var Pooled;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Pooled'], function(_Pooled) {
      Pooled = _Pooled;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });
  describe('initialize', function() {

    it('should be defined', function() {
      expect(Pooled).toBeDefined();
    });

    it('should have correct methods', function() {
      expect(Pooled.make).toBeDefined();
    });
  });

  describe('make', function() {
    var TestO = {};
    beforeEach(function() {
      TestO = Object.create(Pooled);
      TestO.className = 'TestO';
      TestO.init = function(x) {
        this.x = x;
      };
    });

    it('should have the make function on inherited objects', function() {
      expect(TestO.make).toBeDefined();
    });

    // TODO use spy here
    it('should invoke the init method on make', function() {
      var s = TestO.make(3);
      expect(s.x).toBe(3);
    });
  });

});

