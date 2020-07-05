"use strict";
var E09;
(function (E09) {
    class Answer {
        constructor(_text, _isRight) {
            this.text = _text;
            this.isRight = _isRight;
        }
        static parse(_json) {
            return new Answer(_json.text, _json.isRight);
        }
        toString() {
            return "[" + this.letter + "] " + this.text;
        }
        check() {
            return this.isRight;
        }
        json() {
            return {
                text: this.text,
                isRight: this.isRight
            };
        }
    }
    E09.Answer = Answer;
})(E09 || (E09 = {}));
var E09;
(function (E09) {
    class Question {
        constructor(_text) {
            this.text = _text;
        }
    }
    E09.Question = Question;
})(E09 || (E09 = {}));
/// <reference path="Question.ts" />
var E09;
/// <reference path="Question.ts" />
(function (E09) {
    class GuessQuestion extends E09.Question {
        constructor(_text, _answer, _tolerance) {
            super(_text);
            this.answer = _answer;
            this.tolerance = _tolerance;
        }
        static parse(_json) {
            return new GuessQuestion(_json.text, _json.answer, _json.tolerance);
        }
        toString() {
            return this.text;
        }
        check(_input) {
            const input = Number.parseFloat(_input.trim());
            if (!Number.isNaN(input)) {
                return this.answer - this.tolerance <= input && input <= this.answer + this.tolerance;
            }
            else
                return false;
        }
        json() {
            return {
                type: "GuessQuestion",
                text: this.text,
                answer: this.answer,
                tolerance: this.tolerance
            };
        }
    }
    E09.GuessQuestion = GuessQuestion;
})(E09 || (E09 = {}));
/// <reference path="Question.ts" />
/// <reference path="Answer.ts" />
var E09;
/// <reference path="Question.ts" />
/// <reference path="Answer.ts" />
(function (E09) {
    class MultipleChoiceQuestion extends E09.Question {
        constructor(_text, _answers) {
            super(_text);
            this.answers = _answers;
        }
        static parse(_json) {
            return new MultipleChoiceQuestion(_json.text, _json.answers.map(x => E09.Answer.parse(x)));
        }
        toString() {
            const letterSet = ["A", "B", "C", "D", "E", "F"];
            const usedIndices = new Array();
            let questionStr = this.text;
            for (let i = 0; i < this.answers.length; i++) {
                let randomIndex;
                do
                    randomIndex = Math.floor(Math.random() * this.answers.length);
                while (usedIndices.includes(randomIndex));
                usedIndices.push(randomIndex);
                this.answers[randomIndex].letter = letterSet[i];
                questionStr += "\n" + this.answers[randomIndex].toString();
            }
            return questionStr;
        }
        check(_input) {
            const input = _input.toUpperCase().replace(/,?\s*/g, "").split("");
            for (const answer of this.answers) {
                if (answer.check() && !input.includes(answer.letter) || input.includes(answer.letter) && !answer.check())
                    return false;
            }
            return true;
        }
        json() {
            return {
                type: "MultipleChoiceQuestion",
                text: this.text,
                answers: this.answers.map(x => x.json())
            };
        }
    }
    E09.MultipleChoiceQuestion = MultipleChoiceQuestion;
})(E09 || (E09 = {}));
/// <reference path="Question.ts" />
var E09;
/// <reference path="Question.ts" />
(function (E09) {
    class TrueFalseQuestion extends E09.Question {
        constructor(_text, _isTrue) {
            super(_text);
            this.answer = _isTrue;
        }
        static parse(_json) {
            return new TrueFalseQuestion(_json.text, _json.answer);
        }
        toString() {
            return this.text + "\n[Y] Yes\n[N] No";
        }
        check(_input) {
            const input = _input.trim().toUpperCase();
            return this.answer && input === "Y" || !this.answer && input === "N";
        }
        json() {
            return {
                type: "TrueFalseQuestion",
                text: this.text,
                answer: this.answer
            };
        }
    }
    E09.TrueFalseQuestion = TrueFalseQuestion;
})(E09 || (E09 = {}));
/// <reference path="Question.ts" />
var E09;
/// <reference path="Question.ts" />
(function (E09) {
    class TextQuestion extends E09.Question {
        constructor(_text, _answer) {
            super(_text);
            this.answer = _answer;
        }
        static parse(_json) {
            return new TextQuestion(_json.text, _json.answer);
        }
        toString() {
            return this.text;
        }
        check(_input) {
            return _input.trim().replace(/\s+/g, " ") === this.answer;
        }
        json() {
            return {
                type: "TextQuestion",
                text: this.text,
                answer: this.answer
            };
        }
    }
    E09.TextQuestion = TextQuestion;
})(E09 || (E09 = {}));
/// <reference path="MultipleChoiceQuestion.ts" />
/// <reference path="TrueFalseQuestion.ts" />
/// <reference path="GuessQuestion.ts" />
/// <reference path="TextQuestion.ts" />
var E09;
/// <reference path="MultipleChoiceQuestion.ts" />
/// <reference path="TrueFalseQuestion.ts" />
/// <reference path="GuessQuestion.ts" />
/// <reference path="TextQuestion.ts" />
(function (E09) {
    class Quiz {
        constructor(_questions) {
            this.initQuestions(_questions);
            this.questionIndex = -1;
            this.answerCount = 0;
            this.correctCount = 0;
            this.changeCurrentQuestion();
        }
        get currentQuestion() {
            return this.questions[this.questionIndex];
        }
        get score() {
            return "Score: " + this.correctCount + " of " + this.answerCount + " (" + Math.round((this.correctCount / this.answerCount) * 10000) / 100 + "%)";
        }
        addQuestion(_question) {
            this.questions.push(_question);
        }
        answerCurrentQuestion(_input) {
            const isRight = this.questions[this.questionIndex].check(_input);
            this.answerCount++;
            if (isRight)
                this.correctCount++;
            this.changeCurrentQuestion();
            return isRight;
        }
        json() {
            let questionData = new Array();
            for (const question of this.questions) {
                questionData.push(question.json());
            }
            return questionData;
        }
        initQuestions(_questionSet) {
            this.questions = new Array();
            for (let i = 0; i < _questionSet.length; i++) {
                switch (_questionSet[i].type) {
                    case "MultipleChoiceQuestion":
                        this.questions.push(E09.MultipleChoiceQuestion.parse(_questionSet[i]));
                        break;
                    case "TrueFalseQuestion":
                        this.questions.push(E09.TrueFalseQuestion.parse(_questionSet[i]));
                        break;
                    case "GuessQuestion":
                        this.questions.push(E09.GuessQuestion.parse(_questionSet[i]));
                        break;
                    case "TextQuestion":
                        this.questions.push(E09.TextQuestion.parse(_questionSet[i]));
                        break;
                }
            }
        }
        changeCurrentQuestion() {
            let randomIndex;
            do
                randomIndex = Math.floor(Math.random() * this.questions.length);
            while (randomIndex === this.questionIndex);
            this.questionIndex = randomIndex;
        }
    }
    E09.Quiz = Quiz;
})(E09 || (E09 = {}));
/// <reference path="Quiz.ts" />
var E09;
/// <reference path="Quiz.ts" />
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
                    clearOutput();
                    break;
                case "H":
                    help();
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
    function clearOutput() {
        while (htmlOutput.firstChild)
            htmlOutput.lastChild.remove();
    }
    function help() {
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
//# sourceMappingURL=core.js.map