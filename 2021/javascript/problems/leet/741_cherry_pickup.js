/**
 * url: https://leetcode.com/problems/cherry-pickup/
 *
 * You are given an n x n grid representing a field of cherries, each
 * cell is one of three possible integers.
 *
 *   0 means the cell is empty, so you can pass through,
 *   1 means the cell contains a cherry that you can pick up and pass through, or
 *   -1 means the cell contains a thorn that blocks your way.
 *
 * Return the maximum number of cherries you can collect by following
 * the rules below:
 *
 *   Starting at the position (0, 0) and reaching (n - 1, n - 1) by
 *   moving right or down through valid path cells (cells with value 0
 *   or 1).
 *
 *   After reaching (n - 1, n - 1), returning to (0, 0) by moving left
 *   or up through valid path cells.
 *
 *   When passing through a path cell containing a cherry, you pick it
 *   up, and the cell becomes an empty cell 0.
 *
 *   If there is no valid path between (0, 0) and (n - 1, n - 1), then
 *   no cherries can be collected.
 */

/*
  solution 1
  + brute force
  + enumerate every possible combination of paths to goal & back
    + pick the maximum pair
  + time:  O( 2 * n^3 )
  + space: O( 2 * n )

 solution 2
 + Dijkstra
 + min distance calculation needs to account for cherries...
 + time:  O( 2 * v^2 )
 + space: O( v )

 solution 3
 + A* search
 + heuristic is average distance to cherries
   + requires that we know where all the cherries are (input)
   + may be expensive to compute
   + may result in suboptimal path
     + could it go in between 2 cherries?
 + time:  O( 2 * ( v^2 * c ) ) - c is the # of cherries
 + space: O( v )
*/

var goalPair = (g, rightDown = true) => {
    if ( rightDown )
        return [ g.length-1, g[0].length-1 ];
    return [0,0];
};

//var initializeSeen = (g, rightDown  = true) {
//    if ( rightDown )
//        return [[true]]; // seen[0][0] === true
//
//    const maxi = g.length-1, maxj = g[0].length-1;
//    var m = [];
//    for ( var i = 0; i <= maxi; i++ ) {
//        m[i] = [];
//        for ( var j = 0; j <= maxj; j++ )
//            m[i][j] = null;
//    }
//    m[maxi][maxj] = true;
//    return m;
//};


var neighbors = (g, i, j, rightDown = true) => {
    
    var ns = null;
    if ( rightDown )
        ns = [ [i, j+1], [i+1,j] ];  // right, down
    else ns = [ [i-1, j], [i, j-1] ]; // top, left

    if ( i === 0 ) ns.filter(([a,b] => a > i));
    if ( j === 0 ) ns.filter(([a,b] => b > j));

    const maxi = g.length -1;
    const maxj = g[0].length -1;
    if ( i === maxi ) ns.filter(([a,b] => a < i));
    if ( j === maxj ) ns.filter(([a,b] => b < j));
    
    return ns;
};

var pathValue = (g, [i,j]) => {
    return g[i][j];
};

var nextNeighbor = (g, i, j, rightDown = true) => {
    var ns = neighbors(g, i, j, rightDown)
        .map(p => [p, pathValue(g,p)])
        .filter(([p,v]) => v > -1)  // filter out walls
        .sort(([a,av],[b,bv]) => bv - av);  // sort descending
    return ns[0][0];
};

var maxPath = (g, rightDown = true) => {

    var [goali, goalj] = goalPair(g, rightDown);
    
    var i = rightDown ? 0 : g.length-1;
    var j = rightDown ? 0 : g[0].length-1;
    var mp = [[i,j]];  // max path
        
    while ( i !== goali && j !== goalj ) {
        var [ni, nj] = nextNeighbor(g, i, j, rightDown);
        mp.push( [ni, nj] );
        i = ni;
        j = nj;
    }
    return mp;
};

var removeCherries = (g, pairs) => {
    // update g by setting all nodes in pf to 0

};

var cherry = (g) => {

    const pf = maxPath(g); // path forward
    const pfv = pf.reduce((a,pair) => a + pathValue(g,pair), 0);
    
    const h = removeCherries(g, pf);
    const pb = maxPath(h, false); // path forward
    const pbv = pb.reduce((a,pair) => a + pathValue(h, pair), 0);

    return pfv + pbv;
};


/*
 attempt 2
 + any A*-like search with a heuristic is likely to be sub optimal
   + unless it can predict some route around all the walls...
 + back to brute-force-like solution
 + dynamic programming?
   + build 2x max paths
     + cumulative
     + do we even need to start from either end? can just take two
     paths from 0,0?
       + paths are mutually exclusive. cherries cannot be selected twice.
       + so, we need some count of unique cherries
       + some cherries cannot be accessed, in case they're enclosed by walls
       + could run the algorithm twice, after removing the claimed
        cherries from the 1st path
   + not sure that dynamic programming in a matrix is the right approach
     + need to be able to recover the locations of the cherries claimed
     + I think we can do DP and also recover the cherries
 + time:  O( 2 * n*n )
 + space: O( 3 * n*n )
*/

var initSquareMatrix = (n, v = null) => {
    var m = [];
    for ( var i = 0; i < n; i++ ) {
        m[i] = [];
        for ( var j = 0; j < n; j++ )
            m[i][j] = v;
    }
    return m;
};

var pathMaxCherries = (g, taken) => {

    const n = g.length;
    taken = taken ? taken : initSquareMatrix(n);
    var dpm = initSquareMatrix(n, []);
    
    for ( var i = 0; i < n; i++ ) {
        for ( var j = 0; j < n; j++ ) {

            const up = i === 0 ? [] : dpm[i-1][j];
            const upLen = up.filter(p => p !== null).length;
            const upHasWall = up.some(p => p === null);
            const left = j === 0 ? [] : dpm[i][j-1];
            const leftLen = left.filter(p => p !== null).length;
            const leftHasWall = left.some(p => p === null);

            var cur = [null];
            if ( g[i][j] !== -1 ) cur = [];
            if ( g[i][j] === 1 && ! taken[i][j] )
                cur = [[i,j]];

            if ( upHasWall && leftHasWall )
                dpm[i][j] = [null];  // unreachable node
            else if ( upHasWall )
                dpm[i][j] = [ ...left, ...cur ];
            else if ( leftHasWall )
                dpm[i][j] = [ ...up, ...cur ];
            else
                dpm[i][j] = upLen > leftLen ? [ ...up, ...cur ] : [ ...left, ...cur ];
        }
    }
    return dpm[n-1][n-1].filter(p => p !== null);
};

var pairsToMatrix = (pairs, n) => {
    var m = initSquareMatrix(n);
    for ( const p of pairs ) {
        if ( p === null ) continue;
        const [i,j] = p;
        m[i][j] = true;
    }
    return m;
};

var cherry = (g) => {
    const firstCherries = pathMaxCherries(g);
    //console.log(firstCherries);
    const taken = pairsToMatrix(firstCherries, g.length);
    const returnCherries = pathMaxCherries(g, taken);
    //console.log(returnCherries);
    return firstCherries.length + returnCherries.length;
};


//
// tests

const inputExpectedPairs = [
    [[ [] ], 0],
    [[ [[1,1,-1],[1,-1,1],[-1,1,1]] ], 0],
    [[ [[0,1,-1],[1,0,-1],[1,1,1]] ], 5],
    [[ [[1,1,1,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,1],
        [1,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,1,1,1]]], 15]
];

module.exports = {
    f: cherry,
    inputExpectedPairs,
    name: '741 [hard] - cherry pickup'
};
