"use strict";
var E04;
(function (E04) {
    const subjects = [
        "Harry",
        "Hermione",
        "Ron",
        "Hagrid",
        "Snape",
        "Dumbledore"
    ];
    const verbs = [
        "braut",
        "liebt",
        "studiert",
        "hasst",
        "zaubert",
        "zerstört"
    ];
    const objects = [
        "Zaubertränke",
        "den Grimm",
        "Lupin",
        "Hogwards",
        "die Karte des Rumtreibers",
        "Dementoren"
    ];
    const verses = new Array();
    while (hasVerses()) {
        verses.push(getVerse());
    }
    printVerses(verses);
    function hasVerses() {
        return Math.min(subjects.length, verbs.length, objects.length) > 0;
    }
    function getVerse() {
        return getRandom(subjects) + " " + getRandom(verbs) + " " + getRandom(objects) + ".";
    }
    function getRandom(_arr) {
        const str = _arr.splice(Math.floor(Math.random() * _arr.length), 1);
        return str[0];
    }
    function printVerses(_verses) {
        _verses.forEach(printVerse);
    }
    function printVerse(_verse) {
        const text = document.createTextNode(_verse);
        const p = document.createElement("p");
        p.appendChild(text);
        document.body.appendChild(p);
    }
})(E04 || (E04 = {}));
//# sourceMappingURL=core.js.map