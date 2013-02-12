/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

describe('aronnax.LinkedListNode', function() {
  var testNode;
  beforeEach(function() {
    testNode = new aronnax.LinkedListNode('testData');
  });

  describe('data', function() {
    it('should return the data', function() {
      var expected = 'testData';
      var actual = testNode.get('data');
      expect(actual).toEqual(expected);
    });
  });
});

describe('aronnax.UnorderedList', function() {
  var testList;
  beforeEach(function() {
    testList = new aronnax.UnorderedList();
  });

  describe('isEmpty', function() {
    beforeEach(function() {
      testList = new aronnax.UnorderedList();
    });
    it('should return true when the list is initialized', function() {
      var actual = testList.isEmpty();
      expect(actual).toBe(true);
    });
    it('should return false if the list has items', function() {
      testList.prepend('testItemA');
      var actual = testList.isEmpty();
      expect(actual).toBe(false);
    });
  });

  describe('prepend', function() {
    beforeEach(function() {
      testList = new aronnax.UnorderedList();
    });
    it('should add the item to the list', function() {
      testList.prepend('testItemA');
      var expected = 'testItemA';
      var actual = testList.find('testItemA');
      expect(actual).toBe(expected);
    });
    it('should update the length when a new node is added', function() {
      testList.prepend('testItemA');
      var expected = 1;
      var actual = testList.length();
      expect(actual).toEqual(expected);
    });
    it('should set the prev reference to null', function() {
      testList.prepend('testItemA');
      var actual = testList.findNode('testItemA').get('prev');
      expect(actual).toEqual(null);
    });
  });

  describe('length', function() {
    beforeEach(function() {
      testList = new aronnax.UnorderedList();
    });
    it('should return 0 for an empty list', function() {
      expect(testList.length()).toEqual(0);
    });
    it('should return 1 for when one item is added', function() {
      testList.prepend('testItemA');
      expect(testList.length()).toEqual(1);
    });
    it('should return 3 for when three items are added', function() {
      testList.prepend('testItemA');
      testList.prepend('testItemB');
      testList.prepend('testItemC');
      var actual = testList.length();
      expect(actual).toEqual(3);
    });
  });

  describe('search', function() {
    it('should get the item if its in the list', function() {
      testList.prepend('testItemA');
      var expected = true;
      var actual = testList.search('testItemA');
      expect(actual).toBe(expected);
    });
  });

});