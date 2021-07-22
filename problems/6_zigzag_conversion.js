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

const nextRow = (i, r, max) => {
    if ( max <= 1 ) return 0;
    return Math.floor( i / (max - 1) ) % 2 === 0 ? r + 1 : r - 1;
};

var convert = function (s, numRows) {
    var rows = [];
    var curRow = 0;
    for (var i = 0; i < s.length; i++) {
        if ( rows[curRow] === undefined ) rows[curRow] = [];
        rows[curRow].push(s[i]);
        curRow = nextRow(i, curRow, numRows);
    }
    return rows.map((cs) => cs.join('')).join('');
};


const inputExpectedPairs = [
    [['', 3], ''],
    [['AB', 1], 'AB'],
    [['PAYPALISHIRING', 3], 'PAHNAPLSIIGYIR'], // 4 [0,4,8,12, 1,3,5,7,9,11,13, 2,6,10]
    [['PAYPALISHIRING', 4], 'PINALSIGYAHRPI']  // 6 [0,6,12,   1,5,7,11,13,     2,4,8,10,  3,9]
];


module.exports = {
    f: convert,
    inputExpectedPairs,
    name: '6 - zigzag conversion'
};
