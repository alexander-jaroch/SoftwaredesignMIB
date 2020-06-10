"use strict";
var E09;
(function (E09) {
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
        const defaultQuestions = await (await fetch("DefaultQuestions.json")).json();
        const quiz = new E09.Quiz(defaultQuestions);
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