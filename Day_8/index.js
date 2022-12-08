const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString();

const splitRaw = raw.split("\n");
const grid = [];
const visibleTrees = [];
let numVisibleTrees = 0;

for (let line of splitRaw) {
    let row = [];
    let visRow = [];
    for (let char of line) {
        row.push(char);
        visRow.push(0);
    }
    grid.push(row);
    visibleTrees.push(visRow);
}

// These return whether a tree is higher than the current tree in the same row and column
const checkLeft = (current, row, col) => {
    for (let i = col - 1; i >= 0; i--) {
        if (grid[row][i] >= current) { return true }
    }
    return false;
}

const checkRight = (current, row, col) => {
    for (let j = col + 1; j < grid[row].length; j++) {
        if (grid[row][j] >= current) { return true }
    }
    return false;
}

const checkUp = (current, row, col) => {
    for (let j = row - 1; j >= 0; j--) {
        if (grid[j][col] >= current) { return true }
    }
    return false;
}

const checkDown = (current, row, col) => {
    for (let j = row + 1; j < grid.length; j++) {
        if (grid[j][col] >= current) { return true }
    }
    return false;
}

// Initialize edges with visible trees, and count them
for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
        if ((r == 0) || (r == grid.length - 1) || (c == 0) || (c == grid[r].length - 1)) {
            visibleTrees[r][c] = 1;
            numVisibleTrees = numVisibleTrees + 1;
        } else {
            let current = grid[r][c];

            // Check if there are higher trees
            const left = checkLeft(current, r, c);
            const right = checkRight(current, r, c);
            const over = checkUp(current, r, c);
            const under = checkDown(current, r, c);

            if ((!left) || (!right) || (!over) || (!under)) {
                visibleTrees[r][c] = 1;
                numVisibleTrees = numVisibleTrees + 1;
            }
        }
    }
}

// Part 1
console.log(`Part 1: Number of visible trees ${numVisibleTrees}`)

// Part 2
const checkSceneLeft = (current, row, col) => {
    if (col == 0) { return 0 }
    let steps = 0;
    for (let i = col - 1; i >= 0; i--) {
        steps++;
        if (grid[row][i] >= current) { return steps }
    }
    return col;
}

const checkSceneRight = (current, row, col) => {
    if (col >= grid[row].length) { return 0 }
    let steps = 0;
    for (let j = col + 1; j < grid[row].length; j++) {
        steps++;
        if (grid[row][j] >= current) { return steps }
    }
    return grid[row].length - 1 - col;
}

const checkSceneUp = (current, row, col) => {
    if (row == 0) { return 0 }
    let steps = 0;
    for (let j = row - 1; j >= 0; j--) {
        steps++;
        if (grid[j][col] >= current) { return steps }
    }
    return row;
}

const checkSceneDown = (current, row, col) => {
    if (row >= grid.length) { return 0 }
    let steps = 0;
    for (let j = row + 1; j < grid.length; j++) {
        steps++;
        if (grid[j][col] >= current) { return steps }
    }
    return grid.length - 1 - row;
}

let sceneryScores = [];

for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
        if ((r == 0) || (r == grid.length - 1) || (c == 0) || (c == grid[r].length - 1)) {
            continue;
        }
        let left = checkSceneLeft(grid[r][c], r, c);
        let right = checkSceneRight(grid[r][c], r, c);
        let up = checkSceneUp(grid[r][c], r, c);
        let down = checkSceneDown(grid[r][c], r, c);

        let score = left * right * up * down;
        sceneryScores.push(score);
    }
}

let highestScenicScore = 0;
for (let score of sceneryScores) {
    if (highestScenicScore < score) { highestScenicScore = score }
}

console.log(`Part 2: The highest scenic score is ${highestScenicScore}`);


