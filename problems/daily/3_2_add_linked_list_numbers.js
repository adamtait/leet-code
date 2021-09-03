
const { arrayToLinkedList,
        linkedListToArray,
        ListNode } = require('../../lib/linked_list');

/**
 * We can represent an integer in a linked list format by having each
 * node represent a digit in the number. The nodes are connected in
 * reverse order, such that the number 54321 is represented as: 5 -> 4
 * -> 3 -> 2 -> 1
 *
 * Given two linked lists in this format, find their sum.
 */


//
// 1st attempt

var isNull = (n) => ! n || n.val === null || n.val === undefined;
var safeNext = (n) => isNull(n) ? null : n.next;
var safeVal = (n) => isNull(n) ? 0 : n.val;

var recur = (a,b) => {
    console.log( carry + ' ' + JSON.stringify(a) + ' ' + JSON.stringify(b) );
    if ( isNull(a) && isNull(b) )
        return { head: null,
                 carry: 0 };

    var { head, carry } = recur(safeNext(a), safeNext(b));
    console.log( carry + ' ' + safeVal(a) + ' ' + safeVal(b) );
    var s = carry + safeVal(a) + safeVal(b);
    var c = Math.floor( s / 10 );
    var v = s % 10;
    var h = new ListNode(v, head);
    return { head: h, carry: c };
};

var sum = (a,b) => {
    var { head, carry } = recur(a,b);
    while ( carry > 0 ) {
        head = new ListNode( carry % 10, head );
        carry = Math.floor( carry / 10 );
    }
    return head;
};


//
// 2nd attempt
//  need to reverse lists before summing. otherwise might be comparing
//  different digit places


var reverse = (h) => {
    var head = null;
    var prev = null;
    var next = h;
    while ( next ) {
        head = next;
        next = head.next;
        head.next = prev;
        prev = head;
    }
    return head;
};

var recur = ( a, b, carry = 0 ) => {

    if ( isNull(a) && isNull(b) ) {
        if ( carry === 0 ) return null;
        return new ListNode(carry);
    }
    if ( isNull(a) ) {
        if ( carry === 0 ) return b;
        return recur(b, new ListNode(carry));
    }
    if ( isNull(b) ) {
        if ( carry === 0 ) return a;
        return recur(a, new ListNode(carry), 0);
    }

    const sum = safeVal(a) + safeVal(b) + carry;
    const v = sum % 10;
    const newCarry = Math.floor( sum / 10 );
    return new ListNode(v, recur(a.next, b.next, newCarry));

};

var sum = (a,b) => {
    var c = reverse(a), d = reverse(b);
    var head = recur(c,d);
    return reverse(head);
};



//
// tests

var wrap = (a,b) => {
    const la = arrayToLinkedList(a);
    const lb = arrayToLinkedList(b);
    const s = sum(la,lb);
    return linkedListToArray(s);
};

const inputExpectedPairs = [
    [[[1],[2]], [3]],
    [[[1,0],[2,0]], [3,0]],
    [[[1,0],[9,1,2,0]], [9,1,3,0]]
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: '3.2 (book) - add two linked lists that represent numbers'
};
