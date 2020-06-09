namespace E09 {
    export class Answer {
        public letter: string;
        private text: string;
        private isRight: boolean;

        public constructor(_text: string, _isRight: boolean) {
            this.text = _text;
            this.isRight = _isRight;
        }

        public toString(): string {
            return "[" + this.letter + "] " + this.text;
        }

        public check(): boolean {
            return this.isRight;
        }
    }
}