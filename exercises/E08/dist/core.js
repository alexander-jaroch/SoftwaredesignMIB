"use strict";
var E08;
(function (E08) {
    class Question {
        constructor(_question) {
            this.question = _question;
        }
    }
    E08.Question = Question;
    class YesNoQuestion extends Question {
        constructor(_question) {
            super(_question);
            this.isCorrect = false;
        }
        toString() {
            return this.question + "\n" + "[Y] Yes\n[N] No";
        }
        checkAnswer(_answer) {
            return this.isCorrect && _answer.toUpperCase() == "Y" || !this.isCorrect && _answer.toUpperCase() == "N";
        }
    }
    E08.YesNoQuestion = YesNoQuestion;
    class MultipleChoiceQuestion extends Question {
        constructor(_question) {
            super(_question);
            this.answers = new Array();
            this.correctAnswersArray = new Array();
        }
        toString() {
            let r = this.question + "\n";
            for (let i = 0; i < this.answers.length; i++) {
                r += "[" + letters(i) + "] " + this.answers[i] + "\n";
            }
            return r;
        }
        checkAnswer(_answer) {
            if (_answer.trim() === "" && this.correctAnswersArray.length === 0)
                return true;
            const useranswers = _answer.trim().split(" ").map(function (x) { return x.toUpperCase(); });
            if (useranswers.length == this.correctAnswersArray.length) {
                for (let i = 0; i < this.correctAnswersArray.length; i++) {
                    if (!useranswers.includes(letters(this.correctAnswersArray[i])))
                        return false;
                }
                return true;
            }
            return false;
        }
    }
    E08.MultipleChoiceQuestion = MultipleChoiceQuestion;
    class FreeTextQuestion extends Question {
        constructor(_question) {
            super(_question);
            this.correctAnswer = "";
        }
        toString() {
            return this.question + "\n";
        }
        checkAnswer(_answer) {
            return _answer == this.correctAnswer;
        }
    }
    E08.FreeTextQuestion = FreeTextQuestion;
    class SingleChoiceQuestion extends Question {
        constructor(_question) {
            super(_question);
            this.answers = new Array();
            this.correctAnswer = -1;
        }
        toString() {
            let r = this.question + "\n";
            for (let i = 0; i < this.answers.length; i++) {
                r += "[" + letters(i) + "] " + this.answers[i] + "\n";
            }
            return r;
        }
        checkAnswer(_answer) {
            return _answer.toUpperCase() == letters(this.correctAnswer);
        }
    }
    E08.SingleChoiceQuestion = SingleChoiceQuestion;
    class GuessQuestion extends Question {
        constructor(_question) {
            super(_question);
            this.corretAnswer = 0;
            this.inaccuracyRange = 0;
        }
        toString() {
            return this.question + "\n";
        }
        checkAnswer(_answer) {
            return Number.parseFloat(_answer) >= this.corretAnswer - this.inaccuracyRange && Number.parseFloat(_answer) <= this.corretAnswer + this.inaccuracyRange;
        }
    }
    E08.GuessQuestion = GuessQuestion;
    function letters(i) {
        switch (i) {
            case 0: return "A";
            case 1: return "B";
            case 2: return "C";
            case 3: return "D";
            case 4: return "E";
            case 5: return "F";
            case 6: return "G";
            case 7: return "H";
            case 8: return "I";
            case 9: return "J";
            case 10: return "K";
            case 11: return "L";
            case 12: return "M";
            case 13: return "N";
            case 14: return "O";
            case 15: return "P";
            case 16: return "Q";
            case 17: return "R";
            case 18: return "S";
            case 19: return "T";
            case 20: return "U";
            case 21: return "V";
            case 22: return "W";
            case 23: return "X";
            case 24: return "Y";
            case 25: return "Z";
            default: return "-";
        }
    }
})(E08 || (E08 = {}));
/// <reference path="Questions.ts" />
var E08;
/// <reference path="Questions.ts" />
(function (E08) {
    const q1 = new E08.YesNoQuestion("Are roses red?");
    q1.isCorrect = true;
    const q2 = new E08.SingleChoiceQuestion("Violets are...");
    q2.answers = ["blue", "violet", "red"];
    q2.correctAnswer = 1;
    const q3 = new E08.MultipleChoiceQuestion("Mercury, Venus, Earth, Mars, ...");
    q3.answers = ["Snickers", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
    q3.correctAnswersArray = [1, 2, 3, 4];
    const q4 = new E08.GuessQuestion("What is Pi?");
    q4.corretAnswer = 3.1415926535;
    q4.inaccuracyRange = 0.0000000001;
    const q5 = new E08.FreeTextQuestion("Who is the President of the United States?");
    q5.correctAnswer = "Donald Trump";
    const questions = [q1, q2, q3, q4, q5];
    const score = [0, 0];
    let input = "";
    try {
        while (input.toLowerCase() !== "q") {
            console.log("What do you want to do?", "\n[ans] Answer a question from the question pool", "\n[add] Add a new question to the question pool", "\n[q] Quit the quiz");
            input = prompt("Your Input");
            console.log(">", input);
            if (input.toLowerCase() !== "q") {
                if (input.toLowerCase() === "ans") {
                    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
                    console.log(randomQuestion.toString());
                    input = prompt("Your Answer");
                    console.log(">", input);
                    const result = randomQuestion.checkAnswer(input);
                    console.log(result ? "You're right!" : "You're wrong!");
                    score[0]++;
                    if (result)
                        score[1]++;
                    console.log(`You've got ${score[1]} out of ${score[0]} questions right!`);
                }
                else if (input.toLowerCase() === "add") {
                    console.log("What kind of question do you want to add?", "\n[yesno] Yes No Question", "\n[single] Single Choice Question", "\n[multiple] Multiple Choice Question", "\n[guess] Guess Question", "\n[text] Text Question");
                    input = prompt("Your Choice");
                    console.log(">", input);
                    switch (input.toLowerCase()) {
                        case "yesno":
                            console.log("Type in the question statement");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const yesNoQuestion = new E08.YesNoQuestion(input);
                            do {
                                console.log("Is that statement true?", "\n[Y] Yes", "\n[N] No");
                                input = prompt("Your Choice");
                                console.log(">", input);
                            } while (input.toUpperCase() !== "Y" && input.toUpperCase() !== "N");
                            yesNoQuestion.isCorrect = input.toUpperCase() === "Y";
                            questions.push(yesNoQuestion);
                            console.log("You've successfully added a Yes No Question to the pool.");
                            break;
                        case "single":
                            console.log("Type in the question.");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const singleChoiceQuestion = new E08.SingleChoiceQuestion(input);
                            let singleAnswersCount;
                            do {
                                console.log("How many answers do you want to add? You can set two to six possilbe answers. Exactly one answer must be correct.");
                                input = prompt("Your Input");
                                console.log(">", input);
                                singleAnswersCount = Number.parseInt(input);
                            } while (Number.isNaN(singleAnswersCount) || singleAnswersCount < 2 || singleAnswersCount > 6);
                            let singleChoiceAnswers = new Array();
                            let correctAnswerSet = false;
                            for (let i = 0; i < singleAnswersCount; i++) {
                                console.log(`Enter answer #${i + 1}`);
                                input = prompt("Your Input");
                                console.log(">", input);
                                singleChoiceAnswers.push(input);
                                if (!correctAnswerSet) {
                                    do {
                                        console.log("Is this the correct answer?", "\n[Y] Yes", "\n[N] No");
                                        input = prompt("Your Choice");
                                        console.log(">", input);
                                    } while (input.toUpperCase() !== "Y" && input.toUpperCase() !== "N");
                                    if (input.toUpperCase() === "Y") {
                                        singleChoiceQuestion.correctAnswer = i;
                                        correctAnswerSet = true;
                                    }
                                }
                            }
                            if (correctAnswerSet) {
                                singleChoiceQuestion.answers = singleChoiceAnswers;
                                questions.push(singleChoiceQuestion);
                                console.log("You've successfully added a Single Choice Question to the pool.");
                            }
                            else {
                                console.log("You've failed to create a new Single Choice Question, because you didn't provide a correct answer.");
                            }
                            break;
                        case "multiple":
                            console.log("Type in the question");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const multipleChoiceQuestion = new E08.MultipleChoiceQuestion(input);
                            let answersCount;
                            do {
                                console.log("How many answers do you want to add? You can set two to six possilbe answers. Several answers can be correct.");
                                input = prompt("Your Input");
                                console.log(">", input);
                                answersCount = Number.parseInt(input);
                            } while (Number.isNaN(answersCount) || answersCount < 2 || answersCount > 6);
                            let multipleChoiceAnswers = new Array();
                            for (let i = 0; i < answersCount; i++) {
                                console.log(`Enter answer #${i + 1}`);
                                input = prompt("Your Input");
                                console.log(">", input);
                                multipleChoiceAnswers.push(input);
                                do {
                                    console.log("Is this correct answer correct?", "\n[Y] Yes", "\n[N] No");
                                    input = prompt("Your Choice");
                                    console.log(">", input);
                                } while (input.toUpperCase() !== "Y" && input.toUpperCase() !== "N");
                                if (input.toUpperCase() === "Y") {
                                    multipleChoiceQuestion.correctAnswersArray.push(i);
                                }
                            }
                            multipleChoiceQuestion.answers = multipleChoiceAnswers;
                            questions.push(multipleChoiceQuestion);
                            console.log("You've successfully added a Multiple Choice Question to the pool.");
                            break;
                        case "guess":
                            console.log("Type in the question.");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const guessQuestion = new E08.GuessQuestion(input);
                            let guessValue;
                            do {
                                console.log("Please enter the exact value.");
                                input = prompt("Your Input");
                                console.log(">", input);
                                guessValue = Number.parseFloat(input);
                            } while (Number.isNaN(guessValue));
                            guessQuestion.corretAnswer = guessValue;
                            let guessMargin;
                            do {
                                console.log("Please enter a margin by which the given answer is still deemed correct.");
                                input = prompt("Your Input");
                                console.log(">", input);
                                guessMargin = Number.parseFloat(input);
                            } while (Number.isNaN(guessMargin));
                            guessQuestion.inaccuracyRange = guessMargin;
                            questions.push(guessQuestion);
                            console.log("You've successfully added a Guess Question to the pool.");
                            break;
                        case "text":
                            console.log("Type in the question.");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const textQuestion = new E08.FreeTextQuestion(input);
                            console.log("Please enter the answer text.");
                            input = prompt("Your Input");
                            console.log(">", input);
                            textQuestion.correctAnswer = input;
                            questions.push(textQuestion);
                            console.log("You've successfully added a Text Question to the pool.");
                            break;
                        default:
                            console.warn(`"${input}" is not a valid question type!`);
                    }
                }
                input = "";
            }
        }
    }
    catch (e) {
        console.error("Quiz has ended unexpectedly!");
    }
})(E08 || (E08 = {}));
//# sourceMappingURL=core.js.map