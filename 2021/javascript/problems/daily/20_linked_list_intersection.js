
/**
 * url: https://www.dailycodingproblem.com/solution/20
 *
 * Given two singly linked lists that intersect at some point, find
 * the intersecting node. The lists are non-cyclical.
 *
 * For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 ->
 * 10, return the node with value 8.
 *
 * In this example, assume nodes with the same value are the exact
 * same node objects.
 *
 * Do this in O(M + N) time (where M and N are the lengths of the
 * lists) and constant space.
 */


const { arrayToLinkedList } = require('../../lib/linked_list');


/*
 solution 1:
 + we know that last k nodes of both lists are the same
 + so,
   + step 1: reverse both lists
     + time:  O( max(m,n) )
     + space: O(1) or O( m+n ), if input is non-mutable
   + step 2
     + iterate through both (reversed) lists until a.val !== b.val
       + then, intersection is the previous a.val (or b.val)
     + time:  O( min(m,n) )
     + space: O(1)
*/


/*
 solution 2:
 + if both lists are the same length
   + then we can simply iterate through the lists looking for the same node
 + else
   + intersection node must be in the last k elements
     + where k is the length of the smallest of the two lists
   + move through the longer list until both lists have the same
   number of elems remaining
*/


const len = (h) => {
    // O(n)
    if ( ! h ) return 0;
    var c = 1;
    var n = h;
    while ( n.next ) {
        c++; n = n.next;
    }
    return c;
};

var intersection = (a,b) => {
    const alen = len(a), blen = len(b);
    var ha = a, hb = b;

    // correct pointers to same remaining length
    
    if ( alen < blen ) {
        var diff = blen - alen;
        while ( diff > 0 ) {
            hb = hb.next; diff--;
        }
    }
    
    if ( blen < alen ) {
        var diff = alen - blen;
        while ( diff > 0 ) {
            ha = ha.next; diff--;
        }
    }

    // move through both lists, looking for ha.val === hb.val
    
    while ( ha && hb && ha.val !== hb.val ) {
        ha = ha.next;
        hb = hb.next;
    }

    return ha ? ha.val : null;
};



//
// tests

const wrap = (...args) => {
    const lls = args.map(arrayToLinkedList);
    return intersection(...lls);
};

const inputExpectedPairs = [
    [[[], []], null],
    [[[1], [1]], 1],
    [[[3,7,8,10], [99,1,8,10]], 8],
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: '20 [easy] - intersection of two linked lists'
};
