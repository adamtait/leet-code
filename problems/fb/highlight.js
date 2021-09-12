/**
 * Given an input string and a query, implement a function `highlight`
 * that highlights all occurrences of the query with a bold tag:
 *
 *   highlight("adam", "this is adam, speaking to adam") 
  *  => "this is <b>adam</b>, speaking to <b>adam</b>"
 *
 * Brute force solutions are welcome. Feel free to Google or use any
 * helper methods/libraries (eg: `text.indexOf(query)` or
 * `text.substring(i, j)`).
 */

/*
 questions
 + can there be overlaps?
   + assume: no... overlapping ptrn would be a different string

 solution 1
 + while ( s.indexOf( ptrn ) )
   + store indexes
 + split s on indexes + ptrn.length
 + insert '<b>' & '</b>', alternating
 + join on all substrings
 + time:  O( n )
 + space: O( n )
*/

var highlight = (ptrn, s) => {

    if ( ptrn.length === 0 ) return s;

    // 1. build indexes
    var ci = 0;  // current index into s
    var nmi = s.indexOf(ptrn);  // first/next matching index
    var indexes = [];
    while ( nmi >= 0 ) {
        indexes.push( ci + nmi );
        ci += nmi + 1;  // need to make sure that next match isn't same as last match
        nmi = s.slice(ci).indexOf(ptrn);
    }

    // if no indexes, then nothing to do
    if ( indexes.length === 0 ) return s;
    
    // 2. split up s
    var ss = [ s.slice(0, indexes[0]) ];  // add beginning of s, up to 1st match
    for ( var i = 0; i < indexes.length; i++ ) {
        const mi = indexes[i];
        const ns = s.slice(mi, mi + ptrn.length);  // next slice
        const ni = i === indexes.length-1 ? s.length : indexes[ i+1 ];
        const fs = s.slice( mi + ptrn.length, ni); // following string, in between ns & next match
        ss = [ ...ss, '<b>', ns, '</b>', fs ];
    }
    return ss.join('');
};


//
// tests

const inputExpectedPairs = [
    [['', ''], ''],
    [['f', 'f'], '<b>f</b>'],
    [['f', 'af'], 'a<b>f</b>'],
    [['f', 'afa'], 'a<b>f</b>a'],
    [["adam", "this is adam, speaking to adam"],
     "this is <b>adam</b>, speaking to <b>adam</b>"]
];

module.exports = {
    f: highlight,
    inputExpectedPairs,
    name: 'highlight (html parsing)'
};
