
/**
 * url: https://www.interviewcake.com/question/javascript/inflight-entertainment
 *
 * You've built an inflight entertainment system with on-demand movie
 * streaming.
 *
 * Users on longer flights like to start a second movie right when
 * their first one ends, but they complain that the plane usually
 * lands before they can see the ending. So you're building a feature
 * for choosing two movies whose total runtimes will equal the exact
 * flight length.
 * 
 * Write a function that takes an integer flightLength (in minutes)
 * and an array of integers movieLengths (in minutes) and returns a
 * boolean indicating whether there are two numbers in movieLengths
 * whose sum equals flightLength.
 *
 * When building your function:
 * 1. Assume your users will watch exactly two movies
 * 2. Don't make your users watch the same movie twice
 * 3. Optimize for runtime over memory
 *
 */

/** 
 Thoughts
 + I know that I need to use hashing or a hash table/map to solve this
   problem
   + just read about them in the course
 + users will only watch exactly 2 movies

 + edge cases
   + movieLengths empty
   + flightLength === 0 
   + flightLength negative (assume illegal)
   + movieLengths negative (assume illegal)

 solution 1:
 + store a hash map of movie times already seen
 + iterate through movieLengths
   + check hash map for complement ( flightLength - movieLength )
     + if exists, then return true
   + else, add movieLength to hash table/map
*/

var sum = (flightLength, movieLengths) => {

    var seen = {};
    for ( var i = 0; i < movieLengths.length; i++ ) {
        const l = movieLengths[i];
        const c = flightLength - l;
        if ( seen[c] ) return true;
        seen[l] = true;
    }
    return false;
};


//
// test

const inputExpectedPairs = [
    [[10, [1,2]], false],
    [[10, [4,6]], true],
];

module.exports = {
    f: sum,
    inputExpectedPairs,
    name: 'inflight entertainment movie time sum'
};
