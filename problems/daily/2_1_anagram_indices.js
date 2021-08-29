/**
 * Given a word w and a string s, find all indices in s which are the
 * starting locations of anagrams in w. For example, given w is 'ab'
 * and s is 'abxaba' return [0,3,4]
 *
 */

//
// 1st attempt
// runtime: O( s )

var cm = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26 };

var hashValue = s => s.split('').map(c => cm[c]).reduce((a,v) => a + v, 0);

var compareChars = (w) => (cs) => {
    var ws = w.split('')
        .reduce((a,c) => {
            a[c] = a[c] ? a[c]+1 : 1;
            return a;
        }, {});
    while ( cs.length > 0 ) {
        if ( ws[cs[0]] === undefined ) return false;
        ws[cs[0]]--;
        cs = cs.slice(1);
    }
    return Object.values(ws).reduce((a,c) => a && c === 0, true);
};

var findAnagramIndices = (w, s) => {
    const len = w.length;
    const wh = hashValue(w);

    var ch = hashValue( s.slice(0,len) );
    var indices = [];
    if ( ch === wh ) indices.push(0);
    
    for ( var i = 1; i < s.length - len + 1; i++ ) {
        ch = ch - cm[s[i-1]] + cm[s[i+len-1]];
        if ( ch === wh ) indices.push(i);
    }

    // check chars
    const check = compareChars(w);
    return indices.filter((i) => check( s.slice(i,i+len) ));
};


//
// 2nd attempt
// runtime: O( w * s )

var histogram = (s) => {
    return s
        .split('')
        .reduce((a,c) => {
            a[c] = a[c] ? a[c]+1 : 1;
            return a;
        }, {});
};

var histogramEquals = (a,b) => {
    var r = true;
    for ( const k in a )
        r = r && a[k] === b[k];
    return r;
};

var findAnagramIndices = (w, s) => {

    if ( w.length === 0 || s.length === 0 ) return [];
    
    var indices = [];
    const wlen = w.length;
    const wset = histogram(w);
    var hist = histogram( s.slice(0, wlen) );
    if (histogramEquals(wset,hist))
        indices.push(0);
    
    for ( var i = wlen; i < s.length; i++ ) {
        const cd = s[i - wlen];
        const ca = s[i];
        hist[cd] = hist[cd] - 1;
        if ( hist[cd] <= 0 ) delete hist[cd];
        hist[ca] = hist[ca] ? hist[ca]+1 : 1;
        if (histogramEquals(wset,hist))
            indices.push(i - wlen +1);
    }
    return indices;
};


//
// tests

const inputExpectedPairs = [
    [['',''], []],
    [['ab', 'abcdef'], [0]],
    [['ab', 'abab'], [0,1,2]],
    [['ab', 'ababa'], [0,1,2,3]],
    [['ab', 'abxaba'], [0,3,4]]
];

module.exports = {
    f: findAnagramIndices,
    inputExpectedPairs,
    name: '2.1 (book) - find anagram indices'
};
