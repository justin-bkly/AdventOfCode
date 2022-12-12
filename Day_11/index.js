const fs = require('fs');
const raw = fs.readFileSync('input.txt').toString().split("\n");

const parse = (whichPart) => {
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
    let part2Divisors = [];
    
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
        part2Divisors.push(divisibleBy);
    
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

                    if (whichPart == 1) {
                        newLevel = Math.floor(newLevel / 3);

                        if (newLevel % divisibleBy == 0) {
                            monkeys[targetIfTrue].items.push(newLevel);
                        } else {
                            monkeys[targetIfFalse].items.push(newLevel);
                        }
                    } else {
                        if (newLevel % divisibleBy == 0) {
                            monkeys[targetIfTrue].items.push(newLevel % commonDivisor);
                        } else {
                            monkeys[targetIfFalse].items.push(newLevel % commonDivisor);
                        }
                    }
                    this.inspections++;
                }
                this.items = [];
            }
        }
        monkeys.push(monkey);
    }

    let commonDivisor = part2Divisors[0];
    for (let d = 1; d < part2Divisors.length; d++) {
        commonDivisor = part2Divisors[d] * commonDivisor;
    }

    return monkeys;
}

const play = (numRounds, monkeys, whichPart) => {
    for (let r = 1; r <= numRounds; r++) {
        for (let monkey of monkeys) {
            monkey.doTurn();
        }
    }

    let monkeyInspections = [];

    for (let monkey of monkeys) {
        monkeyInspections.push(monkey.inspections);
    }

    monkeyInspections.sort((a,b) => a - b);
    let monkeyBusiness = monkeyInspections[monkeyInspections.length-2] * monkeyInspections[monkeyInspections.length-1];

    console.log(`Part ${whichPart}: Monkey business is ${monkeyBusiness}`);
}

// Part 1 or 2
let whichPart = 1;

// Part 1
const monkeysPart1 = parse(whichPart);
play(20, monkeysPart1, whichPart);

// Part 2
whichPart = 2;
const monkeysPart2 = parse(whichPart);
play(10000, monkeysPart2, whichPart);
