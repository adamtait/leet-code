/**
 * url: https://www.interviewcake.com/question/javascript/merge-sorted-arrays
 *
 *  In order to win the prize for most cookies sold, my friend Alice
 *  and I are going to merge our Girl Scout Cookies orders and enter
 *  as one unit.
 *
 * Each order is represented by an "order id" (an integer).
 *
 * We have our lists of orders sorted numerically already, in arrays.
 * Write a function to merge our arrays of orders into one sorted array. 
 *
 */

/**
 Thoughts:
 + know both arrays are sorted

 solution 1:
 + iterator for each array
 + check for next smallest value
   + add to result
   + increase index for source array
   + repeat
 + if any remaining, add them to result

*/

var mergeArrays = (a, b) => {
    // pre: a, b sorted integers
    const la = a.length, lb = b.length;
    var i = 0, j = 0, r = [];

    while ( i < la && j < lb ) {
        const va = a[i], vb = b[j];
        if ( va < vb ) {
            r.push( va ); i++;
        }
        else if ( va > vb ) {
            r.push( vb ); j++;
        }
        else { // va === vb
            // => add both
            r.push( va );
            r.push( vb );
            i++; j++;
        }
    }

    // add any remaining
    if ( i < la )
        while ( i < la ) {
            r.push( a[i] );
            i++;
        }
    if ( j < lb )
        while ( j < lb ) {
            r.push( b[j] );
            j++;
        }
    return r;
};


//
// test

const inputExpectedPairs = [
    [[[1], [2]], [1,2]],
    [[[3, 4, 6, 10, 11, 15], [1, 5, 8, 12, 14, 19]],
     [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]],
    
];

module.exports = {
    f: mergeArrays,
    inputExpectedPairs,
    name: 'merge sorted arrays'
};
