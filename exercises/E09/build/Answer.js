"use strict";
var E09;
(function (E09) {
    class Answer {
        constructor(_text, _isRight) {
            this.text = _text;
            this.isRight = _isRight;
        }
        toString() {
            return "[" + this.letter + "] " + this.text;
        }
        check() {
            return this.isRight;
        }
    }
    E09.Answer = Answer;
})(E09 || (E09 = {}));
//# sourceMappingURL=Answer.js.map