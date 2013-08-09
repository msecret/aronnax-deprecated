// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

define('aronnax/Base',
  ['underscore'],
  function(_) {
    var Base = {
      create: function(obj, props) {
        var o = Object.create(obj);

        // TODO wrap init function so that it does its stuff then returns the
        // object to allow for chaining: ie Base.create(thing).init();

        _.extend(o, props);

        return o;
      }
    }

    return Base;
});
