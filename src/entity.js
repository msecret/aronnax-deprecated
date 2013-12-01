// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the Entity object
 */

define('aronnax/entity', [
  /**
   * A factory interface to create new entities.
   * @exports aronnax/Entity
   * @extends Entity
   * @requires underscore
   * @see Entity
   */
    'underscore',
    'aronnax/base',
    'aronnax/logger',
    'aronnax/config',
    'aronnax/pooled'
  ],
  function(_, Base, Logger, config, Pooled) {

   /**
    * A base game entity object which is pooled
    * @class Entity
    * @extends Pooled
    */
    var EntityProto = Base.create(Pooled, 'Entity',
                                  /** @lends Entity.prototype */ {
      /**
       * A hash of component name to component object.
       * @type Object
       */
      components: {
        value: {},
        writable: true
      },

      /**
       * A list of component names on the entity
       * @type Array
       */
      componentList: {
        value: [],
        writable: true
      },

      /**
       * Initialize the entity and all components.
       * @param {Object} opts Options passed to entity and components as hash.
       */
      init: function(opts) {
        this.initComponents(opts);
      },

      /**
       * Initialize just the components
       * @param {Object} opts Options passed to entity and components as hash.
       */
      initComponents: function(opts) {
        var key,
            component;
        for (key in this.components) {
          if (this.components.hasOwnProperty(key)) {
            component = this.components[key];
            this[component.className] = Base.construct(component);
            this[component.className].init(opts);
          }
        }
      },

      /**
       * Adds a single mixin to the Entity.
       *
       * @param {String} name Name of the mixin to become the method name
       * @param {Function} mixin The actual function
       */
      addMixin: function(name, mixin) {
        this[name] = mixin;
      },

      /**
       * Add an object of mixins to the current prototype.
       *
       * @param {Object} mixins A full object of mixins to add.
       */
      addMixins: function(mixins) {
        _.extend(this, mixins);
      }
    });

    var Entity = Base.create(EntityProto, 'Entity', 
      /** @lends module:aronnax/Entity */ {
      /**
       * Creates the new entity and adds the components to it.
       * @param {Sting} entityName The name of the type of entity
       * @param {Array} components A list of components to add to the entity
       * @return {Object} The entity prototype to create to entities with
       */
      create: function(entityName, components) {
        var o = Base.create(EntityProto, entityName),
            component,
            i = 0,
            ilen;

        o.components = {};
        o.componentList = [];

        if (components) {
          for (ilen = components.length; i < ilen; i++) {
            component = components[i];
            // make unwritable?
            o[component.className] = component;
            o.components[component.className] = component;
            o.componentList.push(component.className);
          }
        }

        return o;
      },

      /**
       * Add an object of mixins to the current prototype.
       *
       * @param {Object} obj Object to add mixins to
       * @param {Object} mixins A full object of mixins to add.
       */
      addMixins: function(obj, mixins) {
        _.extend(obj, mixins);
      }

    });

    return Entity;
});
