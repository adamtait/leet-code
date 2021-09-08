/*
 Problem: Given array of [birthYear, deathYear], find year with
 highest population (alive).
*/

/*
 solution 1
 + if input range sufficiently small, could build an array of counts
   + each index in array would correspond to year
   + ... but we don't know year range (wasn't in problem statement)
 
 solution 2
 + pairs
   + split pairs into separate birth, death 'events'
   + sort pairs by year
 
 + walk through pairs
   + collect 
     + current number of alive
     + max number of alive
 + time: O( n * log(n) ) [mostly, sorting]
 + space: O( n ) [mostly, events]
 + NOTE
   + there may (likely) be many years which equal the max
     + this algorithm only returns the first
     + could be modified to return all

*/

var pairToEvent = ([birth, death]) => [[birth, true], [death+1, false]];

var year = (pairs) => {
    const ps = pairs
          .flatMap(pairToEvent)
          .sort((a,b) => a[0] - b[0]);

    var max = 0, maxYear = 0;
    var cur = 0;
    for ( var i = 0; i < ps.length; i++ ) {
        const [year, action] = ps[i];
        if ( action ) cur++;
        else cur--;
        if ( cur > max ) {
            max = cur;
            maxYear = year;
        }
    }
    return maxYear;
};
