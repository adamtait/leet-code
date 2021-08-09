/**
 * A cafeteria table consists of a row of NNN seats, numbered from 111
 * to NNN from left to right. Social distancing guidelines require
 * that every diner be seated such that KKK seats their left and KKK
 * seats to their right (or all the remaining seats to that side if
 * there are fewer than KKK) remain empty.
 *
 * There are currently MMM diners seated at the table, the iiith of
 * whom is in seat SiS_iSi​. No two diners are sitting in the same
 * seat, and the social distancing guidelines are satisfied.
 *
 * Determine the maximum number of additional diners who can
 * potentially sit at the table without social distancing guidelines
 * being violated for any new or existing diners, assuming that the
 * existing diners cannot move and that the additional diners will
 * cooperate to maximize how many of them can sit down.
 */

/**
 * @param {number} N
 * @param {number} K
 * @param {number} M
 * @param {number[]} S
 * @return {number}
 */

function getMaxAdditionalDinersCount(N, K, M, S) {

    if ( K === 0 ) return N - M;
    if ( K >= N ) return 1;
    
    const s = S.sort((a,b) => a - b).concat([N + K + 1]);
    var ld = (K * -1) + 1;
    var c = 0;
    for ( var i in s ) {
        const d = s[i];
        const dd = d - ld - (2 * K);
        const dc = dd > K ? Math.ceil( dd / (K + 1) ) : 0;
        //console.log( d + ' ' + dd + ' ' + dc );
        if (dc > 0) c = c + dc;
        ld = d;
    }  
    return c;
    
}

const inputExpectedPairs = [
    [[1, 0, 0, []], 1],
    [[2, 1, 0, []], 1],
    [[2, 1, 1, [2]], 0],
    [[3, 1, 1, [1]], 1],
    [[10, 1, 2, [2,6]], 3],
    [[15, 2, 3, [11,6,14]], 1],
    [[10, 1, 0, []], 5],
    [[10, 3, 0, []], 3],
    [[10, 4, 0, []], 2],
    [[10, 9, 0, []], 1],
    [[10, 10, 0, []], 1],
    [[10, 4, 0, [2]], 1],
];


module.exports = {
    f: getMaxAdditionalDinersCount,
    inputExpectedPairs,
    name: 'Facebook (L1) - cafeteria'
};
