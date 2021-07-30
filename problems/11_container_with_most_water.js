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

const recur = (hs, low, high) => {

    const ha = hs[low];
    const hb = hs[high];
    const m = Math.min(ha, hb);
    const nm = m * (high - low);

    // for there to be a new max in between [low, high], there would
    // have to be 2 values that were both greater than the
    // min(hs[low], hs[high]). If we can find those values, then we
    // can jump straight there. Otherwise, this is the global max.

    // hold one end fixed and only move the other

    var i = 0;
    const bottom = ha <= hb;
    while( i < high - low )
    {
        i = i + 1;
        const hi = hs[low+i]; const hj = hs[high-i];
        if (bottom && hi > ha) break;
        if (hj > hb) break;
    }

    if ( (bottom && hs[low+i] > ha) || (hs[high-i] > hb) ) {
        const sm = bottom ? recur(hs, low+i, high) : recur(hs, low, high-i);
        return Math.max(nm, sm);
    }
    return nm;
};

var maxArea = function (heights) {
    return recur(heights, 0, heights.length - 1);
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
