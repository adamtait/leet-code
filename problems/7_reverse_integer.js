/**
 * Given a signed 32-bit integer x, return x with its digits reversed.
 * If reversing x causes the value to go outside the signed 32-bit
 * integer range [-231, 231 - 1], then return 0.

 * Assume the environment does not allow you to store 64-bit integers
 * (signed or unsigned).
 */


/**
 * @param {number} x
 * @return {number}
 */

var reverse = function (x) {
    var result = 0;
    var rem = Math.abs(x);
    while ( rem / 10 > 0 ) {
        result = (result + rem % 10) * 10;
        rem = Math.floor(rem / 10);
    }
    return x < 0 ? (result / 10) * -1 : (result / 10);
};


const inputExpectedPairs = [
    [[0], 0],
    [[123], 321],
    [[-123], -321],
    [[120], 21],
    [[1200], 21],
    [[12001], 10021],
];


module.exports = {
    f: reverse,
    inputExpectedPairs,
    name: '7 - reverse integer'
};
