/**
 * url: https://leetcode.com/problems/word-break/
 *
 * Given a string s and a dictionary of strings wordDict, return true
 * if s can be segmented into a space-separated sequence of one or
 * more dictionary words.
 *
 * Note that the same word in the dictionary may be reused multiple
 * times in the segmentation.
*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */

// thoughts
// + break down into subproblems
//   + if match, can we match remaining slice?

var mergeStringIntoPrefixTree = (s, pt) => {
    if ( s.length === 0 ) return pt;
    const c = s[0];

    if ( ! pt ) return { c: null };

    pt[c] = mergeStringIntoPrefixTree(s.slice(1), pt[c]);
    return pt;
};

var strsToPrefixTree = (strs) => {
    var pt = {};
    for ( var i = 0; i < strs.length; i++ ) {
        pt = mergeStringIntoPrefixTree(strs[i], pt);
    }
    return pt;
};

//
// 1st solution
//  O( s * wordDict.length )

var wordBreak = function (s, wordDict) {

    if ( s.length === 0 ) return true;

    // if matches?
    // recursively check match
    // => then does rest of s match?
    for ( var i = 0; i < wordDict.length; i++ ) {
        const w = wordDict[i];
        const wl = w.length;
        if ( s.slice(0, wl) === w ) {
            const rest = s.slice( wl );
            if ( wordBreak( rest, wordDict ) )
                return true; // found a complete match!
        }
    }
    return false;
};


//
// 2nd solution
//  memoization

var recur = function (s, wordDict, memo) {

    if ( s.length === 0 ) return true;
    if ( memo[ s.length ] ) return memo[ s.length ];

    // if matches?
    // recursively check match
    // => then does rest of s match?
    for ( var i = 0; i < wordDict.length; i++ ) {
        const w = wordDict[i];
        const wl = w.length;
        if ( s.slice(0, wl) === w ) {
            const rest = s.slice( wl );
            if ( wordBreak( rest, wordDict ) ) {
                memo[ s.length ] = true;
                return true;
            }
        }
    }
    memo[ s.length ] = false;
    return false;
};

var memo = {};

var wordBreak = function (s, wordDict) {
    memo = {};
    return recur(s, wordDict, memo);
};


//
// 3rd solution

// build combinations of slices by lengths of wordDict entries
// can we build combinations of wordDict entries to re-build s?


var wordBreak3 = function (s, wordDict) {

    // build words by length
    var wordsByLen = {};
    for ( var i = 0; i < wordDict.length; i++ ) {
        const word = wordDict[i];
        const k = word.length;
        if (! wordsByLen[k]) wordsByLen[k] = [word];
        else wordsByLen[k] = wordsByLen[k].concat([word]);
    }
    
    var wordLengths = Object.keys(wordsByLen).map(l => Number(l)).sort();

    // build possibilities from end
    var possibles = [];
    for ( var i = s.length -1; i >= 0; i-- ) {
        if ( s.slice(i) ) {}
    }
    return possibles[0];
};


//
// test

const inputExpectedPairs = [
    [["leetcode", ["leet","code"]], true],
    [["applepenapple", ["apple","pen"]], true],
    [["catsandog", ["cats","dog","sand","and","cat"]], false]
];

module.exports = {
    f: wordBreak,
    inputExpectedPairs,
    name: '139 - word break'
};

