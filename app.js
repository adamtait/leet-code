const { test } = require('./test');

const p3 = require('./problems/3_longest_substring');

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

const all = () => [p3].reduce(
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
