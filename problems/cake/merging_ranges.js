
/**
 *  Your company built an in-house calendar tool called HiCal. You
 *  want to add a feature to see the times in a day when everyone is
 *  available.
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
        while ( i < ts.length && ts[i] !== 'start' ) i++;
        var startTime = i; i++;
        while ( i < ts.length
                && ( ts[i] !== 'end'
                     || ts[i+1] === true ))
                i++;
        var endTime = i; i++;
        mrs.push({ startTime, endTime });
    }
    
    return mrs;
};



//
// test

const wrap = (arrs) => {
    const input = arrs.map(pairToMap);
    const mrs = mergeRanges( input );
    return mrs.map(mapToPair);
};

const inputExpectedPairs = [
    [[[[2,3],[6,9]]], [[2,3],[6,9]]],
    [[[[0,1],[3,5],[4,8],[10,12],[9,10]]], [[0,1],[3,8],[9,12]]]
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: 'merging ranges'
};

