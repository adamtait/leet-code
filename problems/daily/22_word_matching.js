/**
 * url: https://dailycodingproblem.com/solution/22
 *
 * Given a dictionary of words and a string made up of those words (no
 * spaces), return the original sentence in a list. If there is more
 * than one possible reconstruction, return any of them. If there is
 * no possible reconstruction, then return null.
 *
 * For example, given the set of words 'quick', 'brown', 'the', 'fox',
 * and the string "thequickbrownfox", you should return ['the',
 * 'quick', 'brown', 'fox'].
 *
 * Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond',
 * and the string "bedbathandbeyond", return either ['bed', 'bath',
 * 'and', 'beyond] or ['bedbath', 'and', 'beyond'].
 */


/**
 solution 1
 + prefix tree
 + iterate through s, tracking prefix tree
   + if 2+ words possible on branch
     + recurse on remaining string, after removing each of those words
 + time:  O( n + k ), where k is the number of overlapping words in dictionary
 + time:  O( 2^n ), since recursing could be exponential
 + space: O( d ) + string slices
*/

/**
 solution 2
 + recursively compare string prefixes to dictionary
   + if 2+ words match
     + recurse on remaining string, after removing each of those words
   + when s.length === 0, then return words
 + time: O( 2^n ), since recursing could be exponential
 + space: O(1)
*/

/**
 solution 3
 + can we use memoization?
   + yes. store words that match by index.
 + can we use dynamic programming?
   + yes. build up permutations of words in dictionary until we find
   one matching the input
     + seems like this might be inefficient
       + not using the fact that we can compare substrings
   + yes... different take
     + compare every substring in s to each word in d
     + store nxn matrix, true where [startIndex][endIndex] match dictionary
 + time:  O( n^2 ), building every possible substring
 + space: O( n^2 )
*/

const newSquareMatrix = (n, defaultValue = null) => {
    var m = [];
    for ( var i = 0; i < n; i++ ) {
        if ( m[i] === undefined ) m[i] = [];
        for ( var j = 0; j < n; j++ )
            m[i].push(defaultValue);
    }
    return m;
};

var findDpMatches = (dpm, i = 0) => {

    if ( i >= dpm.length-1 )
        // reached end of s
        return [];

    for ( var j = dpm.length-1; j >= 0; j-- ) {
        if ( dpm[i][j] ) {
            // find matches for dpm[j]
            const suffixMatches = findDpMatches(dpm, j);
            if ( suffixMatches !== null )
                return [[i,j], ...suffixMatches];
        }
    }
    return null;
};

var words = (dict, s) => {

    const len = s.length;
    var m = newSquareMatrix( len+1 );
    
    // fill dp matrix with matches
    for ( var i = 0; i < len; i++ ) {
        for ( var j = 1; j < len+1; j++ ) {
            const ss = s.slice(i,j);
            if ( dict.has(ss) )
                m[i][j] = true;
        }
    }

    // find complete matches
    var indexes = findDpMatches(m);
    if ( ! indexes ) return null;

    var words = [];
    for ( var i = 0; i < indexes.length; i++ ) {
        const [start, end] = indexes[i];
        words.push( s.slice(start, end) );
    }
    return words;
};


//
// tests

const wrap = (dict, s) => {
    const d = new Set(dict);
    return words(d,s);
};

const inputExpectedPairs = [
    [[[], ''], []],
    [[['a'], ''], []],
    [[['a','b'], 'a'], ['a']],
    [[['a','b'], 'ab'], ['a', 'b']],
    [[['a', 'aa','b'], 'ab'], ['a', 'b']],
    [[['a', 'aa','b'], 'abaa'], ['a', 'b', 'aa']],
    [[['a', 'aa','aaa', 'aaaa', 'ab'], 'aaaaaab'],
     ['aaaa', 'a', 'ab']],  // though many combinations are possible
    [[['quick', 'brown', 'the', 'fox'], "thequickbrownfox"],
     ['the', 'quick', 'brown', 'fox']],
    [[['bed', 'bath', 'bedbath', 'and', 'beyond'], "bedbathandbeyond"],
     ['bedbath', 'and', 'beyond']] // or ['bed', 'bath', 'and', 'beyond']
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: '22 [medium] - split string by dictionary'
};
