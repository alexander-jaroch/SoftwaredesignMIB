"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationBuilder = void 0;
class Modulo {
    get operatorSymbol() {
        return "%";
    }
    performOperation(_a, _b) {
        return _a % _b;
    }
}
class Power {
    get operatorSymbol() {
        return "^";
    }
    performOperation(_a, _b) {
        let result = 1;
        for (let i = 0; i < _b; i++)
            result *= _a;
        return result;
    }
}
class GreatestCommonDenominator {
    get operatorSymbol() {
        return "#";
    }
    performOperation(_a, _b) {
        if (_a < _b) {
            const tmp = _a;
            _a = _b;
            _b = tmp;
        }
        while (_b > 0) {
            const c = _a % _b;
            _a = _b;
            _b = c;
        }
        return _a;
    }
}
class OperationBuilder {
    static getOperations() {
        return [
            new Power,
            new GreatestCommonDenominator,
            new Modulo
        ];
    }
}
exports.OperationBuilder = OperationBuilder;
//# sourceMappingURL=AdvancedOperations.js.map