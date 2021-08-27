/**
 * url: https://leetcode.com/problems/insert-interval/
 *
 * You are given an array of non-overlapping intervals intervals where
 * intervals[i] = [starti, endi] represent the start and the end of
 * the ith interval and intervals is sorted in ascending order by
 * starti. You are also given an interval newInterval = [start, end]
 * that represents the start and end of another interval.
 *
 * Insert newInterval into intervals such that intervals is still
 * sorted in ascending order by starti and intervals still does not
 * have any overlapping intervals (merge overlapping intervals if
 * necessary).
 *
 * Return intervals after the insertion.
 */


var create = ([as,ae], [bs,be]) => {
    return [ Math.min(as,bs), Math.max(ae,be) ];
};


/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

// ascending order
// non-overlapping

var insert = function (intervals, newInterval) {

    const [start, end] = newInterval;
    var nis = [];
    var overlapBeganIndex = null;
    var complete = false;

    for ( const i in intervals ) {
        const cur = intervals[i];
        const [cs, ce] = cur;

        if ( complete ) nis.push( cur );
        
        else if ( end < cs ) {
            // fully less than
            if ( overlapBeganIndex ) 
                nis.push( create( intervals[overlapBeganIndex], newInterval ) );
            else nis.push( newInterval );
            nis.push( cur );
            complete = true;
        }
        else if ( start < cs && end < ce ) {
            // left eclipse
            if ( overlapBeganIndex ) 
                nis.push( create( create( intervals[overlapBeganIndex], newInterval ), cur ) );
            else nis.push( create( newInterval, cur ) );
            complete = true;
        }
        else if ( end < ce ) {
            // full eclipse
            if ( overlapBeganIndex ) 
                nis.push( create( intervals[overlapBeganIndex], cur ) );
            else nis.push( cur );
            complete = true;
        }
        else if ( start <= ce ) {
            if ( ! overlapBeganIndex )
                overlapBeganIndex = i;
        }
        else {
            nis.push( cur );
        }
    }

    if ( ! complete ) {
        if ( overlapBeganIndex ) 
            nis.push( create( intervals[overlapBeganIndex], newInterval ) );
        else nis.push( newInterval );
    }

    return nis;
};



//
// tests

const inputExpectedPairs = [
    [ [ [], [5,7] ], [[5,7]] ],
    [ [ [[1,5]], [0,5] ], [[0,5]] ],
    [ [ [[1,5]], [2,3] ], [[1,5]] ],
    [ [ [[1,3],[6,9]], [2,5] ],
      [[1,5],[6,9]] ],
    [ [ [[1,5]], [2,7] ], [[1,7]] ],
    [ [ [[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8] ],
      [[1,2],[3,10],[12,16]] ],
    [ [ [[2,7],[8,8],[10,10],[12,13],[16,19]], [9,17] ],
      [[2,7],[8,8],[9,19]] ]
];

module.exports = {
    f: insert,
    inputExpectedPairs,
    name: '57 - insert interval'
};
