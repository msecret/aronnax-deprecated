// Copyright (c) 2013
// All Rights Reserved
// https://github.com/msecret/aronnax
// Licensed MIT

describe('aronnax.Entity', function() {
  var Base,
      Entity;

  beforeEach(function() {
    var flag = false;

    require(['aronnax/base', 'aronnax/entity'],
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
      expect(testProtoEntity.components).toBeAnObject();
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
          TestEntityProto = Entity.create('TestEntityA', [testComponentProto]),
          testInst = TestEntityProto.make();

      expect(TestEntityProto.TestComponentA).toBeDefined();
      expect(TestEntityProto.TestComponentA).toBe(testComponentProto);
      expect(testInst.TestComponentA).toBeDefined();
      expect(testInst.TestComponentA).toBe(testComponentProto);
    });

    it('should create add the component name to the componentList', function() {
      var testComponentProto = Base.create(Object.prototype, 'TestComponentB', {
            init: function() { },
            testMethodB: function() { }
          }),
          TestEntityProto = Entity.create('TestEntityB', [testComponentProto]),
          testInst = TestEntityProto.make();

      expect(TestEntityProto.componentList).toBeDefined();
      expect(TestEntityProto.componentList[0]).toEqual('TestComponentB');
      expect(testInst.componentList).toBeDefined();
      expect(testInst.componentList[0]).toEqual('TestComponentB');
    });

    it('should add the components correctly when theres more then one', function() {
      var testComponentProtoC = Base.create(Object.prototype, 'TestComponentC', {
            init: function() { },
            testMethodC: function() { }
          }),
          testComponentProtoD = Base.create(Object.prototype, 'TestComponentD', {
            init: function() { },
            testMethodD: function() { }
          }),
          TestEntityProto = Entity.create('TestEntityC', [
                                          testComponentProtoC,
                                          testComponentProtoD]),
          testInst = TestEntityProto.make();

      expect(TestEntityProto.componentList).toBeDefined();
      expect(TestEntityProto.componentList[0]).toEqual('TestComponentC');
      expect(TestEntityProto.componentList[1]).toEqual('TestComponentD');
      expect(testInst.componentList).toBeDefined();
      expect(testInst.componentList[0]).toEqual('TestComponentC');
      expect(testInst.componentList[1]).toEqual('TestComponentD');
    });

    it('should add the actual component object to proto components by class name',
          function() {
      var testComponentProtoE = Base.create(Object.prototype, 'TestComponentE', {
            init: function() { },
            testMethodE: function() { }
          }),
          TestEntityProto = Entity.create('TestEntityD', [testComponentProtoE]),
          testInst = TestEntityProto.make();

      expect(TestEntityProto.components.TestComponentE).toEqual(
          testComponentProtoE);
    });

    it('should add multiple component objects to the proto by class name',
        function() {
      var testComponentProtoG1 = Base.create(Object.prototype, 'TestComponentG1', {
            init: function() { },
            testMethodG: function() { }
          }),
          testComponentProtoG2 = Base.create(Object.prototype, 'TestComponentG2', {
            init: function() { },
            testMethodG: function() { }
          }),
          TestEntityProto = Entity.create('TestEntityE', [testComponentProtoG1,
              testComponentProtoG2]),
          testInst = TestEntityProto.make();

      expect(TestEntityProto.components.TestComponentG1).toEqual(
          testComponentProtoG1);
      expect(TestEntityProto.components.TestComponentG2).toEqual(
          testComponentProtoG2);

    });

    it('should replace the last component if a duplicate classname', function() {
      var testComponentProtoF1 = Base.create(Object.prototype, 'TestComponentF', {
            init: function() { },
            testMethodF1: function() { }
          }),
          testComponentProtoF2 = Base.create(Object.prototype, 'TestComponentF', {
            init: function() { },
            testMethodF2: function() { }
          }),
          TestEntityProto = Entity.create('TestEntityF', [testComponentProtoF1,
                                                          testComponentProtoF2]);

      expect(TestEntityProto.components.TestComponentF).toEqual(
          testComponentProtoF2);
    });
  });

  describe('addMixin', function() {
    it('should copty the name value pair to the object', function() {
      var testProtoEntity = Entity.create(
            'testProtoEntity'
          ),
          testMixinAName = 'textMixinA',
          testMixinAFunction = function() {
            return 'a';
          };

      testProtoEntity.addMixin(testMixinAName, testMixinAFunction);

      expect(testProtoEntity.textMixinA).toBeDefined();
      expect(testProtoEntity.textMixinA).toEqual(testMixinAFunction);
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

  describe('init', function() {
    it('should call initialize on the entity', function() {
      var testComponentProto = Base.create(Object.prototype, 'TestComponent', {
            x: {
              value: 0,
              writable: true
            },
            init: function(opts) { this.x = opts.x; },
            testMethodA: function() { }
          });
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
      expect(testInst.TestComponent.x).toEqual(1);
    });

  });
});
