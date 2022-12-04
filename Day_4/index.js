const fs = require('fs');
const { format } = require('path');
const rawSections = fs.readFileSync('input.txt').toString().split("\n");

// Part 1
let numContainingPairs = 0;

// Part 2
let allContainingPairs = 0;

const makeString = (originalString) => {
    let split = originalString.split('-');
    let low = parseInt(split[0]);
    let high = parseInt(split[1]);
    let res = "";

    for (let i = low; i <= high; i++) {
        res = res + "," + i;
    }

    res += ',';
    return res;
}

const compare = (a, b) => {
    if (b.length > a.length) {
        return -1;
    } else if (a.length > b.length) {
        return 1;
    }
    return 0;
}

const findAllPairs = (first, second) => {
    let splitFirst = first.split(",");
    let splitSecond = second.split(",");
    
    for (let item of splitFirst) {
        if ((splitSecond.indexOf(item) >= 0) && (item != "")) {
            console.log('Found!', splitSecond.indexOf(item));
            return 1;
        } 
    }

    return 0;
}

for (let sec of rawSections) {
    let converted = [];
    let split = sec.split(",");
    let firstRange = makeString(split[0]);
    let secondRange = makeString(split[1]);
    converted.push(firstRange, secondRange);
    converted.sort(compare); // Sort array so that shorter strings are first

    // for part 1
    if ((converted[1].indexOf(converted[0])) >= 0) {
        numContainingPairs += 1;
    }

    // for part 2
    allContainingPairs = allContainingPairs + findAllPairs(converted[0], converted[1]);
}

// Part 1 result
console.log(`Part 1: The number of assignment pairs where one range is contained with the other: ${numContainingPairs}`);

// Part 2 result
console.log(`Part 2: The number of overlapping assignment pairs is ${allContainingPairs}`);