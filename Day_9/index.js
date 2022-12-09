const fs = require('fs');
const raw = fs.readFileSync('testinput.txt').toString().split("\n");

const instructions = [];

for (let row of raw) {
    let split = row.split(" ");
    let num = parseInt(split[1]);
    instructions.push([split[0], num]);
}

let knots = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    // {x: 0, y: 0},
    // {x: 0, y: 0},
    // {x: 0, y: 0},
    // {x: 0, y: 0},
    // {x: 0, y: 0},
    // {x: 0, y: 0},
    // {x: 0, y: 0},
    // {x: 0, y: 0},
];

let tailRoute = [[0,0]];

const checkForDuplicates = (x, y, knotId) => {
    for (let pos of tailRoute) {
        if (pos[0] === x && pos[1] === y) {
            return;
        }
    }

    if (knotId === knots.length - 2) {
        tailRoute.push([x, y]);
    }
}

const moveTail = (head, tail, knotId) => {
    if ((head.x - tail.x) > 1) { // Move right
        tail.x = tail.x + 1;
        tail.y = head.y;
        checkForDuplicates(tail.x, tail.y, knotId);
    } else if ((head.x - tail.x) < -1) { // Move left
        tail.x = tail.x - 1;
        tail.y = head.y;
        checkForDuplicates(tail.x, tail.y, knotId);
    } else if ((head.y - tail.y) > 1) { // Move up
        tail.y = tail.y + 1;
        tail.x = head.x;
        checkForDuplicates(tail.x, tail.y, knotId);
    } else if ((head.y - tail.y) < -1) { // Move down
        tail.y = tail.y - 1;
        tail.x = head.x;
        checkForDuplicates(tail.x, tail.y, knotId);
    }
}

const stepKnotsLeft = (startX, newX) => {
    for (let s = startX - 1; s >= newX; s--) {
        knots[0].x = s;
        for (let k = 0; k < knots.length - 1; k++) {
            moveTail(knots[k], knots[k+1], k);
        }
    }
}

const stepKnotsRight = (startX, newX) => {
    for (let s = startX + 1; s <= newX; s++) {
        knots[0].x = s;
        for (let k = 0; k < knots.length - 1; k++) {
            moveTail(knots[k], knots[k+1], k);
        }
    }
}

const stepKnotsUp = (startY, newY) => {
    for (let s = startY + 1; s <= newY; s++) {
        knots[0].y = s;
        for (let k = 0; k < knots.length - 1; k++) {
            moveTail(knots[k], knots[k+1], k);
        }
    }
}

const stepKnotsDown = (startY, newY) => {
    for (let s = startY - 1; s >= newY; s--) {
        knots[0].y = s;
        for (let k = 0; k < knots.length - 1; k++) {
            moveTail(knots[k], knots[k+1], k);
        }
    }
}

const drawGrid = (points) => {
    let arr = [];
    let width = 40;
    let height = 40;
    let xoffset = width / 2;
    let yoffset = height / 2;
    
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            if ((x === xoffset) && (y === yoffset)) {
                row.push(`S`);
            } else {
                row.push(`.`);
            }
        }
        arr.push(row);
    }

    for (let k = 0; k < points.length; k++) {
        let x = 0;
        let y = 0;

        if ('x' in points[k]) {
            x = points[k].x;
            y = points[k].y;

            if (k === 0) {
                arr[y + yoffset][x + yoffset] = `H`;
            } else if (k === points.length - 1) {
                arr[y + yoffset][x + yoffset] = `T`;
            } else {
                arr[y + yoffset][x + yoffset] = k;
            }
        } else {
            x = points[k][0];
            y = points[k][1];

            arr[y + yoffset][x + yoffset] = `#`;
        }
    }

    let grid = ``;
    for (let y = arr.length - 1; y > 0; y--) {
        for (let x = 0; x < arr[y].length; x++) {
            grid = grid + arr[y][x];
        }
        grid = grid + `\n`;
    }

    console.log(grid);
}

for (let instruction of instructions) {
    let x = knots[0].x;
    let y = knots[0].y;
    let newX = 0;
    let newY = 0;

    if (instruction[0] === "R") {
        newX = x + instruction[1];
        stepKnotsRight(x, newX);
    } else if (instruction[0] === "L") {
        newX = x - instruction[1];
        stepKnotsLeft(x, newX);
    } else if (instruction[0] === "U") {
        newY = y + instruction[1];
        stepKnotsUp(y, newY);
    } else if (instruction[0] === "D") {
        newY = y - instruction[1];
        stepKnotsDown(y, newY);
    }

    drawGrid(knots);
}

// Part 1
console.log(`Part 1: The tail has hit ${tailRoute.length} unique locations`);

// See full tail
drawGrid(tailRoute);

