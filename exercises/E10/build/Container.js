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
//# sourceMappingURL=Container.js.map