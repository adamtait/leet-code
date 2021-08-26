/** 
 * Given two integers a and b, return the sum of the two integers
 * without using the operators + and -.
 *
 * boundary: -1000 <= a, b <= 1000
 */

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */

// 01
// 01
// 10

// 01
// 10
// 11

// 010
// 010
// 100

// 011
// 011
// 110

// 0111
// 0111
// 1110

// 0110
// 0111
// 1101



var kthBit = (k, num) => (num & (1 << k)) !== 0 ? 1 : 0;

var getSum = function(a, b) {

    var s = 0;
    var carry = 0;
    for (var i = 0; i < 33; i++) {
        
        const bits = [carry, kthBit(i, a), kthBit(i, b)];

        // next carry
        carry = 0;
        const c = bits.filter(n => n > 0).length;
        if ( c > 1 ) carry = 1;

        // update result
        const bit = bits.reduce((a,b) => a ^ b);
        const mask = bit << i;
        s |=  mask;
    }
    return s;
};

var toBin = (n) => (n >>> 0).toString(2);


//
// testing

const inputExpectedPairs = [
    [[0,0], 0],
    [[0,1], 1],
    [[1,1], 2],
    [[1,2], 3],
    [[2,3], 5],
    [[1000,1000], 2000],
    [[-1,1], 0],           // fails => 1
    [[-1,-1], -2],         // fails => -1
    [[-1,-2], -3],
    [[-2,-1], -3],
    [[-1000,-1000], -2000],
    [[-1000,1000], 0]      // fails => 1
];

module.exports = {
    f: getSum,
    inputExpectedPairs,
    name: '371 - sum of two integers (binary)'
};
