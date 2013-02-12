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
      testList.prepend('testItemA');
    });
    it('should add the item to the list', function() {
      var expected = 'testItemA';
      var actual = testList.find('testItemA').get('data');
      expect(actual).toBe(expected);
    });
    it('should update the length when a new node is added', function() {
      var expected = 1;
      var actual = testList.length();
      expect(actual).toEqual(expected);
    });
    it('should set the prev reference to null', function() {
      var actual = testList.find('testItemA').get('prev');
      expect(actual).toEqual(null);
    });
    it('should set the next reference to the next node', function() {
      testList.prepend('testItemB');
      var expected = 'testItemA';
      var actual = testList.find('testItemB').get('next').get('data');
      expect(actual).toEqual(expected);
    });
  });

  describe('append', function() {
    beforeEach(function() {
      testList = new aronnax.UnorderedList();
      testList.append('testItemA');
    });
    it('should add the item to the list', function() {
      var expected = 'testItemA';
      var actual = testList.find('testItemA').get('data');
      expect(actual).toBe(expected);
    });
    it('should set the prev reference to the last item', function() {
      var prevLast = testList.last();
      testList.append('testItemA');
      var newLast = testList.last();
      expect(newLast.get('prev')).toBe(prevLast);
    });
    it('should set the next reference to null', function() {
      expect(testList.find('testItemA').get('next')).toBe(null);
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

  describe('find', function() {
    beforeEach(function() {
      testList = new aronnax.UnorderedList();
      testList.prepend('testItemA');
    });
    it('should return undefined for an object not found', function() {
      var actual = testList.find('testItemB');
      expect(actual).toBe(null);
    });
    it('should return the data for an object in the list', function() {
      var actual = testList.find('testItemA').get('data');
      expect(actual).toEqual('testItemA');
    });
  });

  describe('index', function() {
    it('should return the correct object given the index', function() {
      testList.prepend('testItemA');
      testList.prepend('testItemB');
      testList.prepend('testItemC');
      expect(testList.index(0).get('data')).toBe('testItemC');
      expect(testList.index(1).get('data')).toBe('testItemB');
      expect(testList.index(2).get('data')).toBe('testItemA');
    });
  });

  describe('indexOf', function() {
    it('should return the index of the data given', function() {
      testList.prepend('testItemA');
      testList.prepend('testItemB');
      testList.prepend('testItemC');
      expect(testList.indexOf('testItemA')).toEqual(2);
      expect(testList.indexOf('testItemB')).toBe(1);
      expect(testList.indexOf('testItemC')).toBe(0);
    });
  });

  describe('last', function() {
    beforeEach(function() {
      testList = new aronnax.UnorderedList();
    });
    it('should return the last node in the list', function() {
      testList.prepend('testItemA');
      testList.prepend('testItemB');
      expect(testList.last().get('data')).toEqual('testItemA');
    });
  });

});