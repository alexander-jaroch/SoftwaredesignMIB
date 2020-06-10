"use strict";
var E09;
(function (E09) {
    class GuessQuestion extends E09.Question {
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
})(E09 || (E09 = {}));
//# sourceMappingURL=GuessQuestion.js.map