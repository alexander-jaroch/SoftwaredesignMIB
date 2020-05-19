"use strict";
var L21;
(function (L21) {
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
    L21.Question = Question;
})(L21 || (L21 = {}));
//# sourceMappingURL=question.js.map