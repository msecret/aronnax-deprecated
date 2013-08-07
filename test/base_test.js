// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.base', function() {

  describe('initialize', function() {
    var base = {};

    beforeEach(function() {
      var flag = false;

      require(['aronnax/base'], function(base) {
        base = base;
        flag = true;
      });

      waitsFor(function() {
        return flag;
      });
    });
    describe('fuckyou', function() {
      it('sdf', function() {
        expect(base).toBeTruthy();
      });
    });
  });

});
