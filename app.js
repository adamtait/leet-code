const { test } = require('./test');
const p1 = require('./problems/1_two_sum');
//const p2 = require('./problems/2_add_two_numbers');
const p3 = require('./problems/3_longest_substring');
const p5 = require('./problems/5_longest_palindromic_string');

const problems = [p1, p3, p5];


//
// helpers

const assoc = (o, k, v) => {
    var no = Object.assign({}, o);
    no[k] = v;
    return no;
};

const groupBy = (f, arr) => {
    if ( typeof f !== 'function' )
        throw 'Input [first] must be function';

    if ( ! Array.isArray(arr) )
        throw 'Input [second] must be Array';

    return arr.reduce(
        (acc, a) => {
            const k = f(a);
            const cv = acc[k];
            const nv = cv === undefined ? [a] : cv.concat([a]);
            return assoc(acc, k, nv);
        }, {}
    );
    
};



//
// test

const all = () => problems.reduce(
    (acc, { f, inputExpectedPairs, name }) => {
        const rs = inputExpectedPairs
              .reduce((results, pair) => results.concat([test(f, pair)]), [])
              .map((r) => assoc(r, 'name', name));
        return acc.concat( rs );
    }, []
);

const testsAll = () => {
    console.log(
        groupBy((r) => r.name, all())
    );
};

const testsFailed = () => {
    const fts = all().filter((r) => ! r.result );
    console.log(
        groupBy((r) => r.name, fts)
    );
};

module.exports = { all, testsAll, testsFailed };
