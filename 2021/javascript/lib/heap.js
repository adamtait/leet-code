
const compareMax = (a,b) => a > b;
const compareMin = (a,b) => a < b;
const compare = (max = true) => max ? compareMax : compareMin;


//
// index helpers

const parent = (heap, i) => Math.floor( i / 2 );

const left = (heap, i) => {
    const j = 2 * i;
    return j < heap.length ? j : null;
};

const right = (heap, i) => {
    const j = (2 * i) + 1;
    return j < heap.length ? j : null;
};

const swap = (heap, i, j) => {
    const vi = heap[i];
    heap[i] = heap[j];
    heap[j] = vi;
    return heap;
};


//
// newHeap
// -> creates a new heap datastructure

const newHeap = () => [];


//
// heapify
//  float heap[i] down to it's correct position
//  maintains min/max heap property

const heapify = (heap, i, max = true) => {
    if ( heap.length === 0 ) return [v];
    if ( i >= heap.length ) return heap;
    
    const l = left(heap, i);
    const r = right(heap, i);
    var largest = null;

    if ( l && compare(max)(heap[l], heap[i]) )
        largest = l;
    else largest = i;

    if ( r && compare(max)(heap[r], heap[i]) )
        largest = r;

    if ( largest !== i ) {
        heap = swap(heap, i, largest);
        return heapify(heap, largest, max);
    }
    return heap;
};


//
// buildHeap
// -> transforms a regular array into a heap

const buildHeap = (arr, max = true) => {
    if ( arr.length === 0 ) return [v];

    const len = arr.length;
    const si = Math.floor( len / 2 );
    for ( var i = si; i > 0; i-- )
        arr = heapify(arr, i, max);
    return arr;
};


//
// heapsort
// -> sorts a new element into the heap

const heapsort = (heap, v, max = true) => {
    if ( heap.length === 0 ) return [v];

    heap.push(v); // add v to end of heap
    const len = heap.length;
    
    for ( var i = len-1; i > 1; i-- ) {
        heap = swap(heap, 0, i);
        heap = heapify(arr, i, max);
    }
    return heap;
};


//
// extract
// -> remove max/min
// post: returns previous max/min
// post: updates heap in-place, removing previous max/min

const extract = (heap, max = true) => {
    if ( heap.length === 0 ) return null;
    if ( heap.length === 1 ) return heap.pop();

    const v = heap[0];
    heap[0] = heap.pop();
    heapify(heap, 0, max);
    return v;
};


//
// increase key
// -> could also be called 'swap' or 'exchange'
// -> replace index (i) with new value (v)
// pre: max ? v > heap[i] : v < heap[i]

const increaseKey = (heap, i, v, max = true) => {
    if ( ! compare(max)(v, heap[i]) )
        // can only increase (max) or decrease (min)
        return heap;

    heap[i] = v;
    while ( i > 0
            && heap[ parent(heap, i) ] < heap[i] ) {
        const pi = parent(heap, i);
        heap = swap(heap, i, pi);
        i = pi;
    }
    return heap;
};


//
// heapInsert
// -> add new value (v) to heap

const heapInsert = (heap, v, max = true) => {
    if ( heap.length === 0 ) return [v];

    const placeholder = max ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    heap.push( placeholder );
    return increaseKey(heap, heap.length-1, v, max);
};



//
// interface

module.exports = {
    newHeap,
    heapify,
    buildHeap,
    heapsort,
    extract,
    increaseKey,
    heapInsert
};
