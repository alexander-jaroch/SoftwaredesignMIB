namespace E09 {
    export interface QuestionData {
        type: string;
        text: string;
    }

    export abstract class Question {
        protected text: string;

        public constructor(_text: string) {
            this.text = _text;
        }

        public abstract toString(): string;
        public abstract check(_input: string): boolean;
        public abstract json(): QuestionData;
    }
}
