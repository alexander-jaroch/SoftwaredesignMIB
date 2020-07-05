namespace E04Lukas {
    const subjects: Array<string> = ["Harry", "Hermione", "Ron", "Hagrid", "Snape", "Dumbledore"];
    const verbs: Array<string> = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    const objects: Array<string> = ["Zaubertränke", "den Grimm", "Lupin", "Hogwards", "die Karte des Rumtreibers", "Dementoren"];

    const result: Array<string> = new Array<string>();
    while (!(subjects.length === 0 || verbs.length === 0 || objects.length === 0)) {
        result.push(getVerse());
    }
    result.forEach(printResult);

    function printResult(result: string): void {
        const text: Text = document.createTextNode(result);
        const paragraph: HTMLParagraphElement = document.createElement("p");
        paragraph.appendChild(text);
        document.body.appendChild(paragraph);
    }

    function getVerse(): string {
        let filler: string;
        const subjectsingle: string = subjects.splice(Math.floor(Math.random() * subjects.length), 1)[0];
        const verbsingle: string = verbs.splice(Math.floor(Math.random() * verbs.length), 1)[0];
        const objectsingle: string = objects.splice(Math.floor(Math.random() * objects.length), 1)[0];

        filler = subjectsingle + " " + verbsingle + " " + objectsingle + ".";
        return filler;
    }
}