/**
 * url: https://leetcode.com/problems/clone-graph/
 *
 * Given a reference of a node in a connected undirected graph.
 *
 * Return a deep copy (clone) of the graph.
 *
 * Each node in the graph contains a value (int) and a list
 * (List[Node]) of its neighbors.
 *
 */


// Definition for a Node.
function Node (val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
};

/**
 * @param {Node} node
 * @return {Node}
 */

/**
 * [
 *  1: [2,4],
 *  2: [1,3],
 *  3: [2,4],
 *  4: [1,3]
 *  ]
 */

var cloneGraph = function (node) {

    if ( ! node || ! node.val ) return null;
    
    // BFS
    var nodes = [ new Node( node.val ) ];
    var q = [node];
    var visited = [];
    while ( q.length > 0 ) {

        var cur = q.pop();
        const i = cur.val - 1;
        
        if ( visited[i] ) continue;

        if ( ! nodes[i] ) nodes[i] = new Node( cur.val );
        
        var neighbors = [];
        for ( const cni in cur.neighbors ) {
            const neighbor = cur.neighbors[cni];
            const ni = neighbor.val - 1;
            if ( ! nodes[ni] )
                nodes[ni] = new Node( neighbor.val );

            neighbors.push( nodes[ni] );
            if ( ! visited[ni] )
                q.unshift( neighbor );
        }
        nodes[i].neighbors = neighbors;
        visited[i] = true;
    }
    return nodes[0];
};


var adjacencyListToNode = (adjacencyList) => {
    var nodes = [];
    for ( var i = 1; i <= adjacencyList.length; i++ )
        nodes.push( new Node(i,[]) );
    for ( var i = 0; i < adjacencyList.length; i++ ) {
        var n = nodes[i];
        n.neighbors = adjacencyList[i].map(j => nodes[j-1])
        nodes[i] = n;
    }
    return nodes[0];
};

var nodeToAdjacencyList = (node) => {

    if ( ! node ) return [];
    
    // BFS
    var al = [];
    var q = [node];
    while ( q.length > 0 ) {

        var cur = q.pop();
        const i = cur.val - 1;
        
        if ( al[i] ) continue;
        var ns = [];
        for ( const cni in cur.neighbors ) {
            const n = cur.neighbors[cni];
            ns.push( n.val );
            if ( ! al[ n.val ] ) q.unshift( n );
        }
        al[i] = ns
    }
    return al;
};

var convertThenCloneGraph = (adjacencyList) => {
    const node = adjacencyListToNode(adjacencyList);
    const r = cloneGraph(node);
    //console.log('----');
    return nodeToAdjacencyList(r);
};


//
// tests

const inputExpectedPairs = [
    [[[]], []],
    [[[[]]], [[]]],
    [[[[], []]], [[], []]],
    [[[[2], []]], [[2], []]],
    [[[[2], [1]]], [[2], [1]]],
    [[[[2,4],[1,3],[2,4],[1,3]]], [[2,4],[1,3],[2,4],[1,3]]]
]

module.exports = {
    f: convertThenCloneGraph,
    inputExpectedPairs,
    name: '133 - clone graph'
};
