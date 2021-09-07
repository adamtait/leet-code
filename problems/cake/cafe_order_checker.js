/**
 * url: https://www.interviewcake.com/question/javascript/cafe-order-checker
 *
 * My cake shop is so popular, I'm adding some tables and hiring wait
 * staff so folks can have a cute sit-down cake-eating experience.
 *
 * I have two registers: one for take-out orders, and the other for
 * the other folks eating inside the cafe. All the customer orders get
 * combined into one list for the kitchen, where they should be
 * handled first-come, first-served.
 *
 * Recently, some customers have been complaining that people who
 * placed orders after them are getting their food first. Yikes—that's
 * not good for business!
 *
 * To investigate their claims, one afternoon I sat behind the
 * registers with my laptop and recorded: 
 *
 * 1. The take-out orders as they were entered into the system and
 * given to the kitchen. (takeOutOrders)
 *
 * 2. The dine-in orders as they were entered into the system and
 * given to the kitchen. (dineInOrders)
 *
 * 3. Each customer order (from either register) as it was finished by
 * the kitchen. (servedOrders)
 *
 * Given all three arrays, write a function to check that my service
 * is first-come, first-served. All food should come out in the same
 * order customers requested it.
 *
 * We'll represent each customer order as a unique integer. 
 */

/** Thoughts
 + should be able to iterate through servedOrders in O(n) time
 + edge cases?
   + missing orders
     + assume illegal
   + servedOrders value not in either [takeOutOrders, dineInOrders]
     + in real life, should probably be skipped
     + assume illegal

 solution 1:
 + keep an index [j,k] to each of [takeOutOrders, dineInOrders]
 + if servedOrders[i] not takeOutOrders[j] || dineInOrders[k]
   + => invalid order
 + space: O(1)

 solution 2:
 + time: O(2*n)
 + iterate through each servedOrders 
   + checking order of [takeOutOrders, dineInOrders]
   + do each one at a time
 + code would be slightly less complex
   + only need to make a single array & iterator/index at a time
*/


var checker = (a,b,o) => {

    var j = 0, k = 0;
    for ( var i = 0; i < o.length; i++ ) {
        if ( j >= a.length || k >= b.length )
            return false;
        const n = o[i], ao = a[j], bo = b[k];
        if ( n === ao ) j++;
        else if ( n === bo ) k++;
        else return false;
    }
    return true;
};


//
// test

const inputExpectedPairs = [
    [[[1,3], [2,4], [1,2,3,4]], true],
    [[[1,3], [2,4], [1,2,4,3]], true],
    [[[1,3], [2,4], [1,3,2,4]], true],
    [[[1,3], [2,4], [2,4,1,3]], true],
    [[[1,3], [2,4], [3,1,2,4]], false],
    [[[1,3], [2,4], [1,3,4,2]], false],
    [[[1,3], [2,4], [4,1,3,2]], false],
    [[[1, 3, 5], [2, 4, 6], [1, 2, 4, 6, 5, 3]], false],
    [[[17, 8, 24], [12, 19, 2], [17, 8, 12, 19, 24, 2]], true]
];

module.exports = {
    f: checker,
    inputExpectedPairs,
    name: 'cafe order checker'
};
