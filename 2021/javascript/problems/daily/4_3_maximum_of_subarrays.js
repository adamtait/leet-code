/**
 * Given an array of integers and a number k, where 1 <= k <=
 * array.length, compute the maximum values of each subarray of length
 * k.
 * 
 * Runtime must be O(n)
 */

var pushToMaxQ = (mq, v) => {
    return mq.concat([v]).sort((a,b) => a - b);
};

var popFromMaxQ = (mq, v) => {
    // already sorted
    const i = mq.indexOf(v)
    return mq.slice(0,i).concat( mq.slice(i+1) );
};


var maximumOfSubarrays = (a, k) => {
    var rs = [];
    var mq = [];

    for ( var i = 0; i < k; i++ )
        mq = pushToMaxQ(mq, a[i]);

    console.log(mq);

    rs.push( mq[mq.length-1] );
    
    for ( var i = k; i < a.length; i++ ) {
        mq = popFromMaxQ(mq, a[i - k]);
        mq = pushToMaxQ(mq, a[i]);
        console.log(mq);
        rs.push( mq[mq.length-1] );
    }
    
    return rs;
};


//
// tests

const inputExpectedPairs = [
    [[[1,2,3], 2], [2,3]],
    [[[10,5,2,7,8,7], 3], [10,7,8,8]],
];

module.exports = {
    f: maximumOfSubarrays,
    inputExpectedPairs,
    name: '4.3 (book) - find maximum of subarrays'
};
