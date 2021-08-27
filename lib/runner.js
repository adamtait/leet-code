
const { assoc, groupBy } = require('./functional');
const { test } = require('./test');

const all = (problems) => {
    return problems
        .reduce(
            (acc, { f, inputExpectedPairs, name }) => {
                const rs = inputExpectedPairs
                      .reduce((results, pair) => results.concat([test(f, pair)]), [])
                      .map((r) => assoc(r, 'name', name));
                return acc.concat( rs );
            }, []
        );
};

const testsAll = (problems) => {
    console.log(
        groupBy((r) => r.name, all(problems))
    );
};

const testsFailed = (problems) => {
    const fts = all(problems).filter((r) => ! r.result );
    console.log(
        groupBy((r) => r.name, fts)
    );
};

module.exports = { all, testsAll, testsFailed };
