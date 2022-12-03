const fs = require('fs');
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
                // console.log(letter, alphabet[letter]);
                break;
            }
        }
    }
    return sum;
}

let part1Result = part1();
console.log(`The priority score for Part 1 is ${part1Result}`);

// Look through first rucksack, pick a letter
// if letter found in second rucksack, then look in third
// if all three found, break
// if not found in third, scrap tmp letter

const part2 = () => {
    let sum = 0;
    for (let sack of ruckSacks) {
        for (let l of sack[0]) {

        }
    }
}

const ruckSackGroups = [];

for (let i = 0; i < rawRucksacks.length; i++) {
    console.log(i % 3);
}


