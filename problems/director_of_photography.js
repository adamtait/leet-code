/**
 * https://www.facebookrecruiting.com/portal/coding_puzzles/?puzzle=870874083549040
 * 
 * A photography set consists of N cells in a row, numbered from 1
 * to N in order, and can be represented by a string C of length
 * N. Each cell i is one of the following types (indicated by
 * C(i)​, the ith character of C):
 *
 * + If C(i)​ = “P”, it is allowed to contain a photographer
 * + If C(i)​ = “A”, it is allowed to contain an actor
 * + If C(i)​ = “B”, it is allowed to contain a backdrop
 * + If C(i)​ = “.”, it must be left empty
 * 
 * A photograph consists of a photographer, an actor, and a backdrop,
 * such that each of them is placed in a valid cell, and such that the
 * actor is between the photographer and the backdrop. Such a
 * photograph is considered artistic if the distance between the
 * photographer and the actor is between X and Y cells
 * (inclusive), and the distance between the actor and the backdrop is
 * also between X and Y cells (inclusive). The distance between
 * cells i and j is |i - j| (the absolute value of the
 * difference between their indices).
 *
 * Determine the number of different artistic photographs which could
 * potentially be taken at the set. Two photographs are considered
 * different if they involve a different photographer cell, actor
 * cell, and/or backdrop cell.
 */


/**
 * @param {number} N
 * @param {string} C
 * @param {number} X
 * @param {number} Y
 * @return {number}
 */

function getArtisticPhotographCount(N, C, X, Y) {

    const indexesOf = (s, c) => {
        var is = [];
        var ci = s.indexOf(c);
        while ( ci >= 0 ) {
            is.push(ci);
            ci = s.indexOf(c, ci +1);
        }
        return is;
    };
    
    const combos = (s) => {
        const ps = indexesOf(s, 'P');
        const as = indexesOf(s, 'A');
        const bs = indexesOf(s, 'B');
        var cs = [];
        for ( var pi in ps ) {
            const p = ps[pi];
            for ( var ai in as ) {
                // optimize here; if distance < X || distance > Y, then `continue`
                const a = as[ai];
                for ( var bi in bs ) {
                    const b = bs[bi];
                    if ( p < a && a < b )
                        cs.push([p,a,b]);
                    if ( b < a && a < p)
                        cs.push([p,a,b]);
                }
            }
        }
        return cs;
    };

    const isArtistic = ([p,a,b]) => {
        const ap = Math.abs(a - p);
        const ba = Math.abs(b - a);
        return ap >= X && ba >= X && ap <= Y && ba <= Y;
    };

    const cs = combos(C);
    return cs.filter(isArtistic).length;
}


const inputExpectedPairs = [
    [[5, 'APABA', 1, 2], 1],
    [[5, 'APABA', 2, 3], 0],
    [[8, '.PBAAP.B', 1, 3], 3],
    [[8, 'P.PBAAP.B', 1, 3], 3],
];


module.exports = {
    f: getArtisticPhotographCount,
    inputExpectedPairs,
    name: 'Facebook (L1) - Director of Photography'
};
