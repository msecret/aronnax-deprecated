// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the Entity object
 */

define('aronnax/entity', [
    'underscore',
    'aronnax/base',
    'aronnax/logger',
    'aronnax/config',
    'aronnax/pooled'
  ],
  function(_, Base, Logger, config, Pooled) {

   /**
    * A base game entity object which is pooled
    * @exports aronnax/Entity
    */
    var EntityProto = Base.create(Pooled, 'Entity', {
      /**
       * A list of components on the entity
       * @type Array
       */
      components: {
        value: {},
        writable: true
      },

      componentList: {
        value: [],
        writable: true
      },

      init: function(opts) {
        console.log('EntityProto.init');
        this.initComponents(opts);
      },

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
       * Add an object of mixins to the current prototype.
       *
       * @param {Object} mixins A full object of mixins to add.
       */
      addMixins: function(mixins) {
        _.extend(this, mixins);
      }
    });

    var Entity = Base.create(EntityProto, 'Entity', {
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
