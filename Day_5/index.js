const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString();
const rawSplit = raw.split("\n\n");
const rawCrates = rawSplit[0].split("\n");

// Convert strings to array of crate arrays
const cratesCols = rawCrates[rawCrates.length - 1].split("  ");

let crates = [];
let cratesCpy = []; // Create copy now rather than loop over later to copy
for (let j = 0; j < cratesCols.length; j++) {
    crates[j] = [];
    cratesCpy[j] = [];
}

for (let r = rawCrates.length-2; r >= 0; r--) {
    let totalStrLen = rawCrates[r].length;

    for (let j = 0; j < cratesCols.length; j++) {
        let factor = j % totalStrLen;
        let start = factor * 4;
        let end = start + 4;

        let newStr = rawCrates[r].substring(start, end);
        let found = newStr[1];
        if (found !== " ") { 
            crates[j].push(found);
            cratesCpy[j].push(found);
        }
    } 
}

// Output instructions to separate entries and store in array
const rawInstructs = rawSplit[1].split("\n");
let instructions = [];
for (let str of rawInstructs) {
    let raw = str.match(/\d+/g);
    let nums = raw.map(x => parseInt(x));
    instructions.push(nums);
}

// Part 1: Let's move some crates!
for (let instruct of instructions) {
    for (let c = 1; c <= instruct[0]; c++) {
        let crate = crates[instruct[1]-1].pop();
        crates[instruct[2]-1].push(crate);
    }
}

// Output string for Part 1
let part1Result = '';
for (let arr of crates) {
    part1Result = part1Result + arr[arr.length-1];
}

// Part 2: Move crates by splicing crates
for (let instruct of instructions) {
    let first = cratesCpy[instruct[1]-1].length - instruct[0];
    let rest = cratesCpy[instruct[1]-1].length - first;
    let spliced = cratesCpy[instruct[1]-1].splice(first, rest);
    cratesCpy[instruct[2]-1] = cratesCpy[instruct[2]-1].concat(spliced);
}

// Output string for Part 2
let part2Result = '';
for (let arr of cratesCpy) {
    part2Result = part2Result + arr[arr.length-1];
}

console.log(`Part 1: The top crates are ${part1Result}`);
console.log(`Part 2: The top crates with new and improved stacks are ${part2Result}`);