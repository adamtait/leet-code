/**
 * Implement an autocomplete system. That is, given a query string s
 * and a set of all possible query strings, return all strings in the
 * set that have s as a prefix.
 *
 * For example, given the query string 'de' and the set of strings [dog,
 * deer, deal], return [deer, deal].
 *
 * Hint: Try preprocessing the dictionary into a more efficient data
 * structure to speed up queries.
 */

/**
 * example tree
 * [dog, deer, deal]
 * { 'd': {
 *     'e': {
 *       'a': { 'l': null },
 *       'e': { 'r': null }
 *      },
 *     'o': { 'g': null }
 *   }
 * }
 */

var walkInsert = (tree, cs) => {

    if ( cs.length === 0 ) return tree;
    
    const c = cs[0];

    if ( ! tree || Object.keys(tree).length === 0 ) {
        var nt = {};
        nt[c] = walkInsert(null, cs.slice(1));
        return nt;
    }
    
    const ne = walkInsert(tree[c], cs.slice(1));
    tree[c] = ne;
    return tree;
};

var newPrefixTree = (dict) => {

    var root = {};
    for ( const i in dict ) {
        const wcs = dict[i].split('');
        root = walkInsert(root, wcs);
    };
    return root;
};

var treeToDict = (root) => {
    var rs = [];
    for (const k in root) {
        const cs = treeToDict(root[k]);
        if ( cs.length === 0 ) rs.push(k);
        else rs = rs.concat( cs.map(postfix => k + postfix) );
    }
    return rs;
};

var walk = (tree, s) => {
    const cs = s.split('');
    var node = tree;
    for (const i in cs) {
        const c = cs[i];
        if ( ! node[c] ) return [];  // no matches
        node = node[c];
    }
    const dict = treeToDict(node);
    return dict.map(postfix => s + postfix);
};



//
// autocomplete

const autocomplete = (query, dict) => {
    const tree = newPrefixTree(dict);
    return walk(tree, query);
};



//
// tests

const inputExpectedPairs = [
    [['', ['dog']], ['dog']],
    [['d', ['dog']], ['dog']],
    [['a', ['dog']], []],
    [['de', ['dog', 'deer', 'deal']], ['deer', 'deal']],
];

module.exports = {
    f: autocomplete,
    inputExpectedPairs,
    name: '11 [medium] - autocomplete'
};
