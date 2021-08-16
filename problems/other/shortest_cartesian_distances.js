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

const dist = (ac, bc) => {
    return Math.abs( bc[0] - ac[0] ) + Math.abs( bc[1] - ac[1] );
};

const sortBy = (f, coll) =>  coll.sort((a, b) => f(b) - f(a));

const combinations = (as, bs) => {
    if (as.length === 0 || bs.length === 0)
        return [{ dist: 0, pairs: [] }];
    if (as.length === 1)
        return bs.reduce(cs, b => {
            return cs.concat([{ dist: dist(as[0], b), pairs: [[as[0],b]] }]);
        }, []);
    if (bs.length === 1)
        return as.reduce(cs, a => {
            return cs.concat([{ dist: dist(a, bs[0]), pairs: [[a,bs[0]]] }]);
        }, []);

    const a = as[0];
    var cs = [];
    for (var i in bs) {
        const b = bs[i];
        const rbs = bs.slice(0,i).concat(bs.slice(i+1));
        var rs = combinations(as.slice(1), rbs);
        const d = dist(a,b);
        const r = rs.map(c => {
            return {
                dist: c.dist + d,
                pairs: c.pairs.concat([[a,b]])
            };
        });
        cs.concat(r);
    };
    return cs;
};

const dynamic = function (as, bs) {

    var ds = [];

    for (var an = 0; an < as.length; an++) {
        var apaths = [];
        for (var bn = 0; bn < bs.length; bn++) {
            const sps = dist(as[an], bs[bn]);
            apaths.push([bs[bn], sps]);
        }
        ds.push([as[an], apaths]);
    }

    console.log(ds);
    
    // all combinations of a's & b's
    var gds = [];
    for (var i in as) {
        var vbs = [];
        var g = 0;
        for () {

        }
        
    }

    
};


//
// main

var shortestCartesianDistances = function (rows) {

    //var graph = [];
    var as = [];
    var bs = [];
    for (var rn = 0; rn < rows.length; rn++) {
        const cols = rows[rn].split('');
        //graph.push(cols);
        for (var cn = 0; cn < cols.length; cn++) {
            if (cols[cn] === 'a') as.push([rn,cn]);
            if (cols[cn] === 'b') bs.push([rn,cn]);
        }
    }

    const rs = dynamic(as, bs);
    console.log(rs);
    return rs;
    
    //return dynamic(graph, as, bs);
    //return floydWarshall(graph);
    
};

const inputExpectedPairs = [
    [[["ab"]], [[0, 0], [0, 1]]],
    //[["a", "b"], [[0, 0], [1, 0]]],
];


module.exports = {
    f: shortestCartesianDistances,
    inputExpectedPairs,
    name: 'shortest cartesian distances'
};
