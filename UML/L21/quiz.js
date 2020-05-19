"use strict";
var L21;
(function (L21) {
    class Quiz {
        constructor(_questions) {
            this._questions = _questions;
            this.changeCurrentQuestion();
            this._correctCount = 0;
            this._answerCount = 0;
        }
        get currentQuestion() {
            return this._currentQuestion;
        }
        get correctCount() {
            return this._correctCount;
        }
        get answerCount() {
            return this._answerCount;
        }
        answerCurrentQuestion(_i) {
            const correct = this._currentQuestion.resolve(_i);
            if (correct)
                this._correctCount++;
            this._answerCount++;
            this.changeCurrentQuestion();
            return correct;
        }
        changeCurrentQuestion() {
            if (this._questions.length > 0)
                this._currentQuestion = this._questions[Math.floor(Math.random() * this._questions.length)];
        }
    }
    L21.Quiz = Quiz;
})(L21 || (L21 = {}));
//# sourceMappingURL=quiz.js.map