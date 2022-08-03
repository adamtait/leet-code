/**
 * You are climbing a staircase. It takes n steps to reach the top.
 *
 * Each time you can either climb 1 or 2 steps. In how many distinct
 * ways can you climb to the top?
 */

/**
 * @param {number} n
 * @return {number}
 */

var climbStairsRecursive = function (n) {
    if ( n === 0 ) return 0;
    if ( n === 1 ) return 1;
    if ( n === 2 ) return 2;
    
    const pp = climbStairs(n-2);
    const p = climbStairs(n-1);
    return pp + p;
};


// iterative
var climbStairs = function (n) {
    if ( n === 0 ) return 0;
    if ( n === 1 ) return 1;
    
    var p = 1;
    var pp = 2;
    for (var i = 2; i < n; i++) {
        const opp = pp;
        pp = opp + p;
        p = opp;
    }
    return pp;
};


//
// testing

const inputExpectedPairs = [
    [[0], 0],
    [[1], 1],
    [[2], 2],
    [[3], 3],
    [[4], 5],
    [[5], 8],
    [[6], 13],
];

/**
 * 3
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 */

/**
 * 4
 * 1. 1 step + 1 step + 1 step + 1 step
 * 2. 1 step + 1 step + 2 steps
 * 3. 1 step + 2 steps + 1 step
 * 4. 2 steps + 1 step + 1 step
 * 5. 2 steps + 2 steps
 */

/**
 * 5
 * 1. 1 step + 1 step + 1 step + 1 step + 1 step
 * 2. 1 step + 1 step + 1 step + 2 steps
 * 3. 1 step + 1 step + 2 steps + 1 step
 * 4. 1 step + 2 steps + 1 step + 1 step
 * 5. 2 steps + 1 step + 1 step + 1 step
 * 6. 1 step + 2 steps + 2 steps
 * 7. 2 steps + 2 steps + 1 step
 * 8. 2 steps + 1 step + 2 steps
 */


module.exports = {
    f: climbStairs,
    inputExpectedPairs,
    name: '70 - climbing stairs'
};
