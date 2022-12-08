const fs = require('fs');
const raw = fs.readFileSync('testinput.txt').toString().split("\n");

/*
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
*/

const buildTree = (input) => {
    console.log(input);

    let tree = {};
    tree.size = 0;
    let treeStack = [tree];
    let active = tree;

    for (let line of input) {
        if (line.includes("cd /")) { continue }
        if (line.includes("$ ls")) { continue }
        console.log(line);

        let r = line.split(" ");
 
        if (r[2] === "..") {
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
        } else if ((r[1] === "cd") && (r[2] !== "..")) {
            let s = line.split(" ");
            active = active[s[2]];
            treeStack.push(active);
        } else {
            let split = line.split(" ");

            if (line.includes("dir")) {
                let dir = {};
                dir.size = 0;
                active[split[1]] = dir;
            } else {
                let tmp = {};
                tmp.size = parseInt(split[0]);
                tmp.type = "file";
                tmp.name = split[1];
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