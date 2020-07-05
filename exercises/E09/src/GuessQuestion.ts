/// <reference path="Question.ts" />

namespace E09 {
    export interface GuessQuestionData extends QuestionData {
        answer: number;
        tolerance: number;
    }

    export class GuessQuestion extends Question {
        private tolerance: number;
        private answer: number;

        public constructor(_text: string, _answer: number, _tolerance: number) {
            super(_text);
            this.answer = _answer;
            this.tolerance = _tolerance;
        }

        public static parse(_json: GuessQuestionData): GuessQuestion {
            return new GuessQuestion(_json.text, _json.answer, _json.tolerance);
        }

        public toString(): string {
            return this.text;
        }

        public check(_input: string): boolean {
            const input: number = Number.parseFloat(_input.trim());
            if (!Number.isNaN(input)) {
                return this.answer - this.tolerance <= input && input <= this.answer + this.tolerance;
            }
            else return false;
        }

        public json(): GuessQuestionData {
            return {
                type: "GuessQuestion",
                text: this.text,
                answer: this.answer,
                tolerance: this.tolerance
            };
        }
    }
}
