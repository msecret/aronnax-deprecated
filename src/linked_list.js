/**
 * Copyright (C) 2013 Marco Segreto
 * vim: set et ts=2 sw=2 tw=80:
 */

/**
 * @file Holds the linked list and node classes
 */

goog.provide('aronnax.LinkedListNode');
goog.provide('aronnax.UnorderedList');
goog.provide('aronnax.OrderedList');
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

  if (node) {
    var prevNode = node.get('prev'),
        nextNode = node.get('next');

    if (prevNode !== null) {
      prevNode.set('next', nextNode);
    }
    else {
      this._head = nextNode;
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

/**
 * Returns tthe list as an array
 * @returns {Array} The linked list as an array in same order
 */
aronnax.UnorderedList.prototype.toArray = function() {
  var current = this._head,
      array = [];

  while(current !== null) {
    array.push(current.get('data'));
    current = current.get('next');
  }

  return array;
};

/**
 * Returns The list as an string of comma-separated values
 * @returns {String} The linked list as a sring
 */
aronnax.UnorderedList.prototype.toString = function() {
  var string = this.toArray()
    .toString();

  return string;
};

/**
 * Returns The list as a more full string with the next and prev references
 * @returns {String} The linked list as a sring
 */
aronnax.UnorderedList.prototype.toFullString = function() {
  var current = this._head,
      string = '';

  while(current !== null) {
    var prev = current.get('prev');
    var next = current.get('next');
    if (prev === null) {
      prev = 'null';
    }
    else {
      prev = prev.get('data');
    }
    if (next === null) {
      next = 'null';
    }
    else {
      next = next.get('data');
    }
    string += "{"+ current.get('data') +
      " : prev=" + prev +
      " : next=" + next +
    "}";
    current = current.get('next');
  }

  return string;
};


/**
 * An ordered linked list
 * @class
 * @constuctor
 * @this aronnax.OrderedList
 */
aronnax.OrderedList = function() {
  /** @lends OrderedList.prototype */
  /**
  * The start of the list, the first object to reference
  * @instance
  * @protected
  * @type {Object}
  */
  this._head = null;
};

/**
 * Adds a new item to the list in order
 * @param {Number|String} data A number or string to store
 * @return {aronnax.LinkedListNode} The new node just added
 */
aronnax.OrderedList.prototype.add = function(data) {
  if (typeof data !== 'number' && typeof data !== 'string') {
    // aronnax.log.error('Ordered list data needs to be a number or string');
    return false;
  }

  var node = new aronnax.LinkedListNode(data),
      current = this._head,
      prev = null,
      stop = false;

  while (current !== null && !stop) {
    if (current.get('data') > data) {
      stop = true;
    }
    else {
      prev = current;
      current = current.get('next');
    }
  }

  if (prev === null) {
    node.set('next', this._head);
    node.set('prev', null);
    this._head = node;
  }
  else {
    node.set('next', current);
    node.set('prev', prev);
    prev.set('next', node);
  }
  return node;
};

/**
 * Returns whether the list is empty or not
 * @return {Boolean} Whether the list was empty or not
 */
aronnax.OrderedList.prototype.isEmpty = function() {
  return aronnax.UnorderedList.prototype.isEmpty.call(this);
};

/**
 * Returns if the node is in the list
 * @param item The item being searched for
 * @returns {Boolean} If the node is in the list
 */
aronnax.OrderedList.prototype.search = function(item, arr_split) {
  var arr = [],
      midpoint;

  if (arr_split) {
    arr = arr_split;
  }
  else {
    arr = this.toFullArray();
  }

  if (arr.length === 0) {
    return false;
  }

  midpoint = parseInt(arr.length / 2, 10);
  if (arr[midpoint].get('data') === item) {
    return true;
  }
  else {
    if (item < arr[midpoint].get('data')) {
      return this.search(item, arr.slice(0, midpoint));
    }
    else {
      return this.search(item, arr.slice(midpoint + 1));
    }
  }
};

/**
 * Returns the node if its in the list
 * @param item The item being searched for
 * @returns {aronnax.LinkedListNode} The node
 */
aronnax.OrderedList.prototype.find = function(item, arr_split) {
  var arr = [],
      midpoint;

  if (arr_split) {
    arr = arr_split;
  }
  else {
    arr = this.toFullArray();
  }

  if (arr.length === 0) {
    return false;
  }

  midpoint = parseInt(arr.length / 2, 10);
  if (arr[midpoint].get('data') === item) {
    return arr[midpoint];
  }
  else {
    if (item < arr[midpoint].get('data')) {
      return this.find(item, arr.slice(0, midpoint));
    }
    else {
      return this.find(item, arr.slice(midpoint + 1));
    }
  }
};

/**
 * An array of the list with the whole node object
 * @return {Array} An array of nodes
 */
aronnax.OrderedList.prototype.toFullArray = function() {
  var current = this._head,
      array = [];

  while(current !== null) {
    array.push(current);
    current = current.get('next');
  }

  return array;
};

/**
 * Returns The list as a more full string with the next and prev references
 * @returns {String} The linked list as a sring
 */
aronnax.OrderedList.prototype.toFullString = function() {
  return aronnax.UnorderedList.prototype.toFullString.call(this);
};

/**
 * Removes a linked list node from the list. Can do so with an index, the data
 * contained in the node, or the node itself. This function will not take care
 * of any object deletion, its assumed whatever called the function can do that.
 * @param {Number|Object|aronnax.LinkedListNode} item The item being removed can
 * be an index into the list, that data in the node, or the node itself.
 * @return {aronnax.LinkedListNode} The new node just removed.
 */
aronnax.OrderedList.prototype.remove = function(item) {
  return aronnax.UnorderedList.prototype.remove.call(this, item);
};

/**
 * Returns the size of the list
 * @return {Number} length
 */
aronnax.OrderedList.prototype.length = function() {
  return aronnax.UnorderedList.prototype.length.call(this);
};

/**
 * Returns whether the list is empty or not
 * @return {Boolean} Whether the list was empty or not
 */
aronnax.OrderedList.prototype.isEmpty = function(idx) {
  return aronnax.UnorderedList.prototype.isEmpty.call(this, idx);
};

/**
 * Return the node's data at a certain index in the list
 * @param {Number} idx The index into the list
 * @returns {aronnax.LinkedListNode} The linked list node's data
 */
aronnax.OrderedList.prototype.index = function(idx) {
  return aronnax.UnorderedList.prototype.index.call(this, idx);
};

/**
 * Return the index of the list
 * @param item The item being found
 * @returns {Number} The index of the item in the list
 */
aronnax.OrderedList.prototype.indexOf = function(item) {
  return aronnax.UnorderedList.prototype.indexOf.call(this, item);
};

/**
 * Returns the last item in the list
 * @returns {aronnax.LinkedListNode} The last node
 */
aronnax.OrderedList.prototype.last = function() {
  return aronnax.UnorderedList.prototype.last.call(this);
};

/**
 * Returns tthe list as an array
 * @returns {Array} The linked list as an array in same order
 */
aronnax.OrderedList.prototype.toArray = function() {
  return aronnax.UnorderedList.prototype.toArray.call(this);
};

/**
 * Returns The list as an string of comma-separated values
 * @returns {String} The linked list as a sring
 */
aronnax.OrderedList.prototype.toString = function() {
  return aronnax.UnorderedList.prototype.toString.call(this);
};