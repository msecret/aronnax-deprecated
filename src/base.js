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

        _.extend(o, props);

        return o;
      }
    }

    return Base;
});
