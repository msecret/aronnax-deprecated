/*
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

describe('aronnax.accessor', function() {
  var accessor;
  beforeEach(function() {
    goog.require('aronnax.main');
    goog.require('aronnax.LinkedListNode');
    accessor = aronnax.accessor;
  });

  describe('get', function() {
    afterEach(function() {
      delete accessor.testAttr;
    });
    it('will return the property if there', function() {
      accessor.testAttr = 'test';
      var actual = accessor.get('testAttr');
      expect(actual).toBeDefined();
      expect(actual).toEqual('test');
    });
    it('will return undefined if the property is not there', function() {
      var actual = accessor.get('testAttr');
      expect(actual).toBeFalsy();
    });
  });
  describe('set', function() {
    beforeEach(function() {
      accessor.attrA = 'outA';
      accessor.attrB = 'outB';
    });
    it('will set the attribute with a key and value', function() {
      accessor.set('attrA', 'newA');
      var actual = accessor.get('attrA');
      var expected = 'newA';
      expect(actual).toEqual(expected);
    });
    it('will set the attribute with a key value object', function() {
      accessor.set({'attrA': 'newA'});
      var actual = accessor.get('attrA');
      var expected = 'newA';
      expect(actual).toEqual(expected);
    });
    it('will set multiple attributes with a key value object', function() {
      accessor.set({'attrA': 'newA', 'attrB': 'newB'});
      expect(accessor.get('attrA')).toEqual('newA');
      expect(accessor.get('attrB')).toEqual('newB');
    });
    it('will not set the attribute if its not there', function() {
      accessor.set('attrM', 'newM');
      var actual = accessor.get('attrM');
      expect(actual).toBeUndefined();
    });
  });
});