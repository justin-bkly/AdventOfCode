const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString();

const areLettersUnique = (input) => {
    let found = false;
    for (let i = 0; i < input.length; i++) {
        let toFind = input.slice(i, i+1);
        let rest = input.slice(i+1);
        found = rest.includes(toFind);

        if (found) { return true }
    }
    return false;
}

let buffer = '';
let subset = '';
let bufIndex = 0;
let strLength = 14;

for (let letter of raw) {
    buffer = buffer + letter;
    bufIndex = bufIndex + 1;

    if (buffer.length < strLength) {
        continue;
    } else {
        subset = buffer.substring(buffer.length-strLength, buffer.length);
        let match = areLettersUnique(subset);
        if (!match) {
            // console.log('----found', bufIndex);
            break;
        }
    }
}

console.log(bufIndex)