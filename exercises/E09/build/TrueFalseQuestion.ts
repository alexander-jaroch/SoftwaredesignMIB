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

        public static parse(_json: TrueFalseQuestionData): TrueFalseQuestion {
            return new TrueFalseQuestion(_json.text, _json.answer);
        }

        public toString(): string {
            return this.text + "\n[Y] Yes\n[N] No";
        }

        public check(_input: string): boolean {
            const input: string = _input.trim().toUpperCase();
            return this.answer && input === "Y" || !this.answer && input === "N";
        }

        public json(): TrueFalseQuestionData {
            return {
                type: "TrueFalseQuestion",
                text: this.text,
                answer: this.answer
            };
        }
    }
}
