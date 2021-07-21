/*
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a
 * given number of rows like this: (you may want to display this
 * pattern in a fixed font for better legibility)
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * And then read line by line: "PAHNAPLSIIGYIR"
 * Write the code that will take a string and make this conversion given a number of rows:
 * 
 * string convert(string s, int numRows);
 *
 * Example 1:
 *
 * Input: s = "PAYPALISHIRING", numRows = 3
 * Output: "PAHNAPLSIIGYIR"
 *
 * Example 2:
 * Input: s = "PAYPALISHIRING", numRows = 4
 * Output: "PINALSIGYAHRPI"
 * Explanation:
 * P     I    N
 * A   L S  I G
 * Y A   H R
 * P     I
 */

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */

var convert = function (s, numRows) {

    // come up with a mathematical way (based on [numRows] to predict
    // what the character for each index in the result should be

    var result = '';
    for (var i = 0; i < s.length; i++) {
        
    }
    return result;
};


const inputExpectedPairs = [
    [['', 3], ''],
    [['PAYPALISHIRING', 3], 'PAHNAPLSIIGYIR'],
    [['PAYPALISHIRING', 4], 'PINALSIGYAHRPI']
];


module.exports = {
    f: convert,
    inputExpectedPairs,
    name: '6 - zigzag conversion'
};
