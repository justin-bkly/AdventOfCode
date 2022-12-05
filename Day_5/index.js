const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString();
const rawSplit = raw.split("\n\n");

// console.log(raw);
const rawCrates = rawSplit[0].split("\n");

// Crates
const cratesCols = rawCrates[rawCrates.length - 1].split("  ");

let crates = [];
for (let j = 0; j < cratesCols.length; j++) {
    crates[j] = [];
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
        }
    } 
}

// Instructions
const rawInstructs = rawSplit[1].split("\n");
let instructions = [];
for (let str of rawInstructs) {
    let raw = str.match(/\d+/g);
    let nums = raw.map(x => parseInt(x));
    instructions.push(nums);
}

// Move crates
let cratesCopy = crates.map(x => x); // Copy array

for (let instruct of instructions) {
    for (let c = 1; c <= instruct[0]; c++) {
        let crate = cratesCopy[instruct[1]-1].pop();
        cratesCopy[instruct[2]-1].push(crate);
    }
}

let part1 = '';
for (let arr of cratesCopy) {
    part1 = part1 + arr[arr.length-1];
}

// Part 1
console.log(`The top crates are ${part1}`);