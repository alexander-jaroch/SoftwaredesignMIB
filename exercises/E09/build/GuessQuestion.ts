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

        public toString(): string {
            return this.text;
        }

        public check(_input: string): boolean {
            const input: number = Number.parseFloat(_input);
            if (!Number.isNaN(input)) {
                return this.answer - this.tolerance <= input && input <= this.answer + this.tolerance;
            }
            else return false;
        }
    }
}