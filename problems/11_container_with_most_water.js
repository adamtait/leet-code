/**
 *
 * Given n non-negative integers a1, a2, ..., an , where each
 * represents a point at coordinate (i, ai). n vertical lines are
 * drawn such that the two endpoints of the line i is at (i, ai) and
 * (i, 0). Find two lines, which, together with the x-axis forms a
 * container, such that the container contains the most water.
 *
 * Notice that you may not slant the container.
 */


var maxArea = function (heights) {
    var max = 0;
    for ( const i in heights ) {
        const ha = heights[i];
        for ( var j = i; j < heights.length; j++ ) {
            const hb = heights[j];
            const m = Math.min(ha, hb);
            const nm = m * (j - i);
            if (nm > max) max = nm;
        }
    }
    return max;
};

const inputExpectedPairs = [
    [[[1,1]], 1],
    [[[1,2,1]], 2],
    [[[4,3,2,1,4]], 16],
    [[[1,8,6,2,5,4,8,3,7]], 49],
];


module.exports = {
    f: maxArea,
    inputExpectedPairs,
    name: '11 - container with most water'
};
