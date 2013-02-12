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
 * @class
 * @constuctor
 * @this aronnax.LinkedListNode
 * @mixes aronnax.accessor
 * @param data Whatever should be held in the node
 */
aronnax.LinkedListNode = function(data) {
  /**
   * The data in the node
   * @instance
   * @protected
   * @default null
   */
  this.data = data || null;
  /**
   * The next node in the linked list
   * @instance
   * @protected
   * @type aronnax.LinkedListNode
   */
  this.next = null;
  /**
   * The previous node in the linked list
   * @instance
   * @protected
   * @type aronnax.LinkedListNode
   */
  this.prev = null;
};
goog.mixin(aronnax.LinkedListNode.prototype, aronnax.accessor);


/**
 * An unordered linked list
 * @class
 * @constuctor
 * @this aronnax.UnorderedList
 */
aronnax.UnorderedList = function() {
  /** @lends UnorderedList.prototype */
  /**
  * The start of the list, the first object to reference
  * @instance
  * @protected
  * @type {Object}
  */
  this._head = null;
};

/**
 * Adds a new LinkedListNode to the beginning of the list
 * @param data Any data of any type that will be stored in the node
 * @return {aronnax.LinkedListNode} The new node just prepended
 */
aronnax.UnorderedList.prototype.prepend = function(data) {
  var newNode = new aronnax.LinkedListNode(data);
  newNode.set({'next': this._head, 'prev': null});
  this._head = newNode;
  return newNode;
};

/**
 * Adds a new LinkedListNode to the end of the list
 * @param data Any data of any type that will be stored in the node
 * @return {aronnax.LinkedListNode} The new node just appended
 */
aronnax.UnorderedList.prototype.append = function(data) {
  var newNode = new aronnax.LinkedListNode(data),
      lastNode = this.last();
  newNode.set({'next': null, 'prev': lastNode });
  if (lastNode === null) {
    this._head = newNode;
  }
  else {
    lastNode.set({'next': newNode});
  }
  return newNode;
};

/**
 * Removes a linked list node from the list. Can do so with an index, the data
 * contained in the node, or the node itself. This function will not take care
 * of any object deletion, its assumed whatever called the function can do that.
 * @param {Number|Object|aronnax.LinkedListNode} item The item being removed can
 * be an index into the list, that data in the node, or the node itself.
 * @return {aronnax.LinkedListNode} The new node just removed.
 */
aronnax.UnorderedList.prototype.remove = function(item) {
  var node = null;

  if (typeof item === 'number') {
    // remove the node with an index
    node = this.index(item);
  }
  else if (item instanceof aronnax.LinkedListNode) {
    // remove the actual node
    node = item;
  }
  else {
    // remove the node by finding the data
    node = this.find(item);
  }

  if (node !== null) {
    var prevNode = node.get('prev'),
        nextNode = node.get('next');

    if (prevNode !== null) {
      prevNode.set('next', nextNode);
    }
    if (nextNode !== null) {
      nextNode.set('prev', prevNode);
    }

    node.set({'prev': null, 'next': null});
  }
  return node;

};

/**
 * Returns the size of the list
 * @return {Number} length
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
 * @return {Boolean} Whether the list was empty or not
 */
aronnax.UnorderedList.prototype.isEmpty = function() {
  return this._head === null;
};

/**
 * Returns if the node is in the list
 * @param item The item being searched for
 * @returns {Boolean} If the node is in the list
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
 * Returns the node's data being searched for
 * @param item The node being searched for
 * @returns {aronnax.LinkedListNode} The item's linked list node
 */
aronnax.UnorderedList.prototype.find = function(item) {
  var current = this._head,
      found = null;

  while (current !== null && !found) {
    if (current.get('data') === item) {
      return current;
    }
    else {
      current = current.get('next');
    }
  }

  return found;
};

/**
 * Return the node's data at a certain index in the list
 * @param {Number} idx The index into the list
 * @returns {aronnax.LinkedListNode} The linked list node's data
 */
aronnax.UnorderedList.prototype.index = function(idx) {
    var current = this._head,
        i = 0,
        ilen = idx;

    for ( ;i < ilen;i++) {
      current = current.get('next');
    }
    return current;
};

/**
 * Return the index of the list
 * @param item The item being found
 * @returns {Number} The index of the item in the list
 */
aronnax.UnorderedList.prototype.indexOf = function(item) {
  var current = this._head,
      i = 0;

  for ( ;current !== null; i++) {
    if (current.get('data') === item) {
      return i;
    }
    current = current.get('next');
  }

  return 0;
};

/**
 * Returns the last item in the list
 * @returns {aronnax.LinkedListNode} The last node
 */
aronnax.UnorderedList.prototype.last = function() {
  var length = this.length();
  if (length === 0) {
    return this._head;
  }
  var lastNode = this.index(length - 1);
  return lastNode;
};
