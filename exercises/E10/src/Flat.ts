/// <reference path="Property.ts" />

namespace E10 {
    export class Flat implements Property {
        public address: string;
        public rent: number;
        public tax: number;

        public constructor(_address: string, _rent: number, _tax: number) {
            this.address = _address;
            this.rent = _rent;
            this.tax = _tax;
        }

        public raiseRent(_percentage: number): void {
            this.rent += this.rent * _percentage;
        }

        public raiseTax(_percentage: number): void {
            this.tax += _percentage;
        }

        public print(): void {
            console.log("The rent for the flat at", this.address, "amounts to EUR", this.rent, "and", this.tax, "taxes");
        }
    }
}