/**
 * Given two sorted arrays nums1 and nums2 of size m and n
 * respectively, return the median of the two sorted arrays.
 *
 * The overall run time complexity should be O(log (m+n)).
 */

const first = (nums) => nums[0];
const last = (nums) => nums[nums.length -1];

const median = (nums) => {
    const sum = nums.reduce((a, n) => a + n, 0);
    return sum / nums.length;
};

const middle = (nums) => {
    const hl = nums.length / 2;
    if ( nums.length % 2 === 0 )
        return [ nums[ hl - 1 ], nums[ hl ] ];
    return [nums[ Math.floor(hl) ]];
};

const indexOfN = (nums, n) => {

    if ( nums.length === 0 ) return 0;
    if ( nums.length === 1 ) {
        if ( nums[0] < n ) return 1;
        return 0;
    }
        
    const mns = middle(nums);
    if ( n < first(mns) ) {
        const i = Math.floor(nums.length / 2);
        return indexOfN( nums.slice(0, i), n);
    }
    if ( n > last(mns) ) {
        // TODO reverse translation of indexes
        const i = Math.ceil(nums.length / 2);
        const r = indexOfN( nums.slice(i), n);
        return r + i;
    }
    return Math.floor(nums.length / 2);
};


const findMedianSortedArrays = (nums1, nums2) => {
    // assumes that nums1 & nums2 are already sorted
    
    if ( last(nums1) < first(nums2) ) {
        if ( nums1.length === nums2.length )
            return median([last(nums1), first(nums2)]);
        if ( nums1.length > nums2.length ) return last(nums1);
        return first(nums2);
    }

    if ( last(nums2) < first(nums1) ) {
        if ( nums1.length === nums2.length )
            return median([last(nums2), first(nums1)]);
        if ( nums2.length > nums1.length ) return last(nums2);
        return first(nums1);
    }

    // else => overlap
    
    const middle1 = middle(nums1);
    const middle2 = middle(nums2);
    
    

    
};


//
// testing

const inputExpectedPairs = [
    [[[1,3],[2]], 2],
    [[[1,2],[3,4]], 2.5],
    [[[0,0],[0,0]], 0],
    [[[],[1]], 1],
    [[[2],[]], 2],
    [[[8,9,10],[1,2,3]], 5.5],
    [[[1,2,3],[8,9,10]], 5.5],
    [[[1],[1]], 1],
    [[[1,3,5,7,9],[0,2,4,6,8]], 5]  // this case would be O(m+n)
];

module.exports = {
    f: twoSum,
    inputExpectedPairs,
    name: '1 - two sum'
};
