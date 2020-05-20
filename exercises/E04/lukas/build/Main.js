"use strict";
var E04Lukas;
(function (E04Lukas) {
    const subjects = ["Harry", "Hermione", "Ron", "Hagrid", "Snape", "Dumbledore"];
    const verbs = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    const objects = ["Zaubertränke", "den Grimm", "Lupin", "Hogwards", "die Karte des Rumtreibers", "Dementoren"];
    const result = new Array();
    while (!(subjects.length === 0 || verbs.length === 0 || objects.length === 0)) {
        result.push(getVerse());
    }
    result.forEach(printResult);
    function printResult(result) {
        const text = document.createTextNode(result);
        const paragraph = document.createElement("p");
        paragraph.appendChild(text);
        document.body.appendChild(paragraph);
    }
    function getVerse() {
        let filler;
        const subjectsingle = subjects.splice(Math.floor(Math.random() * subjects.length), 1)[0];
        const verbsingle = verbs.splice(Math.floor(Math.random() * verbs.length), 1)[0];
        const objectsingle = objects.splice(Math.floor(Math.random() * objects.length), 1)[0];
        filler = subjectsingle + " " + verbsingle + " " + objectsingle + ".";
        return filler;
    }
})(E04Lukas || (E04Lukas = {}));
//# sourceMappingURL=Main.js.map