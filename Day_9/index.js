const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString().split("\n");

const instructions = [];

for (let row of raw) {
    let split = row.split(" ");
    let num = parseInt(split[1]);
    instructions.push([split[0], num]);
}

// console.log(instructions);

let head = {x: 0, y: 0};
let tail = {x: 0, y: 0};

let headRoute = [[0,0]];
let tailRoute = [[0,0]];

const checkForDuplicates = (x, y) => {
    for (let pos of tailRoute) {
        if (pos[0] === x && pos[1] === y) {
            return;
        }
    }
    tailRoute.push([x, y]);
}

const moveTail = () => {
    if ((head.x - tail.x) > 1) { // Move right
        tail.x = tail.x + 1;
        tail.y = head.y;
        checkForDuplicates(tail.x, tail.y);
    } else if ((head.x - tail.x) < -1) { // Move left
        tail.x = tail.x - 1;
        tail.y = head.y;
        checkForDuplicates(tail.x, tail.y);
    } else if ((head.y - tail.y) > 1) { // Move up
        tail.y = tail.y + 1;
        tail.x = head.x;
        checkForDuplicates(tail.x, tail.y);
    } else if ((head.y - tail.y) < -1) { // Move down
        tail.y = tail.y - 1;
        tail.x = head.x;
        checkForDuplicates(tail.x, tail.y);
    }
    // console.log("head x", head.x, "head y", head.y, "tail x", tail.x, "tail y", tail.y);
}

const stepLeft = (startX, newX) => {
    for (let s = startX - 1; s >= newX; s--) {
        head.x = s;
        headRoute.push([s, head.y]);
        moveTail();
    }
}

const stepRight = (startX, newX) => {
    for (let s = startX + 1; s <= newX; s++) {
        head.x = s;
        headRoute.push([s, head.y]);
        moveTail();
    }
}

const stepUp = (startY, newY) => {
    for (let s = startY + 1; s <= newY; s++) {
        head.y = s;
        headRoute.push([head.x, s]);
        moveTail();
    }
}

const stepDown = (startY, newY) => {
    for (let s = startY - 1; s >= newY; s--) {
        head.y = s;
        headRoute.push([head.x, s]);
        moveTail();
    }
}

for (let instruction of instructions) {
    let x = head.x;
    let y = head.y;
    let newX = 0;
    let newY = 0;

    // console.log("- Instruction", instruction)

    if (instruction[0] === "R") {
        newX = x + instruction[1];
        stepRight(x, newX);
    } else if (instruction[0] === "L") {
        newX = x - instruction[1];
        stepLeft(x, newX);
    } else if (instruction[0] === "U") {
        newY = y + instruction[1];
        stepUp(y, newY);
    } else if (instruction[0] === "D") {
        newY = y - instruction[1];
        stepDown(y, newY);
    }
}

// Part 1
console.log(`Part 1: The tail has hit ${tailRoute.length} unique locations`);

