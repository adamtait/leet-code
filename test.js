

const areEqual = (a,b) => {
    const t = typeof a; const tb = typeof b;
    if ( t !== tb ) return false;
    if ( t === 'number' ) return a === b;
    if ( t === 'string' ) return a === b;
    if ( Array.isArray(a) && ! Array.isArray(b) ) return false;
    if ( ! Array.isArray(a) && Array.isArray(b) ) return false;
    if ( Array.isArray(a) && Array.isArray(b) )
        return a.length === b.length
        && a.every((e,i) => areEqual(e, b[i]));

    if ( t !== 'object' )
        throw "Test equivalence checks do NOT support type [" + t + "]";

    // else, typeof === 'object'
    if ( Object.keys(a).length !== Object.keys(b).length ) return false;
    return areEqual( Object.entries(a).sort(),
                     Object.entries(b).sort() );
};

const test = (f, [input, expected]) => {
    const actual = f.apply(null, [input]);
    const result = areEqual(actual, expected);
    return { actual, expected, input, result };
};

module.exports = { areEqual, test };
