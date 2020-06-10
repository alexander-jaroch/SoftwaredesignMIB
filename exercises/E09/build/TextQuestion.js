"use strict";
var E09;
(function (E09) {
    class TextQuestion extends E09.Question {
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
//# sourceMappingURL=TextQuestion.js.map