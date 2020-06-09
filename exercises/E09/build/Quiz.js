"use strict";
var E09;
(function (E09) {
    class Quiz {
        constructor(_questions) {
            this.questions = _questions;
            this.questionIndex = -1;
            this.answerCount = 0;
            this.correctCount = 0;
            this.changeCurrentQuestion();
        }
        get currentQuestion() {
            return this.questions[this.questionIndex];
        }
        get score() {
            return "Score: " + this.correctCount + " of " + this.answerCount + " (" + Math.round((this.correctCount / this.answerCount) * 10000) / 100 + "%)";
        }
        addQuestion(_question) {
            this.questions.push(_question);
        }
        answerCurrentQuestion(_input) {
            const r = this.questions[this.questionIndex].check(_input);
            this.answerCount++;
            if (r)
                this.correctCount++;
            this.changeCurrentQuestion();
            return r;
        }
        changeCurrentQuestion() {
            let r;
            do
                r = Math.floor(Math.random() * this.questions.length);
            while (r === this.questionIndex);
            this.questionIndex = r;
        }
    }
    E09.Quiz = Quiz;
})(E09 || (E09 = {}));
//# sourceMappingURL=Quiz.js.map