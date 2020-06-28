"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationBuilder = void 0;
class Addition {
    get operatorSymbol() {
        return "+";
    }
    performOperation(_a, _b) {
        return _a + _b;
    }
}
class Subtraction {
    get operatorSymbol() {
        return "-";
    }
    performOperation(_a, _b) {
        return _a - _b;
    }
}
class Multiplication {
    get operatorSymbol() {
        return "*";
    }
    performOperation(_a, _b) {
        return _a * _b;
    }
}
class Division {
    get operatorSymbol() {
        return "/";
    }
    performOperation(_a, _b) {
        return _a / _b;
    }
}
class OperationBuilder {
    static getOperations() {
        return [
            new Addition,
            new Subtraction,
            new Multiplication,
            new Division
        ];
    }
}
exports.OperationBuilder = OperationBuilder;
//# sourceMappingURL=SimpleOperations.js.map