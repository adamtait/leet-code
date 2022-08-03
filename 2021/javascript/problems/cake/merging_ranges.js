
/**
 * url: https://www.interviewcake.com/question/javascript/merging-ranges
 *
 * Your company built an in-house calendar tool called HiCal. You
 * want to add a feature to see the times in a day when everyone is
 * available.
 *
 * To do this, you’ll need to know when any team is having a meeting.
 * In HiCal, a meeting is stored as objects ↴ with integer properties
 * startTime and endTime. These integers represent the number of
 * 30-minute blocks past 9:00am.
 */

var pairToMap = ([startTime, endTime]) => {
    return { startTime, endTime };
};

var mapToPair = ({ startTime, endTime }) => {
    return [startTime, endTime];
};

var isNull = (v) => v === null || v === undefined;

var mergeRanges = (ranges) => {

    // set overlapping indexes
    var ts = [];
    for ( const { startTime, endTime } of ranges ) {
        ts[startTime] = 'start';
        for ( var i = startTime+1; i < endTime; i++ )
            ts[i] = true;
        ts[endTime] = 'end';
    }

    // rebuild ranges
    var mrs = [];
    var i = 0;
    while ( i < ts.length ) {
        while ( i < ts.length && ts[i] !== 'start' )
            i++;
        var startTime = i; i++;
        while ( i < ts.length && ! isNull(ts[i]) )
            i++;
        var endTime = i-1; i++;
        mrs.push({ startTime, endTime });
    }
    
    return mrs;
};


//
// solution 2
// use a stack/map to merge overlaps
// time: O(2n) = O(n)
// space: O(2n) = O(n)

var id = 0;

var rangeToEventReducer = (a, { startTime, endTime }) => {
    const i = id++;
    return [ ...a,
             [startTime, id, true],
             [endTime, id, false]
           ];
};

var mergeRanges = (ranges) => {

    // split ranges into separate start, end events. assign unique id's
    // sort events
    id = 0;
    const rs = ranges
          .reduce(rangeToEventReducer, [])
          .sort(([at, ...a], [bt, ...b]) => at - bt);

    // iterate through events
    var r = [], currentStartTime = null, active = {};
    for ( var i = 0; i < rs.length; i++ ) {
        const [t, id, action] = rs[i];

        // if active is empty?, then set new currentStartTime
        if ( Object.keys(active).length === 0 ) {
            const lastRange = r[r.length-1];
            const lastEndTime = lastRange ? lastRange.endTime : null;
            
            // if next range starts at the same time as last range ended...
            if ( lastEndTime && lastEndTime === t ) {
                // start back at the beginning of the last range
                currentStartTime = lastRange.startTime;
                r.pop(); // remove the last range
            }
            else currentStartTime = t;
        }
        
        // accumulate start events, remove end events
        if ( action ) active[id] = t;
        else delete active[id];

        // if remove makes stack/map empty?, then complete current range
        if ( Object.keys(active).length === 0 ) {
            
            r.push({ startTime: currentStartTime,
                     endTime: t });
            currentStartTime = null;
        }
    }
    return r;
};


/*
  Accepted solution
  + sort ranges by startTime
  + accumulate merged ranges
  + if cur.startTime <= lastMerged.endTime, then lastMerged.endTime = max(cur.endTime, lastMerged.endTime)
  + else add cur to lastMerged list
*/


//
// test

const wrap = (arrs) => {
    const input = arrs.map(pairToMap);
    const mrs = mergeRanges( input );
    return mrs.map(mapToPair);
};

const inputExpectedPairs = [
    [[[[2,3],[6,9]]], [[2,3],[6,9]]],
    [[[[0,1],[3,5],[4,8],[10,12],[9,10]]], [[0,1],[3,8],[9,12]]],
    [[[[1,2],[2,3]]], [[1,3]]],
    [[[[1,5],[2,3]]], [[1,5]]],
    [[[[1,10],[2,6],[3,5],[7,9]]], [[1,10]]]
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: 'merging ranges'
};

