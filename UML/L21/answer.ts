namespace L21 {
    export class Answer {
        private _text: string;
        private _state: boolean;

        public constructor(_text: string, _state: boolean = false) {
            this._text = _text;
            this._state = _state;
        }

        public get text(): string {
            return this._text;
        }

        public get state(): boolean {
            return this._state;
        }
    }
}