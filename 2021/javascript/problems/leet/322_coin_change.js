
const { newStackPrinter }  = require('../../lib/debug');

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
 * @param {number[]} coinsn
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

// challenge: solution with primarily larger coins that uses more
// coins
// maybe we can do some math to check if there is another possible
// solution?

var coinChange = function(coins, amount) {

    if ( amount < 0 ) return -1;
    if ( amount === 0 ) return 0;

    const cs = coins
          .sort((a,b) => b - a)
          .filter(c => c <= amount);
    var mvc = -1;
    for (const i in cs) {
        const coin = cs[i];
        
        // if another solution is *not* possible
        if ( mvc > 0 && (amount / coin) > mvc ) break;
        
        const nc = coinChange(cs, amount - coin) + 1;
        if ( nc > 0 )
            if ( mvc < 0 || nc < mvc )
                mvc = nc;
    }
    return mvc;
};


//
// 2nd attempt
//   memoization ala CTCI 8.11

var memo = [];

var recurDebuggable = (coins, amount, l = newStackPrinter() ) => {

    //l.log('start ' + JSON.stringify(coins) + ' ' + amount);
    
    if ( amount < 0 ) return -1;
    if ( amount === 0 ) return 0;
    if ( coins.length <= 0 ) return -1;
    
    if ( memo[coins.length] && memo[coins.length][amount] ) {
        //l.log('return memo: ' + JSON.stringify(memo[coins.length][amount]));
        return memo[coins.length][amount];
    }

    const coin = coins[0];
    
    var minComboLength = -1;
    var limit = Math.floor( amount / coin );
    for ( var i = 0; i <= limit; i++ ) {
        const newAmount = amount - (coin * i);
        //l.log(coin + ' * ' + i);
        //l.down();
        const r = recur( coins.slice(1), newAmount, l );
        //l.up();
        if ( r > -1 ) {
            const newMin = i + r;
            if ( minComboLength < 1 ) minComboLength = newMin;
            minComboLength = Math.min(minComboLength, newMin);
            //l.log('new min: ' + minComboLength);
        }
    }

    if ( ! memo[coins.length] ) memo[coins.length] = [];
    memo[coins.length][amount] = minComboLength;

    //l.log(JSON.stringify(minComboLength));
    //l.log('---');
    
    return minComboLength;
};

var recur = (coins, amount ) => {

    if ( amount < 0 ) return -1;
    if ( amount === 0 ) return 0;
    if ( coins.length <= 0 ) return -1;
    
    if ( memo[coins.length] && memo[coins.length][amount] ) {
        return memo[coins.length][amount];
    }

    const coin = coins[0];
    
    var minComboLength = -1;
    var limit = Math.floor( amount / coin );
    for ( var i = 0; i <= limit; i++ ) {
        const newAmount = amount - (coin * i);
        const r = recur( coins.slice(1), newAmount );
        if ( r > -1 ) {
            const newMin = i + r;
            if ( minComboLength < 1 ) minComboLength = newMin;
            minComboLength = Math.min(minComboLength, newMin);
        }
    }

    if ( ! memo[coins.length] ) memo[coins.length] = [];
    memo[coins.length][amount] = minComboLength;
    
    return minComboLength;
};

var coinChange = (coins, amount) => {
    memo = [];
    const coinsSortedDesc = coins.sort((a,b) => b - a);
    return recur(coinsSortedDesc, amount);
};


//
// tests

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
