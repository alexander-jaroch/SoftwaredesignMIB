"use strict";
var E09;
(function (E09) {
    const predefinedQuestions = [
        new E09.TrueFalseQuestion("Is Berlin the capital of Germany?", true),
        new E09.MultipleChoiceQuestion("Which cities are capitals?", [
            new E09.Answer("Furtwangen", false),
            new E09.Answer("Berlin", true),
            new E09.Answer("Paris", true)
        ]),
        new E09.GuessQuestion("What is Pi?", 3.141, 0.001),
        new E09.TextQuestion("Who is teaching Software Design at HFU?", "Jirka Dell'Oro-Friedl")
    ];
    const outputElt = document.createElement("div");
    document.body.appendChild(outputElt);
    const inputElt = document.createElement("input");
    inputElt.type = "text";
    document.body.appendChild(inputElt);
    /*const modeBtn: HTMLDivElement = document.createElement("div");
    modeBtn.id = "modeBtn";
    modeBtn.dataset.mode = "light";
    modeBtn.addEventListener("click", () => {
        if (modeBtn.dataset.mode === "light") {
            document.body.classList.add("darkmode");
            modeBtn.dataset.mode = "dark";
        } else {
            document.body.classList.remove("darkmode");
            modeBtn.dataset.mode = "light";
        }
    });
    document.body.appendChild(modeBtn);*/
    // ???
    addEventListener("click", () => { inputElt.focus(); });
    Main();
    // Main
    async function Main() {
        const quiz = new E09.Quiz(predefinedQuestions);
        printLn("The Quiz");
        printLn("========");
        let input;
        do {
            printLn(quiz.currentQuestion.toString());
            input = await getInput();
            printLn("> " + input);
            printLn(quiz.answerCurrentQuestion(input) + "");
            printLn(quiz.score);
        } while (input !== "exit");
        inputElt.disabled = true;
        inputElt.value = "Quiz ended.";
    }
    // waits for user input
    function getInput() {
        inputElt.focus();
        return new Promise(function (resolve) {
            const keydownEvent = (event) => {
                if (event.key === "Enter") {
                    const value = inputElt.value;
                    inputElt.value = "";
                    inputElt.removeEventListener("keydown", keydownEvent);
                    resolve(value);
                }
            };
            inputElt.addEventListener("keydown", keydownEvent);
        });
    }
    // prints a line on custom console
    function printLn(_text) {
        const textParts = _text.split("\n");
        for (const part of textParts) {
            outputElt.appendChild(new Text(part));
            outputElt.appendChild(document.createElement("br"));
        }
    }
})(E09 || (E09 = {}));
//# sourceMappingURL=Main.js.map