/**
 * url: https://leetcode.com/problems/longest-repeating-character-replacement/
 *
 * You are given a string s and an integer k. You can choose any
 * character of the string and change it to any other uppercase
 * English character. You can perform this operation at most k times.
 *
 * Return the length of the longest substring containing the same
 * letter you can get after performing the above operations.
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

// similar to longest subsequence
// want longest subsequence with k skips

var numSkips = (chars) => {
    const vals = Object.values(chars);
    const others = vals.sort().slice(0, vals.length - 1);
    const sum = others.reduce((a,n) => a + n, 0);
    return sum;
};

var characterReplacement = function (s, k) {

    var l = 0;
    
    for ( var i = 0; i < s.length; i++ ) {
        var j = i + 1;
        var chars = {};
        chars[ s[i] ] = 1;
        while ( j < s.length && numSkips(chars) <= k )
        {
            if ( ! chars[ s[j] ] ) chars[ s[j] ] = 1;
            else chars[ s[j] ]++;
            j++;
        }
        var nl = j - i;
        if ( numSkips(chars) > k ) nl--;
        l = Math.max( l, nl );
    }
    return l;
};


//
// tests

const inputExpectedPairs = [
    [["", 0], 0],
    [["A", 0], 1],
    [["ABAB", 2], 4],
    [["ABBB", 2], 4],
    [["AABABBA", 1], 4],
];

module.exports = {
    f: characterReplacement,
    inputExpectedPairs,
    name: '424 - longest repeating charactor replacement'
};
