/**
 * url: https://www.interviewcake.com/question/javascript/permutation-palindrome
 *
 *  Write an efficient function that checks whether any permutation
 *  of an input string is a palindrome.
 *
 * You can assume the input string only contains lowercase letters.
 */ 

/**
 solution 1:
 + build map of count of chars seen
 + check map
   + one count can be uneven
   + all rest must be even numbers
 + time: O(n)
 + space: O(n)
*/

 

var pp = (s) => {
    var seen = {};
    for ( var i = 0; i < s.length; i++ ) {
        const c = s[i];
        if ( seen[c] === undefined )
            seen[c] = 1;
        else seen[c]++;
    }

    var uneven = 0;
    for ( var c of Object.values(seen) ) {
        if ( c % 2 === 1 ) {
            if ( uneven > 0 ) return false;
            uneven++;
        }
    }
    return true;
};



//
// test

const inputExpectedPairs = [
    [['c'], true],
    [['ci'], false],
    [['cic'], true],
    [['cii'], true],
    [['iic'], true],
    [['iicc'], true],
    [['civic'], true],
    [['civil'], false],
    [['livci'], false],
];

module.exports = {
    f: pp,
    inputExpectedPairs,
    name: 'any permutation a palindrome?'
};
