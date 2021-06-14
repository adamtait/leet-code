/**
 * Definition for singly-linked list.
 */ 
function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val);
     this.next = (next===undefined ? null : next);
 }

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const arrayToListNodes = (a) => {
  return a.reduceRight(
    (acc, v) => new ListNode(v, acc), null
  );
};

const printList = (l) => {
  var m = l; var s = '[';
  while(m) {
    s = s + m.val;
    m = m.next;
    if (m) s = s + ',';
  }
  console.log(s + ']');
}

const reverseList = (l) => {
  var m = l; var r = null;
  while(m) {
    r = new ListNode(m.val, r);
    m = m.next;
  }
  return r;
};

const addTwoNumbers = (l1, l2) => {
  var r = null; var a = l1; var b = l2;
  var carry = 0;
  while( a || b || carry > 0 ) {
    const na = a ? a.val : 0;
    const nb = b ? b.val : 0;
    const n = na + nb + carry;
    const m = n % 10;
    console.log(m);
    carry = Math.floor(n / 10);
    r = new ListNode(m, r);
    a = a ? a.next : null;
    b = b ? b.next : null;
  }
  return reverseList(r);
};

//addTwoNumbers([2,4,3], [5,6,4]); // => 807
//addTwoNumbers([0], [0]); // => 0
//addTwoNumbers([9,9,9,9,9,9], [9,9,9]); // => 0



//
// testing

// TODO need to write equality for singly linked list

const inputExpectedPairs = [
    [[[2,4,3], [5,6,4]], [8,0,7]],
    [[[0], [0]], [0]],
    [[[9,9,9,9,9],[9,9,9]], [1,0,0,9,9,8]]
];

module.exports = {
    f: addTwoNumbers,
    inputExpectedPairs,
    name: '2 - add two numbers (as singly linked lists)'
};
