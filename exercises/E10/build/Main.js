"use strict";
var E10;
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
//# sourceMappingURL=Main.js.map