/**
 * Given the an array of integers, return a new array such that each
 * element at index i of the new array is a product of all the numbers
 * in the original array except the one at i.
 *
 */

// [1,2,3]
// [ 2*3, 1*3, 1*2 ]

var productOfAllOtherElements = (arr) => {

    if ( arr.length < 2 ) return [];
    
    const firstElem = arr.slice(2).reduce((a,n) => a * n, arr[1]);
    var r = [firstElem];
    for ( var i = 1; i < arr.length; i++ ) {
        r[i] = (r[i-1] / arr[i]) * arr[i-1];
    }
    return r;
};


//
// tests

const inputExpectedPairs = [
    [[ [] ], []],
    [[ [1] ], []],
    [[ [1,2] ], [2,1]],
    [[ [1,2,3] ], [6,3,2]],
    [[ [1,2,3,4,5] ], [120,60,40,30,24]]
];

module.exports = {
    f: productOfAllOtherElements,
    inputExpectedPairs,
    name: '1.1 (book) - product of all other elements'
};
