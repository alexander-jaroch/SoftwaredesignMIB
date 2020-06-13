"use strict";
var E09;
(function (E09) {
    const htmlOutput = document.createElement("div");
    const htmlInput = document.createElement("input");
    initConsole();
    Main();
    // Main
    async function Main() {
        const questionData = await (await fetch("DefaultQuestions.json")).json();
        const quiz = new E09.Quiz(questionData);
        let input;
        do {
            log("What do you want to do?\n", "[A] answer a question\n", "[B] add a question\n", "[C] clear screen\n", "[H] help\n", "[L] load questions\n", "[S] save questions\n", "[Q] quit quiz");
            input = prepareInput(await getInput());
            switch (input) {
                case "A":
                    await answerQuestion(quiz);
                    break;
                case "B":
                    await addQuestion(quiz);
                    break;
                case "C":
                    await clearOutput();
                    break;
                case "H":
                    await help();
                    break;
                case "L":
                    await loadQuestions(quiz);
                    break;
                case "S": await saveQuestions(quiz);
            }
        } while (!["Q", "QUIT", "EXIT"].includes(input));
        htmlInput.disabled = true;
        htmlInput.value = "Quiz ended.";
    }
    async function answerQuestion(_quiz) {
        log(_quiz.currentQuestion.toString());
        const input = await getInput();
        const isRight = _quiz.answerCurrentQuestion(input);
        if (isRight)
            log("You're right!");
        else
            log("You're wrong!");
        log(_quiz.score, "\n");
    }
    async function addQuestion(_quiz) {
        log("What kind of question do you want to add?\n", "[M] Multiple Choice Question\n", "[Y] True or False Question\n", "[G] Guess Question\n", "[T] Text Question\n", "[Q] Go Back");
        const input = prepareInput(await getInput());
        switch (input) {
            case "M":
                await addMultipleChoiceQuestion(_quiz);
                break;
            case "Y":
                await addTrueFalseQuestion(_quiz);
                break;
            case "G":
                await addGuessQuestion(_quiz);
                break;
            case "T":
                await addTextQuestion(_quiz);
                break;
            case "Q":
                log("No question added.\n");
                break;
            default:
                log(`Failed to add a question of type "${input}"\n`);
        }
    }
    async function addMultipleChoiceQuestion(_quiz) {
        log("Please enter your question.");
        const questionText = prepareText(await getInput());
        const answers = new Array();
        let answerText;
        do {
            log("Enter an answer.");
            answerText = prepareText(await getInput());
            if (answerText !== "") {
                log("Is this answer correct?\n", "[Y] Yes\n", "[N] No");
                let isRight;
                do
                    isRight = prepareInput(await getInput());
                while (!["Y", "N"].includes(isRight));
                answers.push(new E09.Answer(answerText, isRight === "Y"));
            }
        } while (answers.length < 2 && answerText === "" || answers.length < 6 && answerText !== "");
        _quiz.addQuestion(new E09.MultipleChoiceQuestion(questionText, answers));
    }
    async function addTrueFalseQuestion(_quiz) {
        log("Please enter your statement.");
        const questionText = prepareText(await getInput());
        log("Is this statement true?\n", "[Y] Yes\n", "[N] No");
        let isRight;
        do
            isRight = prepareInput(await getInput());
        while (!["Y", "N"].includes(isRight));
        _quiz.addQuestion(new E09.TrueFalseQuestion(questionText, isRight === "Y"));
    }
    async function addGuessQuestion(_quiz) {
        log("Please enter your question.");
        const questionText = prepareText(await getInput());
        log("Please enter the correct value.");
        let value;
        do
            value = Number.parseFloat(await getInput());
        while (Number.isNaN(value));
        log("Please enter a tolerance value.");
        let tolerance;
        do
            tolerance = Number.parseFloat(await getInput());
        while (Number.isNaN(tolerance));
        _quiz.addQuestion(new E09.GuessQuestion(questionText, value, tolerance));
    }
    async function addTextQuestion(_quiz) {
        log("Please enter your question.");
        const questionText = prepareText(await getInput());
        log("Please type in the correct answer.");
        const answerText = prepareText(await getInput());
        _quiz.addQuestion(new E09.TextQuestion(questionText, answerText));
    }
    async function clearOutput() {
        while (htmlOutput.firstChild)
            htmlOutput.lastChild.remove();
    }
    async function help() {
        log("There are four types of questions:\n", "- Multiple Choice: You have to choose the right answers to a question from a set of answers.\n", "- True False: You have to decide wether a statement is true or not.\n", "- Guess: You have to guess a number representing the answer to a question.\n", "- Text: You have to type in the answer to a question.\n");
    }
    async function loadQuestions(_quiz) {
        const file = await getFile();
        if (file) {
            log("Loading from file...");
            if (file.type === "application/json") {
                const text = await file.text();
                try {
                    const json = JSON.parse(text);
                    _quiz.initQuestions(json);
                }
                catch (e) {
                    log("Could not parse JSON!");
                }
            }
            else {
                log("Wrong file type! File type needs to be .json.");
            }
        }
        else {
            log("Loading aborted.\n");
        }
    }
    async function saveQuestions(_quiz) {
        const questionString = JSON.stringify(_quiz.json());
        const questionBlob = new Blob([questionString], { type: "application/json" });
        log("Please enter a filename.");
        const filename = await getInput();
        log("File ready...", `download(${URL.createObjectURL(questionBlob)}, ${filename}.json)`, `(${questionBlob.size} Bytes)\n`);
    }
    function prepareText(_text) {
        return _text.trim().replace(/\s+/g, " ");
    }
    function prepareInput(_input) {
        return _input.trim().toUpperCase();
    }
    function getFile() {
        const htmlFile = document.createElement("input");
        htmlFile.accept = ".json";
        htmlFile.type = "file";
        htmlFile.classList.add("file");
        htmlOutput.appendChild(htmlFile);
        log("Press enter to continue.");
        return new Promise(function (resolve) {
            const keydownEvent = (event) => {
                if (event.key === "Enter") {
                    htmlFile.disabled = true;
                    htmlInput.removeEventListener("keydown", keydownEvent);
                    resolve(htmlFile.files[0]);
                }
            };
            htmlInput.addEventListener("keydown", keydownEvent);
        });
    }
    function getInput() {
        htmlInput.focus();
        return new Promise(function (resolve) {
            const keydownEvent = (event) => {
                if (event.key === "Enter") {
                    const value = htmlInput.value;
                    htmlInput.value = "";
                    htmlInput.removeEventListener("keydown", keydownEvent);
                    log("> " + value);
                    htmlInput.scrollIntoView();
                    resolve(value);
                }
            };
            htmlInput.addEventListener("keydown", keydownEvent);
        });
    }
    function log(...args) {
        for (let i = 0; i < args.length; i++) {
            const lines = args[i].split("\n");
            for (let k = 0; k < lines.length; k++) {
                const matches = /^download\((.*?),\s?(.*)\)$/.exec(lines[k]);
                if (matches) {
                    const htmlAnchor = document.createElement("a");
                    htmlAnchor.href = matches[1];
                    htmlAnchor.download = matches[2];
                    htmlAnchor.appendChild(new Text(matches[2]));
                    htmlOutput.appendChild(htmlAnchor);
                }
                else
                    htmlOutput.appendChild(new Text(lines[k]));
                if (k < lines.length - 1)
                    htmlOutput.appendChild(document.createElement("br"));
            }
            if (i < args.length - 1)
                htmlOutput.appendChild(new Text(" "));
        }
        htmlOutput.appendChild(document.createElement("br"));
    }
    function initConsole() {
        htmlOutput.classList.add("padding");
        document.body.appendChild(htmlOutput);
        const htmlInputWrapper = document.createElement("div");
        htmlInputWrapper.classList.add("input", "padding");
        document.body.appendChild(htmlInputWrapper);
        htmlInput.type = "text";
        const inputFocus = () => htmlInput.focus();
        htmlInputWrapper.appendChild(htmlInput);
        addEventListener("click", inputFocus);
        const htmlMode = document.createElement("div");
        htmlMode.classList.add("mode");
        const changeMode = () => document.body.classList.toggle("dark");
        htmlMode.addEventListener("click", changeMode);
        document.body.appendChild(htmlMode);
    }
})(E09 || (E09 = {}));
//# sourceMappingURL=Main.js.map