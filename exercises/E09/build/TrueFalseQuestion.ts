namespace E09 {
    export interface TrueFalseQuestionData extends QuestionData {
        answer: boolean;
    }

    export class TrueFalseQuestion extends Question {
        private answer: boolean;

        public constructor(_text: string, _isTrue: boolean) {
            super(_text);
            this.answer = _isTrue;
        }

        public toString(): string {
            return this.text + "\n[Y] Yes\n[N] No";
        }

        public check(_input: string): boolean {
            return this.answer && _input.trim().toUpperCase() === "Y" || !this.answer && _input.trim().toUpperCase() === "N";
        }

        public json(): TrueFalseQuestionData {
            return {
                text: this.text,
                answer: this.answer
            };
        }

    }
}
