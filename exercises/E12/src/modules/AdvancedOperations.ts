import { IOperation } from "./IOperation";

class Modulo implements IOperation {
    public get operatorSymbol(): string {
        return "%";
    }

    public performOperation(_a: number, _b: number): number {
        return _a % _b;
    }
}

class Power implements IOperation {
    public get operatorSymbol(): string {
        return "^";
    }

    public performOperation(_a: number, _b: number): number {
        let result: number = 1;
        for (let i: number = 0; i < _b; i++)
            result *= _a;
        return result;
    }
}

class GreatestCommonDenominator implements IOperation {
    public get operatorSymbol(): string {
        return "#";
    }

    public performOperation(_a: number, _b: number): number {
        if (_a < _b) {
            const tmp: number = _a;
            _a = _b;
            _b = tmp;
        }
        while (_b > 0) {
            const c: number = _a % _b;
            _a = _b;
            _b = c;
        }
        return _a;
    }
}

export class OperationBuilder {
    public static getOperations(): Array<IOperation> {
        return [
            new Power,
            new GreatestCommonDenominator,
            new Modulo
        ];
    }
}