const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString().split("\n");

let rawMonkeys = [];

let currRawMonkey = [];
for (let row = 0; row <= raw.length; row++) {
    if (raw[row] === "" || row == raw.length) {
        rawMonkeys.push(currRawMonkey);
        currRawMonkey = [];
    } else {
        currRawMonkey.push(raw[row]);
    }
}

let monkeys = [];

for (let m = 0; m < rawMonkeys.length; m++) {
    let id = m;

    // Starting items
    let startingItems = [];
    let si = rawMonkeys[m][1].split(": ")[1].split(",");
    for (let item of si) {
        startingItems.push(parseInt(item));
    }

    // Operation
    let operation = rawMonkeys[m][2].split(": ")[1];
    
    // Test
    let divisibleBy = parseInt(rawMonkeys[m][3].match(/\d+/g)[0]);

    // Conditions
    let targetIfTrue = parseInt(rawMonkeys[m][4].match(/\d+/g)[0]);
    let targetIfFalse = parseInt(rawMonkeys[m][5].match(/\d+/g)[0]);

    let monkey = {
        id: id,
        items: startingItems,
        inspections: 0,
        doTurn: function () {
            for (let item = 0; item < this.items.length; item++) {
                let newLevel = 0;
                let old = this.items[item];

                let rplcOperation = operation.replace("new", "newLevel"); // to get around reserved keyword
                let opResult = eval(rplcOperation);
                newLevel = Math.floor(newLevel / 3);
                // console.log(item, old, opResult, newLevel, rplcOperation);

                if (newLevel % divisibleBy == 0) {
                    // console.log(`Throw to monkey`, targetIfTrue);
                    monkeys[targetIfTrue].items.push(newLevel);
                } else {
                    // console.log(`Throw to monkey`, targetIfFalse);
                    monkeys[targetIfFalse].items.push(newLevel);
                }
                this.inspections++;
            }
            this.items = [];
        }
    }

    monkeys.push(monkey);
}

const play = (numRounds) => {
    for (let r = 1; r <= numRounds; r++) {
        for (let monkey of monkeys) {
            monkey.doTurn();
        }
    }
}

// Part 1
play(20);

let monkeyInspections = [];

for (let monkey of monkeys) {
    monkeyInspections.push(monkey.inspections);
}

monkeyInspections.sort((a,b) => a - b);
let monkeyBusiness = monkeyInspections[monkeyInspections.length-2] * monkeyInspections[monkeyInspections.length-1];

console.log(`Part 1: Monkey business is ${monkeyBusiness}`);