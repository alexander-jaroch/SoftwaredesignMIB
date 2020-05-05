namespace UML1 {

    let eingabe: string;
    eingabe = prompt("Eingabe");

    // erzeuge Array mit Länge von Eingabe
    const tmpEingabe3: Array<string> = new Array(eingabe.length);
    for (let i: number = 0; i < eingabe.length; i++) {
        tmpEingabe3[i] = eingabe[i];
    }
    tmpEingabe3.reverse();
    const tmpAusgabe3: string = tmpEingabe3.join("");

    const tmpEingabe2: Array<string> = eingabe.split(" ");
    tmpEingabe2.reverse();
    const tmpAusgabe2: string = tmpEingabe2.join(" ");

    const tmpEingabe1: Array<string> = new Array(eingabe.length);
    for (let i: number = 0; i < eingabe.length; i++) {
        tmpEingabe1[i] = tmpAusgabe2[i];
    }
    tmpEingabe1.reverse();
    const tmpAusgabe1: string = tmpEingabe1.join("");

    console.log(tmpAusgabe1);
    console.log(tmpAusgabe2);
    console.log(tmpAusgabe3);

}