"use strict";
var E09;
(function (E09) {
    // output display
    const outputDiv = document.createElement("div");
    outputDiv.classList.add("padding");
    document.body.appendChild(outputDiv);
    // input line
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("input", "padding");
    document.body.appendChild(inputDiv);
    const inputElt = document.createElement("input");
    inputElt.type = "text";
    inputDiv.appendChild(inputElt);
    // dark mode button
    const mode = document.createElement("div");
    mode.classList.add("mode");
    mode.addEventListener("click", changeMode);
    function changeMode() {
        document.body.classList.toggle("dark");
    }
    document.body.appendChild(mode);
    // ???
    addEventListener("click", () => { inputElt.focus(); });
    Main();
    // Main
    async function Main() {
        const quiz = new E09.Quiz(await (await fetch("DefaultQuestions.json")).json());
        let input;
        printLn("The Quiz\n========");
        do {
            printLn("[ANS] answer a question\n[ADD] add a question\n[SVQ] save questions\n[CLC] clear console\n[ Q ] quit quiz");
            input = await getInput();
            switch (prepareInput(input)) {
                // answer a question
                case "ANS":
                    printLn(quiz.currentQuestion.toString());
                    input = await getInput();
                    const isRight = quiz.answerCurrentQuestion(input);
                    if (isRight)
                        printLn("You're right!");
                    else
                        printLn("You're wrong!");
                    printLn(quiz.score + "\n");
                    break;
                // add a question
                case "ADD":
                    break;
                // save questions
                case "SVQ":
                    const questionString = JSON.stringify(quiz);
                    const questionBlob = new Blob([questionString], { type: "application/json" });
                    printLn("Filename: ");
                    input = await getInput();
                    print("File ready... ");
                    printDl(URL.createObjectURL(questionBlob), input);
                    printLn(" (" + questionBlob.size + " Bytes)\n");
                    break;
                case "CLC":
                    outputDiv.innerHTML = "";
                    printLn("The Quiz\n========");
            }
        } while (!["Q", "QUIT", "EXIT"].includes(prepareInput(input)));
        inputElt.disabled = true;
        inputElt.value = "Quiz ended.";
    }
    // prepares input for switch cases
    function prepareInput(_input) {
        return _input.trim().toUpperCase();
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
                    printLn("> " + value);
                    inputElt.scrollIntoView();
                    resolve(value);
                }
            };
            inputElt.addEventListener("keydown", keydownEvent);
        });
    }
    // prints a line on custom console
    function printLn(_text = "") {
        print(_text);
        outputDiv.appendChild(document.createElement("br"));
    }
    // prints on custom console
    function print(_text) {
        const textParts = _text.split("\n");
        for (let i = 0; i < textParts.length; i++) {
            outputDiv.appendChild(new Text(textParts[i]));
            if (i < textParts.length - 1)
                outputDiv.appendChild(document.createElement("br"));
        }
    }
    // prints a download url
    function printDl(_url, _filename) {
        const download = document.createElement("a");
        _filename += ".json";
        download.href = _url;
        download.download = _filename;
        download.appendChild(new Text(_filename));
        outputDiv.appendChild(download);
    }
})(E09 || (E09 = {}));
//# sourceMappingURL=Main.js.map