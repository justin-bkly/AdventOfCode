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

const checkDir = (input) => {
    console.log('--- checkdir');
}

// const findParent = (obj, indexToFind) {
//     // get keys of object
//     // loop through to see if indexToFind matches a key
//     // if so, return, it is the parent
//     // otherwise, look through to see if there are children
//     // then do the same... needs to be recursive function.
// }

const buildTree = (input) => {
    console.log(input);

    /*
    {
        name
        type
        size
    }
    */

    // look at a line
    // if the line contains cd, it is a directory, so make an object and append to output
    // skip lines with '$ ls'
    // look through each line until hitting another 'cd'
    // if a line contains 'dir' then make an object of type dir, otherwise a file
    // cd.. means close out array and append dir array to parent

    let tree = {};
    let treeStack = [tree];
    let active = tree;
    let activeIndex = '';

    for (let line of input) {
        if (line.includes("cd /")) { continue }
        if (line.includes("$ ls")) { continue }
        console.log(line);

        let r = line.split(" ");
        console.log(r);
 
        if (r[2] === "..") { // If change up dir
            console.log('.....')
            treeStack.pop();
            active = treeStack[treeStack.length-1];
            // active = 
            continue;
        } else if ((r[1] === "cd") && (r[2] !== "..")) { // If change into dir
            let s = line.split(" ");
            active = active[s[2]];
            treeStack.push(active);
        } else {
            let split = line.split(" ");

            if (line.includes("dir")) {
                let dir = {};
                dir.name = split[1];
                active[dir.name] = dir;
            } else {
                let tmp = {};
                tmp.size = parseInt(split[0]);
                tmp.type = "file";
                tmp.name = split[1];
                active[tmp.name] = tmp;
            }
        }

    }
    console.log('---- final tree')
    console.log(tree);
}


const tree = buildTree(raw);
// console.log(tree);