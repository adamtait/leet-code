/**
 * One Away
 *
 * There are three types of edits that can be performed on strings:
 * insert a character, remove a character, or replace a character.
 * Given two strings, write a function to check if they are one edit
 * (or zero edits) away.
 */

var oneAway = (a, b) => {

    var edits = 0;
    var i = 0, j = 0;

    while ( i < a.length && j < b.length
            && edits < 2 ) {
        
        if ( a[i] === b[j] ) {
            i++; j++;
        }
        // remove
        else if ( a[i+1] === b[j] ) {
            edits++; i++;
        }
        // insert
        else if ( a[i] === b[j+1] ) {
            edits++; j++;
        }
        // replace
        else if ( a[i+1] === b[j+1] ) {
            edits++; i++; j++;
        }
    }
    if ( edits > 1 ) return false;
    if ( i === a.length && j === b.length ) return true;
    if ( edits === 1 ) return false;
    return Math.abs(a.length - b.length) < 2;
};


//
// tests

const inputExpectedPairs = [
    [['pale', 'ple'], true],
    [['pales', 'pale'], true],
    [['pale', 'bale'], true],
    [['pale', 'bake'], false],
];

module.exports = {
    f: oneAway,
    inputExpectedPairs,
    name: '1.5 one away'
};
