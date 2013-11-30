// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

define(['aronnax/base', 'aronnax/core', 'aronnax/pooled', 'aronnax/entity'],
  /** @exports aronnax/Aronnax */
  function(Base, Core, Pooled, Entity) {

    /**
     * The base Aronnax core object.
     * @class Aronnax
     */
    var Aronnax = /** @lends Aronnax */ {
      /**
       * Aronnax.Base
       * @type Base
       */
      Base: Base,

      /**
       * Aronnax.Core
       * @type Core
       */
      Core: Core,

      /**
       * Aronnax.Pooled
       * @type Pooled
       */
      Pooled: Pooled,

      /**
       * Aronnax.Entity
       * @type Entity
       */
      Entity: Entity
    };

    return Aronnax;
});
