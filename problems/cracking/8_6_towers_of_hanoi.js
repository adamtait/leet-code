/**
 * In the classic problem of the Towers of Hanoi, you have 3 towers
 * and N disks of different sizes which can slide onto any tower. The
 * puzzle starts with disks sorted in ascending order of size from top
 * to bottom (i.e. each disk sits on top of an even larger one). You
 * have the following constraints:
 * 1. Only one disk can be moved at a time.
 * 2. A disk is slid off the top of one tower onto another tower.
 * 3. A disk cannot be placed on top of a smaller disk.
 *
 * Write a program to move the disks from the first tower to the last
 * using Stacks.
 */

/**
 * Thoughts:
 * + recurrence relation >
 *   - 1 -> 3
 *     + move to 3
 *   - 2 -> 3
 *     + move 1 to 2
 *     + move 2 to 3 (use 2 as buffer)
 *     + move 1 to 3
 *   - 3 -> 3
 *     + move 1 to 3
 *     + move 2 to 2 (use 2 as buffer)
 *     + move 1 to 2
 *     + move 3 to 3
 *     + move 1 to 1 (use 1 as buffer)
 *     + move 2 to 3
 *     + move 1 to 3
 *   =
 *     + move [1,2] -> 2 (use 2 as buffer)
 *     + move 3 -> 3
 *     + move [1,2] -> 3 (use 1 as buffer)
 */

var range = (n, base = 0, ascending = true) => {

    var ns = [];
    var i = ascending ? base : n + base - 1;
    const end = ascending ? n + base : base - 1;
    const cont = () => ascending ? i < end : i > end;

    while ( cont() ) {
        ns.push(i);
        i = ascending ? i+1 : i-1;
    }
    return ns;
};


//
// 1st solution

var removeFromTowers = (towers, k) => {
    var found = false;
    for ( var i = 0; i < towers.length; i++ ) {
        const v = towers[i].pop();
        if ( v >= 0 && v !== k ) towers[i].push(v);
        if ( v === k ) found = true;
    }
    if ( ! found )
        throw 'ERROR: unable to find [' + k + '] in ' + JSON.stringify(towers);
    return towers;
};

var chooseBuffer = (a,b) => {
    return [0,1,2].filter(n => n !== a && n !== b)[0];
};


var recur = (towers, big, dest, buffer) => {

    //console.log('recur: ' + JSON.stringify(towers) + ' big: ' + big + ' dest: ' + dest + ' buffer: ' + buffer );
    
    if ( big === 0 ) {
        // move [0] to tower dest
        towers = removeFromTowers(towers, big);
        towers[dest].push(big);
        return towers;
    }
    
    // move lower numbers to buffer
    towers = recur(towers, big-1, buffer, dest);

    // move [big] to tower 'dest'
    towers = removeFromTowers(towers, big);
    towers[dest].push(big);

    // move lower numbers to 'dest'
    towers = recur(towers, big-1, dest, chooseBuffer(dest,buffer));
    return towers;
};


var moveTower = (n) => {
    var towers = [ range(n,0,false), [], [] ];
    return recur(towers, n - 1, 2, 1);
};


//
// test

const wrap = (n) => moveTower(n)[2];

const inputExpectedPairs = [
    [[1], [0]],
    [[2], [1,0]],
    [[3], [2,1,0]],
    [[5], [4,3,2,1,0]]
];

module.exports = {
    f: wrap,
    inputExpectedPairs,
    name: '8.6 - towers of hanoi'
};

