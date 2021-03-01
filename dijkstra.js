class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    changeWeight(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    dijkstra(source) {
        let distances = {},
            paths = {},
            visited = {};
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] === source) {
                distances[source] = 0;
                paths[this.vertices[i]] = 'source';
            } else {
                distances[this.vertices[i]] = Infinity;
                paths[this.vertices[i]] = source;
            }
            visited[this.vertices[i]] = false;
        }
        
        let currVertex = this.vertexWithMinDistance(distances, visited);

        while (currVertex !== null) {
            let distance = distances[currVertex],
                neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                let newDistance = distance + neighbors[neighbor];
                if (distances[neighbor] > newDistance) {
                    distances[neighbor] = newDistance;
                    paths[neighbor] = currVertex;
                }
            }
            visited[currVertex] = true;
            currVertex = this.vertexWithMinDistance(distances, visited);
        }

        console.log(distances);
        console.log(paths);
    }

    vertexWithMinDistance(distances, visited) {
        let minDistance = Infinity,
            minVertex = null;
        for (let vertex in distances) {
            let distance = distances[vertex];
            if (distance < minDistance && !visited[vertex]) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }
}

let g = new Graph();
g.addVertex("start");
g.addVertex("A");
g.addVertex("B");
g.addVertex("finish");

g.addEdge("start", "A", 6);
g.addEdge("start", "B", 2);
g.addEdge("A", "finish", 1);
g.addEdge("B", "A", 3);
g.addEdge("B", "finish", 5)
g.dijkstra("start");
