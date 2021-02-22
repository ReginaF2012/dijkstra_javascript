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

    dijkstra(vertex) {

    }
}