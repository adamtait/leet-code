
var twoSum = (nums, target) => {
    for (var i = 0; i < nums.length; i++) {
        for (var j = i + 1; j < nums.length; j++) {
            if ( nums[i] + nums[j] === target ) return [i, j];
        }
    }
};


//
// testing

const inputExpectedPairs = [
    [[[2,2], 4], [0,1]],
    [[[11,15,2,7], 9], [2,3]],
    [[[2,11,15,7],9], [0,3]]
];

module.exports = {
    f: twoSum,
    inputExpectedPairs,
    name: '1 - two sum'
};
