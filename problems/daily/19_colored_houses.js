/**
 * url: https://dailycodingproblem.com/solution/19
 * 
 * A builder is looking to build a row of N houses that can be of K
 * different colors. He has a goal of minimizing cost while ensuring
 * that no two neighboring houses are of the same color.
 *
 * Given an N by K matrix where the nth row and kth column represents
 * the cost to build the nth house with kth color, return the minimum
 * cost which achieves this goal.
 */

/**
 + input: NxK matrix for the cost to build the Nth house with Kth color
 + output: minimum cost to color every house
 + two consecutive houses cannot be the same color

 example
 [1,2]  = 1+1 = 2
 [2,1]

 [1,2]  = 1+2 = 2+1 = 3
 [1,2]

 [1,1]  = 1+1 = 2
 [1,2]

 [2,1]  = 1+5 = 6
 [5,2]  = 2+2 = 4

 solution 1
 + recursive
   + for each [n][k] combo, find minimum for [n+1][!k] house
     + every permutation that fits the two consecutive houses rule
 + time:  O( k*n! )
 + space: O( n )  - min value each n in call stack
 + could memoize
   + time:  O( k*k*n )
   + space: O( k*k*n )

 solution 2
 + bottom up
   + can we build a solution with the minimum possible cost?
   + what if we picked the smallest cost of each house+color
   combination then checked against color rule?
   + starting to sound a lot like Dijkstra/A* optimization/minimization problem
 + time:  ...
 + space: ...

*/

var memo = [];

var coloring = (matrix, currentN = 0, lastK = -1) => {

    if ( currentN >= matrix.length ) return 0;
    if ( lastK >= 0
         && memo[currentN]
         && memo[currentN][lastK] )
        return memo[currentN][lastK];
    
    const k = matrix[0].length;
    var minCost = Number.POSITIVE_INFINITY;
    for ( var i = 0; i < k; i++ ) {
        if ( i === lastK ) continue;
        const cost = matrix[ currentN ][i];
        const curMinCost = coloring(matrix, currentN+1, i);
        minCost = Math.min( minCost, cost + curMinCost );
    }
    if ( lastK >= 0 ) { // no need to memoize the 1st N
        if ( ! memo[currentN] ) memo[currentN] = [];
        memo[currentN][lastK] = minCost;
    }
    return minCost;
};

var wrap = (matrix) => {
    memo = [];
    return coloring(matrix);
};


/*
+ dp, no backtracking
+ memo min costs for each color from previous row
+ when color is same, unallowed, so could set to
Number.POSITIVE_INFINITY or just skip
+ time:  O(n*m)
+ space: O(m)
 */

var coloring = (matrix) => {

    var lastMinCost = 0, lastMinIndex = -1;
    for ( var i = 0; i < matrix.length; i++ ) {
        var minCost = Number.POSITIVE_INFINITY, minIndex = -1;
        for ( var j = 0; j < matrix[0].length; j++ ) {

            if ( lastMinIndex === j ) continue;
            const cost = matrix[i][j];
            if ( lastMinCost + cost < minCost  ) {
                minCost = lastMinCost + cost;
                minIndex = j;
            }
        }
        lastMinCost = minCost;
        lastMinIndex = minIndex;
    }
    return lastMinCost;
};


//
// test

const inputExpectedPairs = [
    [[[[1,2],[2,1]]], 2],
    [[[[1,2],[1,2]]], 3],
    [[[[1,1],[1,2]]], 2],
    [[[[2,1],[5,2]]], 4]
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: '20 [medium] - coloring of houses'
};

