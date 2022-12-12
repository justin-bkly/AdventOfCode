const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString().split("\n");

let x = 1;
let cycleHistory = [[]];
let pixels = '';

const writePixels = () => {
    let cycle = cycleHistory.length;
    let cycleMod = cycle % 40;

    if ((x == cycleMod || (x + 1) == cycleMod || (x + 2) == cycleMod)) {
        pixels = pixels + "#";
    } else {
        pixels = pixels + ".";
    }

    if (cycle % 40 == 0) {
        pixels = pixels + "\n";
    }
}
 
const runCycles = (numCycles) => {
    for (let cycle = 1; cycle <= numCycles; cycle++) {
        let entry = [x, cycleHistory.length * x];
        writePixels();
        cycleHistory.push(entry);
    }
}

for (let row of raw) {
    let splitRow = row.split(" ");

    if (splitRow[0] === "addx") {
        runCycles(2);
        x = x + parseInt(splitRow[1]);
    } else {
        runCycles(1);
    }
}

// Part 1
const cyclesSum = cycleHistory[20][1] + cycleHistory[60][1] + cycleHistory[100][1] + cycleHistory[140][1] + cycleHistory[180][1] + cycleHistory[220][1];
console.log(`Part 1: Sum of cycles is ${cyclesSum}`);

// Part 2
console.log(`Part 2:\n`,pixels);