/*
 * Given a string s, return the longest palindromic substring in s.
 */

/**
 * @param {string} s
 * @return {string}
 */

const longestPalindromeAt = function (s, i) {
    
    // what happens if it's a palindrome with a pair in the middle?
    // special check for that

    var il = i;
    var ir = i;
    
    var til = i - 1;
    var tir = i + 1;
    if ( til >= 0 || tir < s.length ) {
        var l = s[til]; var r = s[tir];
        if ( l !== r ) { // not same on both sides
            // pair to the left
            if ( l === s[i] ) il = til;
            // pair to the right
            else if ( r === s[i] ) ir = tir;
        }
    }

    const minr = s.length - ir - 1;
    const dist = Math.min(il, minr < 0 ? 0 : minr);
    var c = il === ir ? s[i] : s[il] + s[ir];

    for (var j = 1; j <= dist; j++)
    {
        var l = il - j;
        var r = ir + j;

        if ( l < 0 || r >= s.length ) break; // out of bounds (should never happen)
        if ( s[l] !== s[r] ) break;  // not a palindrome
        c = s[l] + c + s[r]; // still a palindrome => continue
    }
    return c;
}

var longestPalindrome = function (s) {
    var cm = '';
    for (var i = 0; i < s.length; i++) {
        const candidate = longestPalindromeAt(s, i);
        if ( candidate.length > cm.length ) cm = candidate;
    }
    return cm;
};


const inputExpectedPairs = [
    [[''], ''],
    [['babad'], 'bab'],  // or 'aba'
    [['cbbd'], 'bb'],
    [['a'], 'a'],
    [['ac'], 'a'],
    [['acadefgfedeeee'], 'defgfed']
];


module.exports = {
    f: longestPalindrome,
    inputExpectedPairs,
    name: '5 - longest palindromic string'
};
