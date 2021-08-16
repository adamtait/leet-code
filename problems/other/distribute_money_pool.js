


// pool of money
// distribute to many employees
// evenly
// given each person, require a certain amount
//   -> salary/bonus
// 

// input: amounts owed (in cents), total money pool size
// output: amounts paid

// 
// ok if total is > 0 after distribution




//const sumGreaterThanTotalOld = () => {
//    const numEmployees = Object.keys(amountByEmployeeId).length;
//    const avg = Math.floor( total / numEmployees );
//    const leftover = total = ( numEmployees * avg );
    
//    const employeesLessThanAvg = amountByEmployeeId.reduce(
//        (a, k) => {
//            const v = amountByEmployeeId[k]
//            if ( v < avg )
//                return a[k] = v;
//            return a;
//        }, {}
//    );
//    
//    const sumOfEmpLessThanAvg = sumOfAmountByEmployeeId(employeesLessThanAvg);
//    const remainingAfterLessThanAvg = total + leftover + sumOfEmpLessThanAvg;
//    const biggerAvg = avg + (remainingAfterLessThanAvg / (numEmployees - Object.keys(employeesLessThanAvg).length) );  
//};


const sumOfAmountByEmployeeId = (amountByEmployeeId) => {
    return amountByEmployeeId.reduce((a,[_, amt]) => a + amt, 0);
}

// amountByEmployeeId => [[employeeId amount] ...]

const distributeMoney = (amountByEmployeeId, total) => {
    const sum = sumOfAmountByEmployeeId(amountByEmployeeId);
    if (sum <= total) return amountByEmployeeId;
    
    // sum > total
    const employees = amountByEmployeeId.sort(([_k1, amt1],[_k2, amt2]) => amt1 - amt2);
    
    var remTotal = total;
    var amountsAssigned = [];
    for (const i in employees) {
        const [eid, amt] = employees[i];
        const avg = Math.floor( remTotal / ( Object.keys(employees).length - i ));
        if ( amt < avg ) {
            amountsAssigned.push([eid, amt]);
            remTotal = remTotal - amt;
        } else {    
            amountsAssigned.push([eid, avg]);
            remTotal = remTotal - avg;
        }
    }
    
    // TODO handle remTotal > 0
    
    return amountsAssigned;
};


const test = (input, amt) => {
    const r = distributeMoney(input, amt);
    console.log(input + " " + amt);
    console.log(r);
    const s = sumOfAmountByEmployeeId(r);
    console.log( s + 2 > amt );
    console.log();
};

const ex = [
    ["1", 100],
    ["2", 50],
    ["3", 20]
];
//console.log( distributeMoney(ex, 200) );
//console.log( distributeMoney(ex, 170) );
//console.log( distributeMoney(ex, 169) );  // 3
//console.log( distributeMoney(ex, 100) );  // 4
test(ex, 100);

console.log( distributeMoney(
    [['d', 500], ['c', 10], ['a', 20], ['b', 1337]],
    1001
))
