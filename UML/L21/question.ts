namespace L21 {
    export class Question {
        private _text: string;
        private _answers: Array<Answer>;

        public constructor(_text: string, _answers: Array<Answer>) {
            this._text = _text;
            this._answers = _answers;
        }

        public get text(): string {
            return this._text;
        }

        public get answers(): Array<Answer> {
            return this._answers;
        }

        public resolve(_i: number): boolean {
            return this.answers[_i].state;
        }
    }
}