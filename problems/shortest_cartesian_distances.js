/**
 *
 * Given a collection of row coordinates (as strings), return a
 * collection of the a-b pairs that make all distances between a & b
 * at a minimum
 * 
 */


/**
 * If we think about the cartesian coordinate system as a graph, then
 * I think we can use the old Floyd-Warshall all-pairs-shortest-paths
 * algorithm (from CLRS).
 * 
 * Turns out that Floyd-Warshall algorithm is a dynamic programming
 * solution to the all pairs shortest paths problem. Runtime is O(V^3)
 *
 * We cannot use all-pairs-shortest-paths directly, since the 'a'-s &
 * 'b'-s are mutually exclusive. We cannot send two 'a'-s to the same
 * 'b'.
 *
 * I think we should first attack all-pairs all-paths, then determine
 * a global optimum.
 *
 * Ironically, this is the same approach I was thinking of using when
 * originally given this problem.
 */



const floydWarshall = () => {
    
};


//
// dynamic

const eds = [
    [[0,0], [ [[1,1], 2], [[2,2], 4] ]],
    [[1,0], [ [[1,1], 1], [[2,2], 3] ]],
];

var shortestPath = (g, ac, bc) => {
    return Math.abs( bc[0] - ac[0] ) + Math.abs( bc[1] - ac[1] );
};

const dynamic = function (graph, as, bs) {

    var ds = [];

    for (var an = 0; an < as.length; an++) {
        var apaths = [];
        for (var bn = 0; bn < bn.length; bn++) {
            const sps = shortestPath(graph, as[an], bs[bn]);
            apaths.push([bs[bn], sps]);
        }
        ds.push([as[an], apaths]);
    }

    // dynamic programming part
    var rs = [];
    //for (var )
    // need to compute global shortests paths sums for all combinations of a's & b's

    
};


//
// main

var shortestCartesianDistances = function (rows) {

    var graph = [];
    var as = [];
    var bs = [];
    for (var rn = 0; rn < rows.length; rn++) {
        const cols = cols.split();
        graph.push(cols);
        for (var cn = 0; cn < cols.length; cn++) {
            if (cols[cn] === 'a') as.push([rn,cn]);
            if (cols[cn] === 'b') bs.push([rn,cn]);
        }
    }

    //return dynamic(graph, as, bs);
    return floydWarshall(graph);
    
};

const inputExpectedPairs = [
    [["ab"], [[0, 0], [0, 1]]],
    [["a", "b"], [[0, 0], [1, 0]]],
];


module.exports = {
    f: shortestCartesianDistances,
    inputExpectedPairs,
    name: '11 - container with most water'
};
