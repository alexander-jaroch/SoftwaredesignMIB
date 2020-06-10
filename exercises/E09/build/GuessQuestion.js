"use strict";
var E09;
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
//# sourceMappingURL=GuessQuestion.js.map