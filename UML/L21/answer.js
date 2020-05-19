"use strict";
var L21;
(function (L21) {
    class Answer {
        constructor(_text, _state = false) {
            this._text = _text;
            this._state = _state;
        }
        get text() {
            return this._text;
        }
        get state() {
            return this._state;
        }
    }
    L21.Answer = Answer;
})(L21 || (L21 = {}));
//# sourceMappingURL=answer.js.map