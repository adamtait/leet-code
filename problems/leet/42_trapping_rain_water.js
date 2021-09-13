/**
 * url: https://leetcode.com/problems/trapping-rain-water/
 *
 * Given n non-negative integers representing an elevation map where
 * the width of each bar is 1, compute how much water it can trap
 * after raining.
 *
 */

/*
 solution 1
 + solution seems stack-ish
 + like we need to make some histogram of heights
 + brute force
 + for each height, h
   + iterate forward
   + if find height > h
     + calculate rain between h & height


 solution 2
 + build histogram of index by height
 + start with largest height
 + if index.length > 1
   + calculate rain water in between pairs of indexes
   + remove any not-yet-checked indexes in between larger pairs of indexes
   + add indexes to next smallest set (height 2 is also height 1...)
 + continue until all indexes covered

 solution 3
 + sense that there might be a direct linear solution
 + we need indexes (already seen) that are >= current height
   + what data structure can do this?
   + we can use an array of arrays (might have a 10^5 array though,
   unless JS implements some efficient sparse array...)
   + basically, sorted collection of stacks
   + heap? ... heap of stacks?
   + prefix stacks?
 + how do we handle the way down?
   + we could reverse the algorithm up to the last global max
 + 
*/

var getRainWater = (heights) => {

    var maxs = [[ heights[0],0 ]];
    var rw = 0;    // rain water accumulator

    for ( var i = 1; i < heights.length; i++ ) {
        const h = heights[i];
        const [pmax, pmaxi] = maxs[maxs.length-1];
        if ( h >= pmax ) {

            // calculate rain water
            const rwmh = Math.min(h, pmax); // rain water max height
            for ( var j = pmaxi+1; j < i; j++ )
                rw += rwmh - heights[j];

            // update maxs. no longer care about anything before
            maxs = [[h, i]];
        }
    }
    return rw;
};

var trw = (heights) => {

    // find last global max
    var indexOfLastGlobalMax = null;
    var lastGlobalMax = 0;
    for ( var i = heights.length-1; i >=0; i-- ) {
        const h = heights[i];
        if ( h > lastGlobalMax ) {
            indexOfLastGlobalMax = i;
            lastGlobalMax = h;
        }
    }

    return getRainWater( heights.slice(0, indexOfLastGlobalMax+1) )
        + getRainWater( heights.slice(indexOfLastGlobalMax).reverse() );
};


//
// tests

const inputExpectedPairs = [
    [[[0,1,0,2,1,0,1,3,2,1,2,1]], 6],
    [[[4,2,0,3,2,5]], 9]
];

module.exports = {
    f: trw,
    inputExpectedPairs,
    name: '42 - trapping rain water'
};
