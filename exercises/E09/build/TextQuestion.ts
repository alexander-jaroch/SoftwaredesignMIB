namespace E09 {
    export interface TextQuestionData extends QuestionData {
        answer: string;
    }

    export class TextQuestion extends Question {
        private answer: string;

        public constructor(_text: string, _answer: string) {
            super(_text);
            this.answer = _answer;
        }

        public static parse(_json: TextQuestionData): TextQuestion {
            return new TextQuestion(_json.text, _json.answer);
        }

        public toString(): string {
            return this.text;
        }

        public check(_input: string): boolean {
            return _input.trim().replace(/\s+/g, " ") === this.answer;
        }

        public json(): TextQuestionData {
            return {
                type: "TextQuestion",
                text: this.text,
                answer: this.answer
            };
        }
    }
}
