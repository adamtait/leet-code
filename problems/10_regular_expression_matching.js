/**
 * Given an input string s and a pattern p, implement regular
 * expression matching with support for '.' and '*' where:
 *
 * + '.' Matches any single character.​​​​
 * + '*' Matches zero or more of the preceding element.
 *
 * The matching should cover the entire input string (not partial).
 *
 * Constraints:
 * + 1 <= s.length <= 20
 * + 1 <= p.length <= 30
 * + s contains only lowercase English letters
 * + p contains only lowercase English letters, '.', and '*'
 * + It is guaranteed for each appearance of the character '*', there
 *    will be a previous valid character to match
 */


/**
 * Thoughts:
 * + '*' is tricky to process. since it can be greedy
 *   + still need to capture pattern matches before & after
 *   + can also capture none
 * + maybe we can 
 *   + parse the '*' patterns out
 *   + match everything else
 *   + match the '*' patterns
 * 
 */

const isNull = (v) => ( v === null || v === undefined );

const tokenize = (p) => {
    const ss = p.split('*');
    const l = ss.length;
    var tokens = [];
    for( var i = 0; i < l - 1; i++ ) {
        const t = ss[i];
        const tll = t.length - 1;
        const cts = t.slice(0, tll).split('');
        if (cts.length > 0)
            tokens = tokens.concat( cts );
        tokens.push( t[tll] + '*' );
    }
    if (ss[l-1]) tokens.push(ss[l-1]);
    return tokens;
};

const isStar = (t) => t.length === 2 && t[1] === '*';

const charMatches = (c, pt) => {
    if ( isStar(pt) )
        return charMatches(c, pt[0]);
    if ( pt === "." ) return true;
    return pt === c;
};

const allStars = (pts) => {
    return pts
        .reduce(
            (acc, pa) => {
                return acc && isStar(pa);
            }, true
        );
};

const im = (s, si, p, pi) => {

    if ( si === -1 && pi === -1 ) return true;
    if ( si === -1 ) {
        if ( pi === -1 ) return true;
        if ( pi === 0 ) return true;
        if ( allStars( p.slice(0, pi) ) ) return true;
        return im(s, null, p, pi-1); // null - want to jump back to place where * token started matching
    }
    if ( pi === -1 ) return false;
    
    
    const sc = s[si]; const pt = p[pi];

    if ( charMatches(sc, pt) ) {
        const npi = isStar(pt) ? pi : pi - 1;
        return im(s, si-1, p, npi);
    }

    // else - char did not match
    if ( isStar(pt) ) return im(s, si, p, pi-1);
    return false;
};

var isMatch = function (s, p) {
    if ( p[0] === '*' ) return false; // bad pattern
    const pts = tokenize(p);
    return im(s, s.length-1, pts, pts.length-1);
};

const inputExpectedPairs = [
    [['aa', 'a'], false],
    [['aa', 'a*'], true],
    [['ab', '.*'], true],
    [['aab', 'c*a*b*'], true],
    [['mississippi', 'mis*is*p*.'], false],
    [['mississippi', 'mis.*'], true],
    //[['mississippi', 'mis.*i'], true],
    //[['mississippi', 'mis.*.'], true],
];


module.exports = {
    f: isMatch,
    inputExpectedPairs,
    name: '10 - regular expression matching'
};


/**
 * helpful links
 * + https://algorithmsinsight.wordpress.com/problems/leetcode/regular-expression-matching/
 */
