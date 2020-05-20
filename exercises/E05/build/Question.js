"use strict";
var E05;
(function (E05) {
    class Question {
        constructor(_text, _answers) {
            this._text = _text;
            this._answers = _answers;
        }
        get text() {
            return this._text;
        }
        get answers() {
            return this._answers;
        }
        resolve(_i) {
            return this.answers[_i].state;
        }
    }
    E05.Question = Question;
})(E05 || (E05 = {}));
//# sourceMappingURL=Question.js.map