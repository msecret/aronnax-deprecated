/**
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

/**
 * @file Holds the linked list and node classes
 */

goog.provide('aronnax.LinkedList');
goog.provide('aronnax.LinkedListNode');


/**
 * A single node for a linked list
 * @class LinkedListNode
 * @namespace aronnax.LinkedListNode
 * @constuctor
 * @param data whatever should be held in the node
 */
aronnax.LinkedListNode = function(data) {
  /**
   * The data in the node
   * @private
   */
  this._data = data;
  /**
   * The next node in the linked list
   * @private
   */
  this._nextNode = null;
  /**
   * The previous node in the linked list
   * @type {@link LinkedListNode}
   * @private
   */
  this._prevNode = null;
};

/**
 * Returns the data stored in the linked list node
 * @return {object} the data
 */
aronnax.LinkedListNode.prototype.getData = function() {
  return this._data;
};

/**
 * Returns the next linked list node
 * @return {@link aronnax.LinkedListNode}
 */
aronnax.LinkedListNode.prototype.next = function() {
  return this._nextNode;
};

/**
 * Returns the previous linked list node
 * @return {@link aronnax.LinkedListNode}
*/
aronnax.LinkedListNode.prototype.prev = function() {
  return this._prevNode;
};