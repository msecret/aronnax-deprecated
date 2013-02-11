/**
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

/**
 * @file Holds the linked list and node classes
 */

goog.provide('aronnax.UnorderedList');
goog.provide('aronnax.LinkedListNode');
goog.require('aronnax.accessor');


/**
 * A single node for a linked list
 * @class LinkedListNode
 * @namespace aronnax.LinkedListNode
 * @constuctor
 * @mixes {aronnax.accessor}
 * @param data whatever should be held in the node
 * @this {LinkedListNode}
 */
aronnax.LinkedListNode = function(data) {
  /**
   * The data in the node
   * @private
   */
  this.data = data;
  /**
   * The next node in the linked list
   * @private
   */
  this.next = null;
  /**
   * The previous node in the linked list
   * @type {@link LinkedListNode}
   * @private
   */
  this.prev = null;
};
goog.mixin(aronnax.LinkedListNode.prototype, aronnax.accessor);


/**
 * An unordered linked list
 * @class UnorderedList
 * @namespace aronnax.UnorderedList
 * @constuctor
 */
aronnax.UnorderedList = function() {
  /**
 * The start of the list, the first object to reference
 * @type {Object}
 */
  this._head = null;
};

/**
 * Adds a new LinkedListNode to the end of the list
 * @param data
 */
aronnax.UnorderedList.prototype.prepend = function(data) {
  var newNode = new aronnax.LinkedListNode(data);
  newNode.set('next', this._head);
  this._head = newNode;
};

/**
 * Returns the size of the list
 * @return {int} length
 */
aronnax.UnorderedList.prototype.length = function() {
  var current = this._head,
      count = 0;

  while (current !== null) {
    count += 1;
    current = current.get('next');
  }

  return count;
};

/**
 * Returns whether the list is empty or not
 * @return {boolean} Whether the list was empty or not
 */
aronnax.UnorderedList.prototype.isEmpty = function() {
  return this._head === null;
};

/**
 * Returns if the node is in the list
 * @return {bool} If the node is in the list
 */
aronnax.UnorderedList.prototype.search = function(item) {
  var current = this._head,
      found = false;

  while (current !== null && !found) {
    if (current.get('data') === item) {
      found = true;
    }
    else {
      current = current.get('next');
    }
  }

  return found;
};

/**
 * Returns the node being searched for
 * @return {@link LinkedListNode} The item's data
 */
aronnax.UnorderedList.prototype.find = function(item) {
  var current = this._head,
      found = false;

  while (current !== null && !found) {
    if (current.get('data') === item) {
      return current.get('data');
    }
    else {
      current = current.get('next');
    }
  }

  return found;
};
