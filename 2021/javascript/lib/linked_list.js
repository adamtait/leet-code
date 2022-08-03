
function ListNode (val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var arrayToLinkedList = (a) => {
    if ( a.length === 0 ) return null;
    var head = new ListNode(a[0]);
    var tail = head;
    
    for ( var i = 1; i < a.length; i++ ) {
        tail.next = new ListNode( a[i] );
        tail = tail.next;
    }
    return head;
};

var linkedListToArray = (ln) => {
    var a = [];
    var tail = ln;
    while ( tail && tail.next )  {
        a.push( tail.val );
        tail = tail.next;
    }
    if ( tail ) a.push( tail.val );
    return a;
};

module.exports = {
    arrayToLinkedList,
    linkedListToArray,
    ListNode
};
