class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList[vertex] = []
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({vertex: vertex2, weight: weight});
        this.adjacencyList[vertex2].push({vertex: vertex1, weight: weight});
    }

    dijkstra(source) {

    }
}

class PriorityQueue {
    constructor(array = []) {
        this.values = [];
        if (array.length > 0) this.buildHeap(array);
    }

    // index of the parent node
    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    // index of the left child node
    leftChild(index) {
        return (index * 2) + 1;
    }

    // index of the right child node
    rightChild(index) {
        return (index * 2) + 2;
    }

    // returns true if index is of a node that has no children
    isLeaf(index) {
        return (
            index >= Math.floor(this.values.length / 2) && index <= this.values.length - 1
        )
    }

    // swap using ES6 destructuring
    swap(index1, index2) {
        [this.values[index1], this.values[index2]] = [this.values[index2], this.values[index1]];
    }


    heapifyDown(index) {

        // if the node at index has children
        if (!this.isLeaf(index)) {

            // get indices of children
            let leftChildIndex = this.leftChild(index),
                rightChildIndex = this.rightChild(index),

                // start out smallest index at parent index
                smallestIndex = index;

            // if the left child < parent
            if (this.values[leftChildIndex]?.priority < this.values[smallestIndex]?.priority) {
                // reassign smallest index to left child index
                smallestIndex = leftChildIndex;
            }

            // if the right child < element at smallest index (either parent or left child)
            if (this.values[rightChildIndex]?.priority <= this.values[smallestIndex]?.priority) {
                // reassign smallest index to right child index
                smallestIndex = rightChildIndex;
            }

            // if the smallest index is not the parent index
            if (smallestIndex !== index) {
                // swap
                this.swap(index, smallestIndex);
                // recursively move down the heap
                this.heapifyDown(smallestIndex);
            }
        }
    }

    heapifyUp(index) {
        let currentIndex = index,
            parentIndex = this.parent(currentIndex);

        // while we haven't reached the root node and the current element is greater than its parent node
        while (currentIndex > 0 && this.values[currentIndex]?.priority < this.values[parentIndex]?.priority) {
            // swap
            this.swap(currentIndex, parentIndex);
            // move up the binary heap
            currentIndex = parentIndex;
            parentIndex = this.parent(parentIndex);
        }
    }

    enqueu(value, priority) {
        // add element to the end of the heap
        this.values.push({value, priority});
        // move element up until it's in the correct position
        this.heapifyUp(this.values.length - 1);
    }

    // removes and returns max element
    dequeue() {
        if (this.values.length < 1) return 'empty queue';

        // get min
        const min = this.values[0];
        const end = this.values.pop();

        if (this.values.length > 0) {
            // reassign first element to the last element
            this.values[0] = end;
            // heapify down until element is back in its correct position
            this.heapifyDown(0);
        }

        // return the max
        return min;
    }

    buildHeap(array) {
        this.values = array;
        // since leaves start at floor(nodes / 2) index, we work from the leaves up the heap
        for(let i = Math.floor(this.values.length / 2); i >= 0; i--){
            this.heapifyDown(i);
        }
    }
}