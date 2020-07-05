"use strict";
var E02;
(function (E02) {
    console.groupCollapsed("Simple");
    console.log("Dies ist eine Log-Ausgabe");
    console.error("Dies ist eine Fehler-Ausgabe");
    console.info("Dies ist eine Info-Ausgabe");
    console.warn("Dies ist eine Warnung");
    console.groupEnd();
    console.groupCollapsed("Complex");
    let x = 10;
    let y = "Hallo";
    let a = [123, 321, 34];
    let o = { firstname: "Egzon", lastname: "Denaj", age: 25 };
    console.log(x, y, a, o);
    let h = document.querySelector("h1");
    console.log(h);
    console.groupEnd();
    console.groupCollapsed("Count");
    for (let i = 0; i < 10; i++) {
        console.count("counter");
    }
    console.groupEnd();
    console.groupCollapsed("Table");
    let students = new Array();
    students.push(o);
    students.push({ firstname: "Manuel", lastname: "Proß", age: 24 });
    students.push({ firstname: "Christian", lastname: "Micka", age: 27 });
    students.push({ firstname: "Vincent", lastname: "Junghans", age: 21 });
    console.table(students);
    console.groupEnd();
    console.groupCollapsed("Timer");
    console.time("Timer");
    let loops = 1000;
    for (let i = 0; i < loops; i++) {
        console.log(loops);
    }
    console.timeEnd("Timer");
    console.groupEnd();
    console.group("Assertion");
    console.assert(false, "Das sieht man");
    console.assert(true, "Das sieht man nicht");
    console.groupEnd();
})(E02 || (E02 = {}));
//# sourceMappingURL=core.js.map