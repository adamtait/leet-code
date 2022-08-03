

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}



var arrayToTreeNode = (a, balanced = true) => {
    if ( ! a || a.length <= 0 ) return null;

    var val = null, left = null, right = null;
    if ( balanced ) {
        const sa = a.sort();
        const partition = Math.floor(sa.length / 2);
        val = sa[partition];
        left =  sa.slice(0, partition);
        right = sa.slice(partition + 1);
    }
    else {
        val = a[0];
        if ( val === null || val === undefined )
            return null;

        const lv = a[1], rv = a[2];
        const rest = a.slice(3);
        const partition = Math.floor(rest.length / 2);
        left = [lv].concat( rest.slice(0,partition) );
        right = [rv].concat( rest.slice(partition) );
    }
    
    const leftNode = arrayToTreeNode( left, balanced );
    const rightNode = arrayToTreeNode( right, balanced );
    return new TreeNode(val, leftNode, rightNode);
};

const treeNodeToArray = (n) => {
    if ( ! n ) return null;
    var r = [ n.val ];
    if ( n.left ) r = r.concat( treeNodeToArray(n.left) );
    if ( n.right ) r = r.concat( treeNodeToArray(n.right) );
    return r;
};

module.exports = {
    arrayToTreeNode,
    treeNodeToArray,
    TreeNode
};
