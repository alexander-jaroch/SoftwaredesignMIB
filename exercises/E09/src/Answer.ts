namespace E09 {
    export interface AnswerData {
        text: string;
        isRight: boolean;
    }

    export class Answer {
        public letter: string;
        private text: string;
        private isRight: boolean;

        public constructor(_text: string, _isRight: boolean) {
            this.text = _text;
            this.isRight = _isRight;
        }

        public static parse(_json: AnswerData): Answer {
            return new Answer(_json.text, _json.isRight);
        }

        public toString(): string {
            return "[" + this.letter + "] " + this.text;
        }

        public check(): boolean {
            return this.isRight;
        }

        public json(): AnswerData {
            return {
                text: this.text,
                isRight: this.isRight
            };
        }
    }
}
