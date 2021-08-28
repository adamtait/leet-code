
const { arrayToTreeNode } = require('../../lib/binary_tree');

/**
 * url: https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * 
 * Given the root of a binary tree, return its maximum depth.
 *
 * A binary tree's maximum depth is the number of nodes along the
 * longest path from the root node down to the farthest leaf node.
 */


/**
 * @param {TreeNode} root
 * @return {number}
 */

var maxDepth = function (root) {
    if ( ! root ) return 0;
    const l = maxDepth(root.left);
    const r = maxDepth(root.right);
    return 1 + Math.max(l,r);
};


//
// test wrapper

var wrap = (...args) => {
    const tn = arrayToTreeNode.apply(null, args);
    return maxDepth(tn);
};


//
// tests

const inputExpectedPairs = [
    [[ [] ], 0],
    [[ [0] ], 1],
    [[ [1,null,2] ], 2],
    [[ [3,9,20,null,null,15,7] ], 3]
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: '104 - maximum depth of binary tree'
};
