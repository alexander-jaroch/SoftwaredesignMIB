import { IOperation } from "./IOperation";

class Addition implements IOperation {
    public get operatorSymbol(): string {
        return "+";
    }

    public performOperation(_a: number, _b: number): number {
        return _a + _b;
    }
}

class Subtraction implements IOperation {
    public get operatorSymbol(): string {
        return "-";
    }

    public performOperation(_a: number, _b: number): number {
        return _a - _b;
    }
}

class Multiplication implements IOperation {
    public get operatorSymbol(): string {
        return "*";
    }

    public performOperation(_a: number, _b: number): number {
        return _a * _b;
    }
}

class Division implements IOperation {
    public get operatorSymbol(): string {
        return "/";
    }

    public performOperation(_a: number, _b: number): number {
        return _a / _b;
    }
}

export class OperationBuilder {
    public static getOperations(): Array<IOperation> {
        return [
            new Addition,
            new Subtraction,
            new Multiplication,
            new Division
        ];
    }
}