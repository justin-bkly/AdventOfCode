const fs = require('fs');
const raw = fs.readFileSync('testinput.txt').toString().split("\n");

const buildTree = (input) => {
    let tree = {};
    tree.size = 0;
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
                if (file === "size") {
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
        if (file === "size") {
            continue;
        }
        totalFileSizeOfTree = totalFileSizeOfTree + tree[file].size;
    }

    tree.size = totalFileSizeOfTree;

    return tree;
}


const tree = buildTree(raw);
console.log(tree);