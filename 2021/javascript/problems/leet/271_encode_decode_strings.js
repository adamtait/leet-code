/**
 * url: https://leetcode.com/problems/encode-and-decode-strings/
 *
 * Design an algorithm to encode a list of strings to a string. The
 * encoded string is then sent over the network and is decoded back to
 * the original list of strings.
 *
 * strs2 in Machine 2 should be the same as strs in Machine 1.
 */



/**
 * Thoughts
 * + input to decode must be a character
 *   + binary representations are not likely to fly (unless we store them as a string)
 * + need a way to clearly separate strings, no matter what their contents.
 * + a single character seems like a bad idea since that character
 * could be directly included in the string
 * + we could escape the strings before concatenating them, then wrap/separate them with an unquoted character
 *   + turns out that JSON.stringify does this
 *   + in fact, we only need to escape/mark the separator character!
 *   + what about if the string already contains the mark+separator character combo?
 */


/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function (strs) {
    var s = '';
    for ( var i = 0; i < strs.length; i++ ) {
        for ( var j = 0; j < strs[i].length; j++ ) {
            const c = strs[i][j];
            if ( c === '|' ) s += '\\';
            s += c;
        }
        s += '|';
    }
    s = s.slice(0, s.length -1);  // remove the last split
    return s;
};


/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function (s) {

    var ss = [];
    var cs = '';
    
    for ( var i = 0; i < s.length; i++ ) {
        const c = s[i];
        if ( c === '\\' && s[i+1] === '|' ) {
            cs += s[i+1];  // add '|'
            i++;           // skip adding '|' again
        }
        else if ( c === '|' ) {
            ss.push( cs ); // add to results
            cs = '';       // clear current str
        }
        else cs += c;
    }
    ss.push( cs );
    return ss;
};


//
// test

const wrap = (strs) => decode( encode( strs ) );
    

const inputExpectedPairs = [
    [[['']], ''],
    [[["Hello","World"]], ["Hello","World"]],
    [[['abc', 'd|e\\|f']], ['abc', 'd|e\\|f']]
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: '271 - decode and encode strings'
};

