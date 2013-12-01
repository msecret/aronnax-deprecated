// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file aronnax Holds the aronnax module
 */

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
  /**
   * The base Aronnax core object. All aronnax modules available from here.
   * @exports aronnax/Aronnax
   */
  function(Base, Config, Core, Entity, Logger, Pool, Pooled, Store, Util) {

    var Aronnax = /** @lends module:aronnax/Aronnax */ {
      /**
       * Aronnax.Base
       * @type module:aronnax/Base
       */
      Base: Base,

      /**
       * Aronnax.Config
       * @type module:aronnax/Config
       */
      Config: Config,

      /**
       * Aronnax.Core
       * @type module:aronnax/Core
       */
      Core: Core,

      /**
       * Aronnax.Logger
       * @type module:aronnax/Logger
       */
      Logger: Logger,

      /**
       * Aronnax.Entity
       * @type module:aronnax/Entity
       */
      Entity: Entity,

      /**
       * Aronnax.Pool
       * @type module:aronnax/Pool
       */
      Pool: Pool,

      /**
       * Aronnax.Pooled
       * @type module:aronnax/Pooled
       */
      Pooled: Pooled,

      /**
       * Aronnax.Store
       * @type module:aronnax/Store
       */
      Store: Store,

      /**
       * Aronnax.Util
       * @type module:aronnax/Util
       */
      Util: Util
    };

    return Aronnax;
});
