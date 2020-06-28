export interface IOperation {
    operatorSymbol: string;
    performOperation(_a: number, _b: number): number;
}