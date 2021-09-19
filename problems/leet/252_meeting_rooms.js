/*
 * url: https://leetcode.com/problems/meeting-rooms/
 *
 * Given an array of meeting time intervals where intervals[i] =
 * [starti, endi], determine if a person could attend all meetings.
 */

/*
 + sounds like a "search for overlaps" problem
 + question: would a meeting ending & starting at the same time overlap?
   + assumption: no
 
solution 1
+ brute force
+ compare each interval to every other interval
  + if overlap, return false

solution 2
+ sort on starti
+ walk through until found overlap
+ time:  O(n * log(n))
+ space: O(n)

problem is supposed to be easy, so I think solution 2 is good enough

*/


// [2,4], [7,10]
// [[8,11],[17,20],[17,20]]

var overlap = ([starta, enda], [startb, endb]) => {
    if ( starta <= startb && enda > startb )
        return true;
    return false;
};



/**
 * @param {number[][]} intervals
 * @return {boolean}
 */

var canAttendMeetings = function ( intervals ) {
    const sorted = intervals.sort(([a, ae], [b, be]) => a - b);
    for ( var i = 0; i < sorted.length - 1; i++ ) {
        if ( overlap( sorted[i], sorted[i+1] ) )
            return false;
    }
    return true;
};


//
// test

const inputExpectedPairs = [
    [[[[0,30],[5,10],[15,20]]], false],
    [[[[7,10],[2,4]]], true],
    [[[[8,11],[17,20],[17,20]]], false]
];

module.exports = {
    f: countDistinctTriangles,
    inputExpectedPairs,
    name: '252 [easy] - meetings rooms'
};
