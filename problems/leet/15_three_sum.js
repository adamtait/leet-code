/**
 * Given an integer array nums, return all the triplets [nums[i],
 * nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i]
 * + nums[j] + nums[k] == 0.
 *
 * Notice that the solution set must not contain duplicate triplets.
 */

const powerset = arr =>
      arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

const compare = (a,b) => {
    const aa = a.sort();
    const bb = b.sort();
    var r = true;
    for ( var i in aa ) {
        r = r && aa[i] === bb[i];
    }
    return r;
};

var threeSum = function(nums) {
    const r = powerset(nums)
          .filter(a => a.length === 3)
          .filter(([a,b,c]) => a + b + c === 0);
    const rs = [];
    for ( var i in r ) {
        var dup = false;
        for ( var j in rs ) {
            if ( i === j ) continue;
            dup = dup || compare(r[i], rs[j]);
        }
        if ( ! dup ) rs.push(r[i]);
    }
    console.log(rs);
    return rs;
};

const inputExpectedPairs = [
    [[[]], []],
    [[[0]], []],
    [[[-1,0,1,2,-1,-4]], [[-1,-1,2],[-1,0,1]]],
];


module.exports = {
    f: threeSum,
    inputExpectedPairs,
    name: '15 - 3Sum'
};
