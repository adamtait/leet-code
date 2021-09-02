/**
 * Given an array of integers that are out of order, determine the
 * smallest window that must be sorted in order for the entire array
 * to be sorted.
 */


var find = (arr) => {
    
    var starti = -1;
    var endi = -1;
    var max = -1;
    var maxi = -1;
    
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] < max ) {
            if ( starti < 0 ) starti = maxi;
            endi = i;
        } else {
            max = arr[i];
            maxi = i;
        }
    }
    return [starti, endi];
};


//
// tests

const inputExpectedPairs = [
    [[[]], null],
    [[[1,4,5,6,9]], [-1,-1]],
    [[[1,6,5,4,9]], [1,3]],
    [[[1,6,5,4,9,8,10]], [1,5]],
];

module.exports = {
    f: find,
    inputExpectedPairs,
    name: '1.2 (book) - find smallest unsorted section of array'
};
