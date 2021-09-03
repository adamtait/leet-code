/**
 * url: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 *
 * You are given an array prices where prices[i] is the price of a
 * given stock on the ith day.
 *
 * You want to maximize your profit by choosing a single day to buy
 * one stock and choosing a different day in the future to sell that
 * stock.
 *
 * Return the maximum profit you can achieve from this transaction. If
 * you cannot achieve any profit, return 0.
 */


/**
 * @param {number[]} prices
 * @return {number}
 */

// thoughts

// 1st possible solution
// + only forward progress is allowed
// + track min value in array
// + track max value in array, where i > i(min)

// 2nd possible solution
// + find N min values
// + find M max values
// + walk through min/max values until index(min) < index(max)

// 3rd possible solution
// + walk through ordered prices
//   + for each
//     + find highest price in rest of prices
//     + take difference. store this value if greater than max so far
// O( n^2 )

var maxProfit = function (prices) {

    var maxDiff = 0;
    for ( var i = 0; i < prices.length -1; i++ ) {
        var max = 0;
        for ( var j = i + 1; j < prices.length; j++ ) {
            max = Math.max(max, prices[j]);
        }
        const diff = max - prices[i];
        maxDiff = Math.max(diff, maxDiff);
    }
    return maxDiff;
};


// 4th possible solution
// I think that the 2nd possible solution would have a lower time
// complexity
// O( n )


var maxProfit = function (prices) {

    var minAt = [];
    var maxFrom = [];
    
    for ( var i = 0; i < prices.length -1; i++ ) {
        
        const mini = minAt[ minAt.length -1 ];
        if ( mini === undefined || prices[mini] > prices[i] )
            minAt.push(i);
        else minAt.push(mini);

        const mi = prices.length - i - 1;
        const maxi = maxFrom[ 0 ];
        if ( maxi === undefined || prices[maxi] < prices[mi] )
            maxFrom.unshift(mi);
        else maxFrom.unshift(maxi);
    }

    var maxDiff = 0;
    var mini = minAt.pop(), maxi = maxFrom.pop();
    while ( mini < maxi ) {
        maxDiff = Math.max( maxDiff, prices[maxi] - prices[mini] );
        mini = minAt.pop();
        maxi = maxFrom.pop();
    }
    
    return maxDiff;
};


//
// tests

const inputExpectedPairs = [
    [[[7,1,5,3,6,4]], 5],
    [[[7,6,4,3,1]], 0]
];

module.exports = {
    f: maxProfit,
    inputExpectedPairs,
    name: '121 - best time to buy and sell stock'
};
