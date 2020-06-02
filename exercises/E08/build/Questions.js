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
//# sourceMappingURL=Questions.js.map