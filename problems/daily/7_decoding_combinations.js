/**
 * Given the mapping a = 1, b = 2, ... z = 26, and an encoded message,
 * count the number of ways it can be decoded.
 *
 * For example, the message '111' would give 3, since it could be
 * decoded as 'aaa', 'ka', and 'ak'.
 *
 * You can assume that the messages are decodable. For example, '001'
 * is not allowed.
 */

/**
 * let's tackle recursively. iteratively, it would be difficult to
 * account for the overlaps.
 */

const combinations = (s) => {
    if ( s.length === 0 ) return [[]];
    if ( s.length === 1 ) return [[s], []];
    if ( s.length === 2 ) return [[], [s[0]], [s[1]], [s[0], s[1]]];
    return combinations(s.slice(1))
        .reduce(
            (a, cs) => a.concat([cs.concat(s[0])]), [[]]);
};


const decodingCombinations = (msg) => {

    if ( msg.length === 0 ) return 0;
    
    const c = msg[0];
    if ( c === '0' || Number(c) === NaN )
        return null;
    
    const rcs = decodingCombinations(msg.slice(1));
    if ( rcs === null ) return rcs;
    if ( rcs === 0 ) return 1 + rcs;
    
    if ( c === '1' )
        return 1 + rcs;
    if ( c === '2' && Number(msg[1]) < 7 )
        return 1 + rcs;
    return rcs;
};


//
// 2nd attempt

var memo = {};

const recur = (s) => {

    const useMemo = (ss) => {
        if (memo[ss]) return memo[ss];
        const v = recur(ss);
        memo[ss] = v;
        return v;
    };
    
    if ( s.length <= 1 ) return 1;

    var total = 0;
    const n = Number( s.slice(0,2) );
    if ( n <= 26 ) {
        total = total + useMemo( s.slice(2) );
    }
    if ( n !== 10 && n !== 20 ) {  // skip 10, 20
        total = total + useMemo( s.slice(1) );
    }
    return total;
};

const decodingCombinations2 = (msg) => {

    if ( msg[0] === '0' ) return null;
    memo = {};  // reset memo
    return recur(msg);
};


//
// 3rd attempt
//  dynamic programming
//  https://www.dailycodingproblem.com/solution/7

const decodingCombinations3 = (msg) => {
    
    if ( msg[0] === '0' ) return null;
    var cache = [];
    cache[msg.length] = 1;

    for ( var i = msg.length - 1; i >= 0; i-- ) {

        const c = msg[i];

        if ( c === '0' )    cache[i] = 0;
        else if ( i === msg.length - 1 )  cache[i] = 1;
        else {
            if ( Number( msg.slice(i, i+2) ) <= 26 )
                cache[i] = cache[i+2];
            cache[i] = cache[i] + cache[i+1];
        }
    }
    return cache[0];
};


//
// tests

const inputExpectedPairs = [
    [['0'], null],
    [['01'], null],
    [['101'], 1],
    [['1010'], 1],
    [['1020'], 1],
    [['1'], 1],
    [['11'], 2],
    [['111'], 3],
];

module.exports = {
    f: decodingCombinations3,
    inputExpectedPairs,
    name: '7 [medium] - decoding combinations'
};
