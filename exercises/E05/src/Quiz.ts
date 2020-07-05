/// <reference path="Question.ts" />

namespace E05 {
    export class Quiz {
        private _questions: Array<Question>;
        private _currentQuestion: Question;
        private _correctCount: number;
        private _answerCount: number;

        public constructor(_questions: Array<Question>) {
            this._questions = _questions;
            this.changeCurrentQuestion();
            this._correctCount = 0;
            this._answerCount = 0;
        }

        public get currentQuestion(): Question {
            return this._currentQuestion;
        }

        public get correctCount(): number {
            return this._correctCount;
        }

        public get answerCount(): number {
            return this._answerCount;
        }

        public answerCurrentQuestion(_i: number): boolean {
            const correct: boolean = this._currentQuestion.resolve(_i);
            if (correct)
                this._correctCount++;
            this._answerCount++;
            this.changeCurrentQuestion();
            return correct;
        }

        private changeCurrentQuestion(): void {
            if (this._questions.length > 0)
                this._currentQuestion = this._questions[Math.floor(Math.random() * this._questions.length)];
        }
    }
}