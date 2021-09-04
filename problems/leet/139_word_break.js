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

