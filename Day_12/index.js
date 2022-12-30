const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString();
const splitRaw = raw.split("\n");

console.log(raw);

class Node {
    constructor(x, y, val, id, letter) {
        this._name = `x:${x}-y:${y}`;
        this._x = x;
        this._y = y;
        this._val = val;
        this._id = id;
        this._letter = letter;
        this._visited = false
    }

    get visited() {
        return this._visited;
    }

    set visited(ifVisited) {
        this._visited = ifVisited;
    }

    get letter() {
        return this._letter;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get val() {
        return this._val;
    }

    get id() {
        return this._id;
    }

    set val(val) {
        this._val = val;
    }
}

class Edge {
    constructor(source, destination) {
        this._source = source;
        this._destination = destination;
    }
    get source() {
        return this._source;
    }

    get destination() {
        return this._destination;
    }
}

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = new Map();
    }

    addNode(node) {
        if (this.nodes.includes(node)) {
            console.log(`Node ${node.name} already in graph!`);
        } else {
            this.nodes.push(node);
            this.edges.set(node, []);
        }
    }

    addEdge(edge) {
        let source = edge.source;
        let destination = edge.destination;

        if (!this.nodes.includes(source) && !this.nodes.includes(destination)) {
            console.log(`Node ${node.name} not in graph!`)
        }

        let tmp = this.edges.get(source);

        if (!tmp.includes(destination)) {
            tmp.push(destination);
        }

        // Add reversed path as well. This makes this an undirected graph. Comment out to make
        // a directed graph.
        // let reversed = new Edge(destination, source);
        // let tmpRev = this.edges.get(destination);

        // if (!tmpRev.includes(source)) {
        //     tmpRev.push(source);
        // }
    }

    childrenOf(node) {
        return this.edges.get(node);
    }

    hasNode(node) {
        return this.nodes.includes(node);
    }

    compareVal(start, end) {
        if ((end - start) > 1) {
            return false;
        }
        return true;
    }

    makeEdge(start, end) {
        if (this.compareVal(start.val, end.val)) {
            let edge = new Edge(start, end);
            this.addEdge(edge);
        }
    }

    printEdges() {
        for (let [key, value] of this.edges) {
            console.log('For source', key.letter, key.id, key.name);
            for (let n of value) {
                console.log(n.letter, n.id, n.name);
            }
        }
    }

    findEdges() {
        for (let n = 0; n < this.nodes.length; n++) {
            let node = this.nodes[n];

            let cx = node.x;
            let cy = node.y;

            let rightName = `x:${cx + 1}-y:${cy}`;
            let leftName = `x:${cx - 1}-y:${cy}`;
            let downName = `x:${cx}-y:${cy + 1}`;
            let upName = `x:${cx}-y:${cy - 1}`;

            let hasUp = this.nodes.findIndex(node => node.name === upName);
            let hasDown = this.nodes.findIndex(node => node.name === downName);
            let hasLeft = this.nodes.findIndex(node => node.name === leftName);
            let hasRight = this.nodes.findIndex(node => node.name === rightName);

            if (hasUp >= 0) {
                this.makeEdge(node, this.nodes[hasUp])
            }
            if (hasDown >= 0) {
                this.makeEdge(node, this.nodes[hasDown])
            }
            if (hasLeft >= 0) {
                this.makeEdge(node, this.nodes[hasLeft])
            }
            if (hasRight >= 0) {
                this.makeEdge(node, this.nodes[hasRight])
            }
        }
    }
}


const grid = new Graph();

let startPoint;;
let target;
let id = 0;

for (let row = 0; row < splitRaw.length; row++) {
    for (let col = 0; col < splitRaw[row].length; col++) {
        let node = new Node(col, row, 0, id, splitRaw[row][col]);
        
        if (splitRaw[row][col] === "S") {
            node.val = 0;
            startPoint = node;
        } else if (splitRaw[row][col] === "E") {
            node.val = 26;
            target = node;
        } else {
            node.val = splitRaw[row][col].charCodeAt(0)-97;
        }
        grid.addNode(node);

        id++;
    }
}

const printPath = (path) => {
    let result = '';
    for (let i = 0; i < path.length; i++) {
        result = result + path[i].letter;
        if (i != path.length - 1) {
            result = result + '->';
        }
    }
    return result;
}

const BFS = (graph, start, end) => {
    let initPath = [start];
    let pathQueue = [initPath];

    while (pathQueue.length != 0) {
        let tmpPath = pathQueue.shift();
        console.log('Current path:', printPath(tmpPath));
        lastNode = tmpPath[tmpPath.length - 1];

        if (lastNode == end) {
            return tmpPath;
        }

        for (let nextNode of graph.childrenOf(lastNode)) {
            if (!tmpPath.includes(nextNode)) {
                let newPath = tmpPath.concat([nextNode]);
                pathQueue.push(newPath);
            }
        }
    }
}

grid.findEdges();
// grid.printEdges();
const shortest = BFS(grid, startPoint, target);
console.log("Shortest", shortest.length - 1);