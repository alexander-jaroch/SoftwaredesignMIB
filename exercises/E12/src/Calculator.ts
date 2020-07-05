import { IOperation } from "./modules/IOperation";
import { OperationBuilder as SimpleOperations } from "./modules/SimpleOperations";
import { OperationBuilder as AdvancedOperations } from "./modules/AdvancedOperations";
import * as ReadLine from "readline";

const rl: ReadLine.ReadLine = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

main();

async function main(): Promise<void> {
    const operations: Array<IOperation> = new Array<IOperation>();
    operations.push(...SimpleOperations.getOperations());
    operations.push(...AdvancedOperations.getOperations());

    console.log("Welcome to the Calculator. Start entering calculations!");
    while (true) {
        let command: string = await readLine();
        if (command.toLowerCase() === "exit")
            break;
        command = command.replace(/\s+/g, "");
        let left: number = 0;
        let right: number = 0;
        const operatorIndex: number = findFirstNonDigit(command);
        if (operatorIndex < 0)
            console.log("No operator specified");
        else {
            const operatorSymbol: string = command.charAt(operatorIndex);
            left = Number.parseInt(command.substring(0, operatorIndex));
            right = Number.parseInt(command.substring(operatorIndex + 1));
            if (Number.isNaN(left) || Number.isNaN(right)) { // substitute for try-catch because parsing doesn't throw any errors
                console.log("Error parsing commmand");
                continue;
            }
            console.log("Calculating", left, operatorSymbol, right, "...");
            let result: number;
            const operation: IOperation = matchOperation(operations, operatorSymbol);
            if (operation) {
                result = operation.performOperation(left, right);
                console.log("...", result);
            }
            else
                console.log("Invalid operator");
        }
    }
}

function readLine(): Promise<string> {
    return new Promise<string>((resolve: (_string: string) => void): void => {
        rl.question("> ", (_answer: string) => {
            resolve(_answer);
        });
    });
}

function findFirstNonDigit(_string: string): number {
    for (let i: number = 0; i < _string.length; i++) {
        if (Number.isNaN(Number.parseInt(_string.charAt(i))))
            return i;
    }
    return -1;
}

function matchOperation(_operations: Array<IOperation>, _operatorSymbol: string): IOperation {
    for (const op of _operations) {
        if (op.operatorSymbol === _operatorSymbol) {
            return op;
        }
    }
    return null;
}