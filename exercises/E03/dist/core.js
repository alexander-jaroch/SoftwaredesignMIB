"use strict";
var E03;
(function (E03) {
    let eingabe;
    eingabe = prompt("Eingabe");
    // erzeuge Array mit Länge von Eingabe
    const tmpEingabe3 = new Array(eingabe.length);
    for (let i = 0; i < eingabe.length; i++) {
        tmpEingabe3[i] = eingabe[i];
    }
    tmpEingabe3.reverse();
    const tmpAusgabe3 = tmpEingabe3.join("");
    const tmpEingabe2 = eingabe.split(" ");
    tmpEingabe2.reverse();
    const tmpAusgabe2 = tmpEingabe2.join(" ");
    const tmpEingabe1 = new Array(eingabe.length);
    for (let i = 0; i < eingabe.length; i++) {
        tmpEingabe1[i] = tmpAusgabe2[i];
    }
    tmpEingabe1.reverse();
    const tmpAusgabe1 = tmpEingabe1.join("");
    console.log(tmpAusgabe1);
    console.log(tmpAusgabe2);
    console.log(tmpAusgabe3);
})(E03 || (E03 = {}));
//# sourceMappingURL=core.js.map