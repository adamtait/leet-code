/**
 * A unival tree (which stands for "universal value") is a tree where
 * all nodes under it have the same value.
 *
 * Given the root to a binary tree, count the number of unival subtrees.
 */

//
// tree builder

const rootFromRecursiveArrays = (arrs) => {
    if ( typeof arrs === 'number' )
        return { value: arrs };
    if ( arrs.length < 3 )
        return { value: arrs[0] };
    return {
        value: arrs[0],
        left: rootFromRecursiveArrays(arrs[1]),
        right: rootFromRecursiveArrays(arrs[2]),
    };
};


//
// unival subtrees

const recur = (root, val) => {

    const dr = { match: true, count: 0 };
    const l = root.left ? recur(root.left, root.value) : dr;
    const r = root.right ? recur(root.right, root.value) : dr;

    const tc = l.match && r.match ? 1 : 0;
    return {
        match: root.value === val && l.match && r.match,
        count: l.count + r.count + tc
    };
};

const univalSubtrees = (treeData) => {
    
    const root = rootFromRecursiveArrays(treeData);
    const { count } = recur(root, root.value);
    return count;
};


//
// tests

const inputExpectedPairs = [
    [[[1, 0, 0]], 2],
    [[[0, 0, 0]], 3],
    [[[0, [0, 0, 0], [0, 0, 0]]], 7],
    [[[1, [0, 0, 0], [0, 0, 0]]], 6],
    [[[0, 1, [0, [1, 1, 1], 0]]], 5]  // in example (https://www.dailycodingproblem.com/solution/8)
];

module.exports = {
    f: univalSubtrees,
    inputExpectedPairs,
    name: '8 [easy] - unival subtrees'
};
