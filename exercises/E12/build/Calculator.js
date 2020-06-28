"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleOperations_1 = require("./modules/SimpleOperations");
const AdvancedOperations_1 = require("./modules/AdvancedOperations");
const ReadLine = require("readline");
const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
main();
async function main() {
    const operations = new Array();
    operations.push(...SimpleOperations_1.OperationBuilder.getOperations());
    operations.push(...AdvancedOperations_1.OperationBuilder.getOperations());
    console.log("Welcome to the Calculator. Start entering calculations!");
    while (true) {
        let command = await readLine();
        if (command.toLowerCase() === "exit")
            break;
        command = command.replace(/\s+/g, "");
        let left = 0;
        let right = 0;
        const operatorIndex = findFirstNonDigit(command);
        if (operatorIndex < 0)
            console.log("No operator specified");
        else {
            const operatorSymbol = command.charAt(operatorIndex);
            left = Number.parseInt(command.substring(0, operatorIndex));
            right = Number.parseInt(command.substring(operatorIndex + 1));
            if (Number.isNaN(left) || Number.isNaN(right)) { // substitute for try-catch because parsing doesn't throw any errors
                console.log("Error parsing commmand");
                continue;
            }
            console.log("Calculating", left, operatorSymbol, right, "...");
            let result;
            const operation = matchOperation(operations, operatorSymbol);
            if (operation) {
                result = operation.performOperation(left, right);
                console.log("...", result);
            }
            else
                console.log("Invalid operator");
        }
    }
}
function readLine() {
    return new Promise((resolve) => {
        rl.question("> ", (_answer) => {
            resolve(_answer);
        });
    });
}
function findFirstNonDigit(_string) {
    for (let i = 0; i < _string.length; i++) {
        if (Number.isNaN(Number.parseInt(_string.charAt(i))))
            return i;
    }
    return -1;
}
function matchOperation(_operations, _operatorSymbol) {
    for (const op of _operations) {
        if (op.operatorSymbol === _operatorSymbol) {
            return op;
        }
    }
    return null;
}
//# sourceMappingURL=Calculator.js.map