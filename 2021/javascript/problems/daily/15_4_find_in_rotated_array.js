/**
 * A sorted array of integers has been rotated an unknown number of
 * times.
 *
 * Given this array, find the index of an element in the array in
 * better than linear time. If the element does not exist in the
 * array, return null.
 *
 * Assume that all integers in the array are unique.
 */

// [ 1,2,3 ]
// [ 3,1,2 ]
// [ 2,3,1 ]

var prev = (i, arr) => {
    if ( i === 0 ) return arr.length - 1;
    return i - 1;
};

var succ = (i, arr) => {
    if ( i === arr.length -1 ) return 0;
    return i + 1;
};

var find = (k, arr) => {
    // WIP
    if ( ! arr || arr.length === 0 ) return null;

    var i = Math.floor( l / 2 );

    if ( k === arr[i] ) return i;
    
    if ( k < arr[i] )
        return find(k, arr.slice(j).concat( arr.slice(0,i) ));
    if ( k > arr[i] )
        return find(k, arr.slice(i,j));
    
};



//
// 2nd attempt

var findMin = (arr) => {
    // binary search => O( log(N) )
    if ( arr.length < 2 ) return 0;
    if ( arr.length === 2 )
        return arr[0] < arr[1] ? 0 : 1;
    
    var i = Math.floor( arr.length / 2 );
    if ( arr[0] < arr[i] )
        return i + findMin( arr.slice(i) );
    // else arr[0] > arr[i]
    return findMin( arr.slice(0, i + 1) );
};

var rotate = (i, arr) => {
    // known index => constant time (assuming array implementation)
    return arr.slice(i).concat( arr.slice(0,i) );
};

var binarySearch = (e, arr) => {
    // binary search => O( log(N) )
    if ( arr.length < 2 )
        return arr[0] && arr[0] === e ? arr[0] : null;
    if ( arr.length === 2 )
        return arr[0] === e ? 0 : 1;
    
    var i = Math.floor( arr.length / 2 );
    if ( e === arr[i] ) return i;
    if ( e < arr[i] )
        return binarySearch(e, arr.slice(0, i) );
    // else e > arr[i]
    return i + 1 + binarySearch(e, arr.slice(i + 1) );
};

var find = (e, arr) => {

    if ( ! arr || arr.length === 0 ) return null;

    var minIndex = findMin(arr);
    var a = rotate(minIndex, arr);
    var aIndex = binarySearch(e, a);
    return ( minIndex + aIndex ) % arr.length;
};


//
// tests

const inputExpectedPairs = [
    [[2, []], null],
    [[2, [1,2]], 1],
    [[2, [2,1]], 0],
    [[2, [3,1,2]], 2],
    [[8, [13,18,25, 2,8,10]], 4],
];

module.exports = {
    f: find,
    inputExpectedPairs,
    name: '15.4 (book) - find element in rotated sorted array'
};
