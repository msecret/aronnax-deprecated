// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Entity', function() {
  var Base,
      Entity;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/Base', 'aronnax/Entity'],
        function(__Base, __Entity) {
      Base = __Base;
      Entity = __Entity;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });

  describe('create', function() {
    it('should return an Entity object', function() {
      var testProtoEntity = Entity.create('testProtoEntity');

      expect(testProtoEntity).toBeAnObject();
    });

    it('should have all the properties of an Entity', function() {
      var testProtoEntity = Entity.create(
        'testProtoEntity'
      );

      expect(testProtoEntity.init).toBeDefined();
      expect(testProtoEntity.init).toBeAFunction();
      expect(testProtoEntity.initComponents).toBeDefined();
      expect(testProtoEntity.initComponents).toBeAFunction();
      expect(testProtoEntity.components).toBeDefined();
      expect(testProtoEntity.components).toBeAnArray();
      expect(testProtoEntity.componentList).toBeDefined();
      expect(testProtoEntity.componentList).toBeAnArray();
    });

    it('should set the className to the entity name', function() {
      var testProtoEntity = Entity.create('testProtoEntity');

      expect(testProtoEntity.className).toEqual('testProtoEntity');
    });

    it('should set the component as the component className', function() {
      var testComponentProto = Base.create(Object.prototype, 'TestComponentA', {
            testMethodA: function() { },
            init: function() { }
          }),
          TestEntityProto = Entity.create('TestEntity', [testComponentProto]),
          testInst = TestEntityProto.make();

      expect(testInst.TestComponentA).toBeDefined();
      expect(testInst.TestComponentA).toBe(testComponentProto);
    });

    it('should create add the component name to the componentList', function() {
      var testComponentProto = Base.create(Object.prototype, 'TestComponentB', {
            init: function() { },
            testMethodB: function() { }
          }),
          TestEntityProto = Entity.create('TestEntity', [testComponentProto]),
          testInst = TestEntityProto.make();

      expect(testInst.componentList).toBeDefined();
      expect(testInst.componentList[0]).toEqual('TestComponentB');
    });
  });

  describe('addMixins', function() {
    it('should copy the properties passed in onto the Entity proto', function() {
      var testProtoEntity = Entity.create(
            'testProtoEntity'
          ),
          testMixins = {
            testMixin: 'testString'
          };

      Entity.addMixins(testProtoEntity, testMixins);

      expect(testProtoEntity.testMixin).toBeDefined();
      expect(testProtoEntity.testMixin).toBe(testMixins.testMixin);
    });
    it('should have the same property on the entity inst', function() {
      var testProtoEntity = Entity.create(
            'testProtoEntity'
          ),
          testMixins = {
            testMixin: 'testString'
          };

      testProtoEntity.addMixins(testMixins);

      expect(testProtoEntity.testMixin).toBeDefined();
      expect(testProtoEntity.testMixin).toBe(testMixins.testMixin);
    });
  });

  describe('initComponents', function() {
    it('should run the init method of the components', function() {
      var testComponentProto = Base.create(Object.prototype, 'TestComponent', {
            x: {
              value: 0,
              writable: true
            },
            init: function(opts) { this.x = opts.x; console.log('TestComponent.init'); },
            testMethodA: function() { }
          }),
          TestEntityProto = Entity.create('TestEntity', [testComponentProto]),
          testInst = TestEntityProto.make();

      testInst.init({x: 1});
      console.dir(testInst);
      expect(testInst.TestComponent.x).toEqual(1);
    });

  });
});
