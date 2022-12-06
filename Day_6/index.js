const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString();

const areLettersUnique = (input) => {
    let found = false;
    for (let i = 0; i < input.length; i++) {
        let toFind = input.slice(i, i+1);
        let rest = input.slice(i+1);
        found = rest.includes(toFind);

        if (found) { return false }
    }
    return true;
}

const findMarker = (strLength) => {
    let buffer = '';
    let subset = '';
    let buffIndex = 0;
    
    // Go letter by letter and put a series of letters into a temp buffer to check if all letters in the buffer are unique
    for (let letter of raw) {
        buffer = buffer + letter;
        buffIndex = buffIndex + 1;
    
        if (buffer.length < strLength) {
            continue;
        } else {
            subset = buffer.substring(buffer.length-strLength, buffer.length);
            let match = areLettersUnique(subset);
            if (match) { return buffIndex; }
        }
    }
    return buffIndex;
}

// Results
part1 = findMarker(4);
part2 = findMarker(14);

console.log(`Part 1: The index of the marker is ${part1}`);
console.log(`Part 2: The index of the marker is ${part2}`);