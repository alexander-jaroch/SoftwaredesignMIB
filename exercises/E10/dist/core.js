"use strict";
var E10;
(function (E10) {
    class Container {
        constructor() {
            this.properties = new Array();
        }
        add(_property) {
            this.properties.push(_property);
        }
        raiseTaxes(_percentage) {
            for (const property of this.properties)
                property.raiseTax(_percentage);
        }
        print() {
            for (const property of this.properties)
                property.print();
        }
    }
    E10.Container = Container;
})(E10 || (E10 = {}));
/// <reference path="Property.ts" />
var E10;
/// <reference path="Property.ts" />
(function (E10) {
    class Flat {
        constructor(_address, _rent, _tax) {
            this.address = _address;
            this.rent = _rent;
            this.tax = _tax;
        }
        raiseRent(_percentage) {
            this.rent += this.rent * _percentage;
        }
        raiseTax(_percentage) {
            this.tax += _percentage;
        }
        print() {
            console.log("The rent for the flat at", this.address, "amounts to EUR", this.rent, "and", this.tax, "taxes");
        }
    }
    E10.Flat = Flat;
})(E10 || (E10 = {}));
/// <reference path="Flat.ts" />
/// <reference path="Container.ts" />
var E10;
/// <reference path="Flat.ts" />
/// <reference path="Container.ts" />
(function (E10) {
    const container = new E10.Container();
    const f1 = new E10.Flat("Musterstr. 1", 400, 0.065);
    const f2 = new E10.Flat("Musterstr. 2", 6000, 0.065);
    const f3 = new E10.Flat("Musterstr. 3", 666, 0.065);
    const f4 = new E10.Flat("Musterstr. 4", 3141, 0.065);
    const f5 = new E10.Flat("Am Großhausberg 2", 266, 0.065);
    container.add(f1);
    container.add(f2);
    container.add(f3);
    container.add(f4);
    container.add(f5);
    container.print();
    container.raiseTaxes(0.5);
    container.print();
})(E10 || (E10 = {}));
//# sourceMappingURL=core.js.map