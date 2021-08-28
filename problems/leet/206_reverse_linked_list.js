
const { arrayToLinkedList, linkedListToArray } = require('../../lib/linked_list');

/**
 * url: https://leetcode.com/problems/reverse-linked-list/
 *
 * Given the head of a singly linked list, reverse the list, and
 * return the reversed list.
 */


/**
 * @param {ListNode} head
 * @return {ListNode}
 */

//
// attempt #1 - recursive

var recur = (head) => {
    if ( ! head ) return null;
    if ( ! head.next ) {
        return [head, head]; // reached the tail
    }
    var [newHead, tail] = recur( head.next );
    tail.next = head;
    return [newHead, head];
};

var reverseList = function (head) {
    const r = recur(head);
    if ( ! r ) return null;
    const [h, t] = r;
    t.next = null;
    return h;
};


//
// attempt #2 - iterative

var reverseList = function (head) {
    var curr = head;
    var prev = null;
    
    while ( curr ) {
        var tmp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = tmp;
    }
    
    return prev;
};



//
// wrapper

var wrap = (a) => {
    var ll = arrayToLinkedList(a);
    var r = reverseList(ll);
    return linkedListToArray(r);
};


//
// tests

const inputExpectedPairs = [
    [[[]], []],
    [[[1]], [1]],
    [[[1,2]], [2,1]],
    [[[1,2,1]], [1,2,1]],
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: '206 - reverse linked list'
};
