"use strict";
var E09;
(function (E09) {
    class TrueFalseQuestion extends E09.Question {
        constructor(_text, _isTrue) {
            super(_text);
            this.answer = _isTrue;
        }
        toString() {
            return this.text + "\n[Y] Yes\n[N] No";
        }
        check(_input) {
            return this.answer && _input.trim().toUpperCase() === "Y" || !this.answer && _input.trim().toUpperCase() === "N";
        }
        json() {
            return {
                text: this.text,
                answer: this.answer
            };
        }
    }
    E09.TrueFalseQuestion = TrueFalseQuestion;
})(E09 || (E09 = {}));
//# sourceMappingURL=TrueFalseQuestion.js.map