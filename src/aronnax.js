// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

define([
       'aronnax/base',
       'aronnax/config',
       'aronnax/core',
       'aronnax/entity',
       'aronnax/logger',
       'aronnax/pool',
       'aronnax/pooled',
       'aronnax/store',
       'aronnax/util'],
  /** @exports aronnax/Aronnax */
  function(Base, Config, Core, Entity, Logger, Pool, Pooled, Store, Util) {

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
       * Aronnax.Config
       * @type Config
       */
      Config: Config,

      /**
       * Aronnax.Core
       * @type Core
       */
      Core: Core,

      /**
       * Aronnax.Logger
       * @type Logger
       */
      Logger: Logger,

      /**
       * Aronnax.Entity
       * @type Entity
       */
      Entity: Entity,

      /**
       * Aronnax.Pool
       * @type Pool
       */
      Pool: Pool,

      /**
       * Aronnax.Pooled
       * @type Pooled
       */
      Pooled: Pooled,

      /**
       * Aronnax.Store
       * @type Store
       */
      Store: Store,

      /**
       * Aronnax.Util
       * @type Util
       */
      Util: Util
    };

    return Aronnax;
});
