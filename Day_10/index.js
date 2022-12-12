const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString().split("\n");

let x = 1;
let cycleHistory = [[]];

const runCycles = (numCycles) => {
    for (let cycle = 1; cycle <= numCycles; cycle++) {
        let entry = [x, cycleHistory.length * x];
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

const cyclesSum = cycleHistory[20][1] + cycleHistory[60][1] + cycleHistory[100][1] + cycleHistory[140][1] + cycleHistory[180][1] + cycleHistory[220][1];
console.log(cyclesSum);