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
    
    result = result / 10;
    if ( x < 0 ) result = result * -1;
    if ( result > 2147483647 || result < -2147483648 ) return 0;
    return result;
};


const inputExpectedPairs = [
    [[0], 0],
    [[123], 321],
    [[-123], -321],
    [[120], 21],
    [[1200], 21],
    [[12001], 10021],
    [[1534236469], 0],
    [[7463847412], 2147483647],
    [[8463847412], 0],
    [[-8463847412], -2147483648],
    [[-9463847412], 0],
];


module.exports = {
    f: reverse,
    inputExpectedPairs,
    name: '7 - reverse integer'
};
