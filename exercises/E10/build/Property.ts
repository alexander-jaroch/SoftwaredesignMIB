namespace E10 {
    export interface Property {
        address: string;
        tax: number;
        raiseTax(_percentage: number): void;
        print(): void;
    }
}