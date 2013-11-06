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

      expect(testProtoEntity.create).toBeDefined();
      expect(testProtoEntity.create).toBeAFunction();
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
      var testComponentProto = Base.create(Object.prototype, 'TestComponent', {
            testMethod1: function() { }
          }),
          TestEntityProto = Entity.create('TestEntity', [testComponentProto]),
          testInst = TestEntityProto.make();

      expect(testInst.TestComponent).toBeDefined();
      expect(testInst.TestComponent).toBe(testComponentProto);
    });

    it('should create add the component name to the componentList', function() {
      var testComponentProto = Base.create(Object.prototype, 'TestComponent', {
            testMethod1: function() { }
          }),
          TestEntityProto = Entity.create('TestEntity', [testComponentProto]),
          testInst = TestEntityProto.make();

      expect(testInst.componentList).toBeDefined();
      expect(testInst.componentList[0]).toEqual('TestComponent');
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

      testProtoEntity.addMixins(testMixins);

      expect(testProtoEntity.testMixin).toBeDefined();
      expect(testProtoEntity.testMixin).toBe(testMixins.testMixin);
    });
  });

  describe('initComponents', function() {

  });
});
