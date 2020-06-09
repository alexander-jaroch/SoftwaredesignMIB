"use strict";
var E09;
(function (E09) {
    class Question {
        constructor(_text) {
            this.text = _text;
        }
    }
    E09.Question = Question;
    class ChoiceQuestion extends Question {
        constructor(_text, _answers) {
            super(_text);
            this.answers = _answers;
        }
        shuffleAnswers() {
            for (let i = 0; i < this.answers.length; i++) {
                let r = Math.floor(Math.random() * this.answers.length);
                let t = this.answers[i];
                this.answers[i] = this.answers[r];
                this.answers[r] = t;
            }
        }
        assignLetters(_set = ["A", "B", "C", "D", "E", "F"]) {
            for (let i = 0; i < this.answers.length; i++) {
                this.answers[i].letter = _set[i];
            }
        }
    }
    E09.ChoiceQuestion = ChoiceQuestion;
    class TrueFalseQuestion extends ChoiceQuestion {
        constructor(_text, _isTrue) {
            const answers = [
                new E09.Answer("Yes", _isTrue),
                new E09.Answer("No", !_isTrue)
            ];
            super(_text, answers);
            this.assignLetters(["Y", "N"]);
        }
        toString() {
            this.shuffleAnswers();
            let r = this.text;
            for (const answer of this.answers) {
                r += "\n" + answer.toString();
            }
            return r;
        }
        check(_input) {
            for (const answer of this.answers)
                if (_input.trim().toUpperCase() === answer.letter)
                    return answer.check();
            return false;
        }
    }
    E09.TrueFalseQuestion = TrueFalseQuestion;
    class MultipleChoiceQuestion extends ChoiceQuestion {
        toString() {
            this.shuffleAnswers();
            this.assignLetters();
            let r = this.text;
            for (const answer of this.answers) {
                r += "\n" + answer.toString();
            }
            return r;
        }
        check(_input) {
            const input = _input.trim().toUpperCase().split(" ");
            for (const answer of this.answers) {
                if (answer.check() && !input.includes(answer.letter) || input.includes(answer.letter) && !answer.check())
                    return false;
            }
            return true;
        }
    }
    E09.MultipleChoiceQuestion = MultipleChoiceQuestion;
    class GuessQuestion extends Question {
        constructor(_text, _answer, _tolerance) {
            super(_text);
            this.answer = _answer;
            this.tolerance = _tolerance;
        }
        toString() {
            return this.text;
        }
        check(_input) {
            const input = Number.parseFloat(_input);
            if (!Number.isNaN(input)) {
                return this.answer - this.tolerance <= input && input <= this.answer + this.tolerance;
            }
            else
                return false;
        }
    }
    E09.GuessQuestion = GuessQuestion;
    class TextQuestion extends Question {
        constructor(_text, _answer) {
            super(_text);
            this.answer = _answer;
        }
        toString() {
            return this.text;
        }
        check(_input) {
            return _input.trim().replace(/\s+/g, " ") === this.answer;
        }
    }
    E09.TextQuestion = TextQuestion;
})(E09 || (E09 = {}));
//# sourceMappingURL=Questions.js.map