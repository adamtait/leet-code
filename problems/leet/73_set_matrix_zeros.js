/**
 * url: https://leetcode.com/problems/set-matrix-zeroes/
 *
 * Given an m x n integer matrix matrix, if an element is 0, set its
 * entire row and column to 0's, and return the matrix.
 *
 * You must do it in place.
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

var setZeroes = function (matrix) {

    var ps = [];
    
    for ( var i = 0; i < matrix.length; i++ )
        for ( var j = 0; j < matrix[0].length; j++ )
            if ( matrix[i][j] === 0 )
                ps.push( [i,j] );

    for ( const pi in ps ) {
        const [i,j] = ps[pi];
        
        for ( var k = 0; k < matrix.length; k++ ) // column
            matrix[k][j] = 0;

        for ( var k = 0; k < matrix[0].length; k++ ) // row
            matrix[i][k] = 0;
    }
    return matrix;
};


//
// tests

const inputExpectedPairs = [
    [[ [[1,1,1],[1,0,1],[1,1,1]] ],
     [[1,0,1],[0,0,0],[1,0,1]] ],
    [[ [[0,1,2,0],[3,4,5,2],[1,3,1,5]] ],
     [[0,0,0,0],[0,4,5,0],[0,3,1,0]] ],
];

module.exports = {
    f: setZeroes,
    inputExpectedPairs,
    name: '73 - set metrix zeroes'
};
