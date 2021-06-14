const { test } = require('./test');

const p3 = require('./problems/3_longest_substring');

const assoc = (o, k, v) => {
    var no = Object.assign({}, o);
    no[k] = v;
    return no;
};

const all = () => [p3].reduce(
    (acc, { f, inputExpectedPairs, name }) => {
        const rs = inputExpectedPairs
              .reduce((results, pair) => results.concat([test(f, pair)]), [])
              .map((r) => assoc(r, 'name', name));
        return acc.concat( rs );
    }, []
);


module.exports = { all };
