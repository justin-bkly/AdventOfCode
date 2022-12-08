const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString().split("\n");

const buildTree = (input) => {
    let tree = {};
    tree.size = 0;
    tree.type = "dir";
    let treeStack = [tree];
    let active = tree;

    for (let line of input) {
        if (line.includes("cd /")) { continue }
        if (line.includes("$ ls")) { continue }

        let splitLine = line.split(" ");
 
        if (splitLine[2] === "..") {
            treeStack.pop();
            active = treeStack[treeStack.length-1];

            let allFilesInDir = Object.keys(active);
            let totalFileSizeOfDir = 0;

            for (let file of allFilesInDir) {
                if (file === "size" || file === "type" || file === "name") {
                    continue;
                }
                totalFileSizeOfDir = totalFileSizeOfDir + active[file].size;
            }

            active.size = totalFileSizeOfDir;
            continue;
        } else if ((splitLine[1] === "cd") && (splitLine[2] !== "..")) {
            active = active[splitLine[2]];
            treeStack.push(active);
        } else {
            if (line.includes("dir")) {
                let dir = {};
                dir.size = 0;
                dir.type = "dir";
                dir.name = splitLine[1];
                active[splitLine[1]] = dir;
            } else {
                let tmp = {};
                tmp.size = parseInt(splitLine[0]);
                tmp.type = "file";
                tmp.name = splitLine[1];
                active[tmp.name] = tmp;
                active.size = active.size + tmp.size;
            }
        }
    }

    // Loop over top level to get total size of tree
    let allFilesInTree = Object.keys(tree);
    let totalFileSizeOfTree = 0;

    for (let file of allFilesInTree) {
        if (file === "size" || file === "type" || file === "name") {
            continue;
        }
        totalFileSizeOfTree = totalFileSizeOfTree + tree[file].size;
    }

    tree.size = totalFileSizeOfTree;

    return tree;
}

const findDirectoriesOfSize = (tree, sizeToFind, results) => {
    let allFilesInDir = Object.keys(tree);

    for (let file of allFilesInDir) {
        if (tree[file].type === "dir") {
            if (tree[file].size <= sizeToFind) {
                results.push(tree[file].size);
            }
            findDirectoriesOfSize(tree[file], sizeToFind, results);
        }
    }

    return results;
}

const sumResults = (results) => {
    let sum = 0;
    for (let res of results) {
        sum = sum + res;
    }
    return sum;
}

const tree = buildTree(raw);

// Part 1
let directoryTracker = [];
const part1Directories = findDirectoriesOfSize(tree, 100000, directoryTracker);
const part1Result = sumResults(part1Directories);

console.log(`Part 1: the sum of all directories under 100000 is ${part1Result}`);
