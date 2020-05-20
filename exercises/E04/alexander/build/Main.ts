namespace E04 {
    const subjects: Array<string> = [
        "Harry",
        "Hermione",
        "Ron",
        "Hagrid",
        "Snape",
        "Dumbledore"
    ];

    const verbs: Array<string> = [
        "braut",
        "liebt",
        "studiert",
        "hasst",
        "zaubert",
        "zerstört"
    ];

    const objects: Array<string> = [
        "Zaubertränke",
        "den Grimm",
        "Lupin",
        "Hogwards",
        "die Karte des Rumtreibers",
        "Dementoren"
    ];

    const verses: Array<string> = new Array<string>();

    while (hasVerses()) {
        verses.push(getVerse());
    }

    printVerses(verses);

    function hasVerses(): boolean {
        return Math.min(subjects.length, verbs.length, objects.length) > 0;
    }

    function getVerse(): string {
        return getRandom(subjects) + " " + getRandom(verbs) + " " + getRandom(objects) + ".";
    }

    function getRandom(_arr: Array<string>): string {
        const str: Array<string> = _arr.splice(Math.floor(Math.random() * _arr.length), 1);
        return str[0];
    }

    function printVerses(_verses: Array<string>): void {
        _verses.forEach(printVerse);
    }

    function printVerse(_verse: string): void {
        const text: Text = document.createTextNode(_verse);
        const p: HTMLParagraphElement = document.createElement("p");
        p.appendChild(text);
        document.body.appendChild(p);
    }
}