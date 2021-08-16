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

const inputExpectedPairs = [
    [['0'], null],
    [['01'], null],
    [['101'], null],
    [['1'], 1],
    [['11'], 2],
    [['111'], 3],
];


module.exports = {
    f: decodingCombinations,
    inputExpectedPairs,
    name: '7 [medium] - decoding combinations'
};
