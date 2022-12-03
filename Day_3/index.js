const fs = require('fs');
const { format } = require('path');
const rawRucksacks = fs.readFileSync('input.txt').toString().split("\n");

const alphabet = {};

for (let i = 0; i <= 25; i++) {
    let lower = String.fromCharCode(65 + i);
    let upper = String.fromCharCode(97 + i);
    alphabet[lower] = i+1+26;
    alphabet[upper] = i+1;
}

// Part 1
const ruckSacks = [];

for (let r of rawRucksacks) {
    let compartments = [r.substring(0, r.length / 2), r.substring((r.length / 2), r.length)];
    ruckSacks.push(compartments);
}

const findMatch = (letterToFind, comp) => {
    for (let letter of comp) {
        if (letterToFind == letter) {
            return letter;
        }
    }
    return 0;
}

const part1 = () => {
    let sum = 0;
    for (let sack of ruckSacks) {
        for (let l of sack[0]) {
            let letter = findMatch(l, sack[1]);
            if (letter) {
                sum = sum + alphabet[letter];
                break;
            }
        }
    }
    return sum;
}

let prioScorePart1 = part1();
console.log(`Part 1: The priority sum is ${prioScorePart1}`);

// Part 2
const ruckSackGroups = [];
let prioScorePart2 = 0;

let count = 0;
let tmp = [];
while (count < rawRucksacks.length) {
    if (count % 3 == 0) { tmp = [] }
    if (count % 3 == 2) { ruckSackGroups.push(tmp)}
    tmp.push(rawRucksacks[count]);
    count++;
}

const searchSacks = (group) => {
    let first = group[0];
    let second = group[1];
    let third = group[2];

    for (let a in first) {
        for (let b in second) {
            if (first[a] == second[b]) {
                let c = searchThird(first[a], third);
                if (c) { return c; }
            }
        }
    }
}

const searchThird = (letter, sack) => {
    for (let c in sack) {
        if (sack[c] == letter) {
            return sack[c];
        }
    }
    return 0;
}

for (let group of ruckSackGroups) {
    prioScorePart2 = prioScorePart2 + alphabet[searchSacks(group)];
}

console.log(`Part 2: The priority sum is ${prioScorePart2}`);