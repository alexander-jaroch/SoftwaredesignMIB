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
            for (const question of _questionSet.multipleChoiceQuestions) {
                const answers = new Array();
                for (const answer of question.answers) {
                    answers.push(new E09.Answer(answer.text, answer.isRight));
                }
                this.questions.push(new E09.MultipleChoiceQuestion(question.text, answers));
            }
            for (const question of _questionSet.trueFalseQuestions) {
                this.questions.push(new E09.TrueFalseQuestion(question.text, question.answer));
            }
            for (const question of _questionSet.guessQuestions) {
                this.questions.push(new E09.GuessQuestion(question.text, question.answer, question.tolerance));
            }
            for (const question of _questionSet.textQuestions) {
                this.questions.push(new E09.TextQuestion(question.text, question.answer));
            }
        }
    }
    E09.Quiz = Quiz;
})(E09 || (E09 = {}));
//# sourceMappingURL=Quiz.js.map