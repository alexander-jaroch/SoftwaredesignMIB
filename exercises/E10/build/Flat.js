"use strict";
var E10;
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
//# sourceMappingURL=Flat.js.map