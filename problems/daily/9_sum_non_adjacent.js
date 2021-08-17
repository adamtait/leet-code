/**
 * Given a list of integers, write a function that returns the largest
 * sum of non-adjacent numbers. Numbers can be 0 or negative.
 * 
 * Follow-up: Can you do this in O(N) time and constant space?
 */

//
// 1st attempt
// thinking recursion can work, though might need to memoize or dynamic programming

const nonAdjacentSum = (nums) => {

    if ( nums.length <= 0 ) return 0;
    
    // options:
    // 1. take this number, skip the next
    // 2. skip this number, take the next

    const next = nonAdjacentSum( nums.slice(1) );
    const nnext = nonAdjacentSum( nums.slice(2) );
    return Math.max( next, nums[0] + nnext );
};


//
// 2nd attempt
// memoize or dynamic programming

const nonAdjacentSum2 = (nums) => {

    if ( nums.length <= 0 ) return 0;

    var cache = [];
    for (var i = nums.length - 1; i >= 0; i-- ) {
        const n = nums[i];
        const nn = cache[i+1] || 0;
        const nnn = cache[i+2] || 0;
        cache[i] = Math.max( nn, n + nnn );
    }

    return cache[0];
};


//
// tests

const inputExpectedPairs = [
    [[[]], 0],
    [[[2]], 2],
    [[[1, 2]], 2],
    [[[1, 2, 3]], 4],
    [[[2, 4, 6, 2, 5]], 13],
    [[[5, 1, 1, 5]], 10],
    [[[5, 1, 5, 1]], 10],
];

module.exports = {
    f: nonAdjacentSum2,
    inputExpectedPairs,
    name: '9 [hard] - sum non-adjacent numbers'
};
