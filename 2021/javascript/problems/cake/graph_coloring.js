/**
 * url: https://www.interviewcake.com/question/javascript/graph-coloring
 *
 * Given an undirected graph with maximum degree D, find a graph
 * coloring using at most D+1 colors.
 */

class GraphNode {
  constructor(label) {
    this.label = label;
    this.neighbors = new Set();
    this.color = null;
  }
}

var a = new GraphNode('a');
var b = new GraphNode('b');
var c = new GraphNode('c');

a.neighbors.add(b);
b.neighbors.add(a);
c.neighbors.add(b);
b.neighbors.add(c);

var graph = [a, b, c];


/*
 solution 1
 + I would guess that a good solution might use backtracking, but I
 don't think that backtracking is taught in the Interview Cake course
 + no node can have a neighbor with the same color
 + seems like GraphNode is mutable, so I can add a color there
 + assign node to a color
   + check if color is valid
   + can we determine what set of colors is acceptable?
   + how about if the next color chosen is always the next lowest
   possible number?
 + time:  O(n)
 + space: O(1)
*/


var lowestMissingNum = (nums) => {
    var ns = nums.sort();
    var lmn = 0;
    while ( ns.find(n => n === lmn) >= 0 ) lmn++;
    return lmn;
};

var coloring = (g) => {

    for( let n of g ) {

        // check that n does not have a loop
        if ( n.neighbors.has(n) )
            throw 'Exception: node ' + n.label + ' has a loop';
        
        var cc = [];
        n.neighbors.forEach((k,{ color }) => cc.push( color ));
        const lmc = lowestMissingNum(cc);
        n.color = lmc;
        console.log( n.label + ' ' + n.color + ' ' + JSON.stringify(cc) );
    }
    return g;
};


//
// tests

const inputExpectedPairs = [
    [[''], true],
];

module.exports = {
    f: (_) => true,
    inputExpectedPairs,
    name: 'cake - graph coloring'
};
