/**
 * Write a function that takes an array of characters and reverses the
 * letters in place.
 */

var reverse = (carr) => {
    const l = carr.length;
    const mi = Math.floor( l / 2 );
    for ( var i = 0; i < mi; i++ ) {
        const j = l - 1 - i;
        const c = carr[j];
        carr[j] = carr[i];
        carr[i] = c;
    }
    return carr;
};


//
// test

const inputExpectedPairs = [
    [[['a']], ['a']],
    [[['a', 'b']], ['b', 'a']],
    [[['a', 'b', 'c']], ['c', 'b', 'a']]
];

module.exports = {
    f: reverse,
    inputExpectedPairs,
    name: 'merging ranges'
};
