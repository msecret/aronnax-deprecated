// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

/**
 * @file Holds the Entity object
 */

define('aronnax/Entity', [
    'underscore',
    'aronnax/Base',
    'aronnax/Logger',
    'aronnax/Config',
    'aronnax/Pooled'
  ],
  function(_, Base, Logger, config, Pooled) {

    var _components = [],
        _componentList = [];

   /**
    * A base game entity object which is pooled
    * @exports aronnax/Entity
    */
    var Entity = Base.create(Pooled, 'Entity', {
      /**
       * A list of components on the entity
       * @type Array
       */
      components: {
        get: function() { return _components; }
      },

      componentList: {
        get: function() { return _componentList; }
      },

      init: function(opts) {
        this.initComponents(opts);
      },

      initComponents: function(opts) {
        var key,
            component;
        for (key in this.components) {
          if (this.components.hasOwnProperty(key)) {
            component = this.components[key];
            this[component.className] = Base.construct(component);
          }
        }
      },

      /**
       * Creates the new entity and adds the components to it.
       * @param {Sting} entityName The name of the type of entity
       * @param {Array} components A list of components to add to the entity
       * @return {Object} The entity prototype to create to entities with
       */
      create: function(entityName, components) {
        var o = Base.create(this, entityName),
            component,
            i = 0,
            ilen;

        if (components) {
          for (ilen = components.length; i < ilen; i++) {
            component = components[i];
            // make unwritable?
            o[component.className] = component;
            _components.push(component);
            _componentList.push(component.className);
          }
        }

        return o;
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

    return Entity;
});
