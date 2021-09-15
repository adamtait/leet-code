/*
 * Part 1
 *
 * Given a sorted array and a value, find the value in O( log(n) ). If
 * value is not in array, return null.
 *
 * Bonus points if you can solve both iteratively and recursively.
 */


// 2, [1,3]

var bsi = (v, vs) => {

    const len = vs.length;
    var i = Math.floor( len / 2 ), pi = null, pii = null;
    while ( i !== pi && i !== pii
            && i >= 0 && i < len ) {
        
        const vv = vs[i];
        if ( v === vv ) return vv;

        pii = pi;
        pi = i;
        const half = Math.floor( i / 2 ) + 1;
        if ( v < vv ) i -= half;
        else i += half; // v > vv
    }
    return null;
};

var bsi = (v, vs) => {

    var l = 0;
    var r = vs.length - 1;
    while ( l <= r ) {
        const m = Math.floor( (r + l) / 2 );
        const vv = vs[m];
        if ( vv < v )      l = m + 1;
        else if ( vv > v ) r = m - 1;
        else return vv;
    }
    
    return null;
};


var bsr = (v, vs) => {

    const len = vs.length;
    if ( len === 0 ) return null;
    if ( len === 1 ) {
        if ( v === vs[0] )
            return vs[0];
        return null;
    }
    
    const i = Math.floor( len / 2 );
    const vv = vs[i];

    if ( v === vv ) return vv;
    if ( v < vv ) return bsr(v, vs.slice(0,i))

    // else v > vv
    return bsr(v, vs.slice(i+1));
};


/*
 * Part 2
 *
 * Given a sorted array and a value, find the closest value(s) from
 * the array.
 *
 * Given value may not be in the array. In this case, return the
 * values both smaller & larger than given value
 *
 * Bonus points if you can solve both iteratively and recursively.
 */

// 2, [1,3,4,5]  => 0
// 7, [1,3,4,5]  => 3

var ubsi = (v, vs) => {

    var l = 0;
    var r = vs.length - 1;
    while ( l <= r ) {
        const m = Math.floor( (r + l) / 2 );
        const vv = vs[m];
        if ( vv < v )      l = m + 1;
        else if ( vv > v ) r = m - 1;
        else return m;
    }
    return Math.min(l,r);
};

var ubsr = (v, vs) => {

    console.log(vs);
    const len = vs.length;
    if ( len <= 1 ) return 0;
    if ( len === 2 ) return 1;
    
    const i = Math.floor( len / 2 );
    const vv = vs[i];

    if ( v === vv ) return i;
    
    if ( vv > v ) // => left
        return ubsr(v, vs.slice(0,i+1))
    
    // vv < v => right
    return i + ubsr(v, vs.slice(i))
};



//
// tests

const inputExpectedPairs = [
    [[2, [1,2,3]], 2],
    [[2, [1,3]], null]
    //[[2, [1,2,3]], [2]],
    //[[2, [1,3]], [1,3]]
];

module.exports = {
    f: bsr,
    inputExpectedPairs,
    name: 'own - binary search'
};
