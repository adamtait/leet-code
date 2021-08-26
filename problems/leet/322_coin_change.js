/**
 * You are given an integer array coins representing coins of
 * different denominations and an integer amount representing a total
 * amount of money.
 *
 * Return the fewest number of coins that you need to make up that
 * amount. If that amount of money cannot be made up by any
 * combination of the coins, return -1.
 *
 * You may assume that you have an infinite number of each kind of
 * coin.
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

// could build every combination of each type of coin (adding up to
// the limit
// dynamic programming suggests that I should break this down into
// smaller problems
// this recursive solution is slow

// I should be able to use the fact that I know some coins are
// "bigger" than others to reduce the solution space

var coinChange = function(coins, amount) {

    if ( amount < 0 ) return -1;
    if ( amount === 0 ) return 0;

    const cs = coins.sort((a,b) => b - a);
    var mvc = -1;
    for (const i in cs) {
        const nc = coinChange(cs, amount - cs[i]) + 1;
        if ( nc > 0 ) {
            if ( mvc < 0 || nc < mvc ) {
                mvc = nc;
                break;
            }
        }
    }
    return mvc;
};

const inputExpectedPairs = [
    [[[1,2,5], 11], 3],
    [[[2], 3], -1],
    [[[1], 0], 0],
    [[[1], 1], 1],
    [[[1], 2], 2],
    [[[5], 3], -1],
    [[[1,2,3,4,5,6,7,8,9,10], 3], 1],
    [[[1,2,3,4,5,6,7,8,9,10], 101], 11],
    [[[1,2,3,4,5,6,7,8,9,10], 1001], 101],
    [[[186,419,83,408], 6249], 20]
]

module.exports = {
    f: coinChange,
    inputExpectedPairs,
    name: '322 - coin change'
};
