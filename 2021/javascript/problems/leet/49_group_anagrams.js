/**
 * url: https://leetcode.com/problems/group-anagrams/
 *
 * Given an array of strings strs, group the anagrams together. You
 * can return the answer in any order. Strings contains only lowercase
 * letters.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of
 * a different word or phrase, typically using all the original
 * letters exactly once.
 */

/*
+ histogram hash map?
+ rabin karp code?
  + less expensive than comparing every hash map

solution
+ generate/store number for every str
  + each letter will have a number
  + code = sum numbers
+ time:  O( n )  m = all letters in input
+ space: O( n )  one code for each input s
*/


var rkCode = (s) => {
    return s.split('').reduce((a,c) => a + (c.charCodeAt(0) - 97));
};

var histogram = (s) => {
    var h = {};
    for ( var i = 0; i < s.length; i++ ) {
        const c = s[i];
        if ( ! h[c] ) h[c] = 0;
        h[c]++;
    }
    return h;
};

var compare = (ah, bh) => {
    if ( Object.keys(ah).length !== Object.keys(bh).length )
        return false;

    for ( const k in ah ) {
        if ( bh[k] === undefined || bh[k] !== ah[k] )
            return false;
    }
    
    return true;
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */

var groupAnagrams = function (strs) {

    var codes = {};
    for ( var i = 0; i < strs.length; i++ ) {
        const code = rkCode(strs[i]);
        if ( ! codes[code] ) codes[code] = [];
        codes[code].push(i);
    }

    var groups = [];
    for ( const indexes in Object.values(codes) ) {
        if ( indexes.length === 1 ) {
            groups.push( [ strs[indexes[0]] ] );
            continue;
        }
        
        // else more than 1
        const hgs = indexes.map(i => strs[i]).map(histogram);
        var sets = [[0]];
        for ( var i = 1; i < indexes.length; i++ ) {
            const hg = hgs[i];
            for ( var g = 0; g < sets.length; g++ ) {
                const sfgi = sets[g][0]; // set first histo[g]ram index
                if ( compare( hg, hgs[ sfgi ] ) ) {
                    sets[g].push( i );
                    break;
                }
            }
        }
        groups = groups.concat( sets );
    }
    return groups;
};



/*
solution (probably better)
+ use sorted chars as code
  + can easily use string comparison
*/


var charCode = (s) => s.split('').sort().join('');

var groupAnagrams = function (strs) {

    var codes = {};
    for ( var i = 0; i < strs.length; i++ ) {
        const s = strs[i];
        const code = charCode(s);
        if ( ! codes[code] ) codes[code] = [];
        codes[code].push(s);
    }

    return Object.values(codes);
};



//
// test

const inputExpectedPairs = [
    [[[""]], [[""]]],
    [[["a"]], [["a"]]],
    [[["eat","tea","tan","ate","nat","bat"]],
     [['eat','tea','ate'],['tan','nat'],['bat']]]
];

module.exports = {
    f: groupAnagrams,
    inputExpectedPairs,
    name: '49 [medium] - group anagrams'
};
