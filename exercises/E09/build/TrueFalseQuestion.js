"use strict";
var E09;
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
//# sourceMappingURL=TrueFalseQuestion.js.map