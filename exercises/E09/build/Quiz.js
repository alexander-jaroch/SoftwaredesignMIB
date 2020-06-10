"use strict";
var E09;
(function (E09) {
    class Quiz {
        constructor(_questions) {
            this.questions = new Array();
            this.questionIndex = -1;
            this.answerCount = 0;
            this.correctCount = 0;
            this.initQuestions(_questions);
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
        initQuestions(_questionSet) {
            for (let i = 0; i < _questionSet.length; i++) {
                switch (_questionSet[i].type) {
                    case "MultipleChoiceQuestion":
                        this.questions.push(E09.MultipleChoiceQuestion.parse(_questionSet[i]));
                        break;
                    case "TrueFalseQuestion":
                        this.questions.push(E09.TrueFalseQuestion.parse(_questionSet[i]));
                        break;
                    case "GuessQuestion":
                        this.questions.push(E09.GuessQuestion.parse(_questionSet[i]));
                        break;
                    case "TextQuestion":
                        this.questions.push(E09.TextQuestion.parse(_questionSet[i]));
                        break;
                }
            }
        }
    }
    E09.Quiz = Quiz;
})(E09 || (E09 = {}));
//# sourceMappingURL=Quiz.js.map