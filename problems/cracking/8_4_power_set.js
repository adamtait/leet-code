/**
 * Write a method to return all subsets of a set.
 * 
 * Hints:
 * 1. How can you build all subsets of {a, b, c} from the subsets of {a, b}?

 * 2. Anything that is a subset of {a, b} is also a subset of {a, b, c}. 
 *    Which sets are subsets of {a, b, c} but not {a, b}?
 *
 */


//
// power set

const remove = (i, set) => {
    const tail = set.slice(i+1);
    return set.slice(0,i).concat( tail );
};

const powerset = (set) => {

    if ( set.length === 0 ) return [[]];
    if ( set.length === 1 ) return [[], set];
    
    var rs = [];
    const crs = powerset( set.slice(1) );
    rs = rs.concat( crs.map(s => [set[0]].concat(s)) ).concat(crs);
    return rs;
};



//
// tests

const inputExpectedPairs = [
    [[[]], []],
    [[[1]], [[], [1]]],
    [[[1, 2]],
     [[], [1], [2], [1, 2]]],
    [[[2, 3]],
     [[], [2], [3], [2, 3]]],
    [[[1, 2, 3]],
     [[], [1], [2], [3], [1, 2], [2, 3], [1, 3], [1, 2, 3]]]
];

module.exports = {
    f: powerset,
    inputExpectedPairs,
    name: '8.4 power set'
};
