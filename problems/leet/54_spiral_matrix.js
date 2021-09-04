/**
 * url: https://leetcode.com/problems/spiral-matrix/
 *
 * Given an m x n matrix, return all elements of the matrix in spiral
 * order.
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

var spiralOrder = function (matrix) {

    // var allStates = ['right', 'down', 'left', 'up'];
    var state = 0;
    var boundaries = [matrix[0].length -1, matrix.length -1,
                      0, 1];
    const size = matrix.length * matrix[0].length;
    
    var indexes = [];
    var i = 0, j = 0;

    while ( indexes.length < size ) {

        indexes.push([i,j]);
        
        if ( state === 0 ) {
            if ( j < boundaries[0] ) j++;
            else {
                boundaries[0] -= 1;
                state++;
                i++;
            }
        } else if ( state === 1 ) {
            if ( i < boundaries[1] ) i++;
            else {
                boundaries[1] -= 1;
                state++;
                j--;
            }
        } else if ( state === 2 ) {
            if ( j > boundaries[2] ) j--;
            else {
                boundaries[2] += 1;
                state++;
                i--;
            }
        } else { // state === 3
            if ( i > boundaries[3] ) i--;
            else {
                boundaries[3] += 1;
                state = 0;
                j++;
            }
        }
    }
    
    for ( var x = 0; x < indexes.length; x++ ) {
        var [y,z] = indexes[x];
        indexes[x] = matrix[y][z];
    }
    return indexes;
};


//
// tests

// [1] [2] [3]
// [4] [5] [6]
// [7] [8] [9]

const inputExpectedPairs = [
    [[[]], []],
    [[[[1,2],[4,3]]], [1,2,3,4]],
    [[[[1,2,3],[4,5,6],[7,8,9]]], [1,2,3,6,9,8,7,4,5]],
    [[[[1,2,3,4],[5,6,7,8],[9,10,11,12]]], [1,2,3,4,8,12,11,10,9,5,6,7]]
];

module.exports = {
    f: spiralOrder,
    inputExpectedPairs,
    name: '54: spiral matrix'
};
