namespace E09 {
    export abstract class Question {
        protected text: string;

        public constructor(_text: string) {
            this.text = _text;
        }

        public abstract toString(): string;
        public abstract check(_input: string): boolean;
    }

    export abstract class ChoiceQuestion extends Question {
        protected answers: Array<Answer>;

        public constructor(_text: string, _answers: Array<Answer>) {
            super(_text);
            this.answers = _answers;
        }

        protected shuffleAnswers(): void {
            for (let i: number = 0; i < this.answers.length; i++) {
                let r: number = Math.floor(Math.random() * this.answers.length);
                let t: Answer = this.answers[i];
                this.answers[i] = this.answers[r];
                this.answers[r] = t;
            }
        }

        protected assignLetters(_set: Array<string> = ["A", "B", "C", "D", "E", "F"]): void {
            for (let i: number = 0; i < this.answers.length; i++) {
                this.answers[i].letter = _set[i];
            }
        }
    }

    export class TrueFalseQuestion extends ChoiceQuestion {
        public constructor(_text: string, _isTrue: boolean) {
            const answers: Array<Answer> = [
                new Answer("Yes", _isTrue),
                new Answer("No", !_isTrue)
            ];
            super(_text, answers);
            this.assignLetters(["Y", "N"]);
        }

        public toString(): string {
            this.shuffleAnswers();
            let r: string = this.text;
            for (const answer of this.answers) {
                r += "\n" + answer.toString();
            }
            return r;
        }

        public check(_input: string): boolean {
            for (const answer of this.answers)
                if (_input.trim().toUpperCase() === answer.letter)
                    return answer.check();
            return false;
        }

    }

    export class MultipleChoiceQuestion extends ChoiceQuestion {
        public toString(): string {
            this.shuffleAnswers();
            this.assignLetters();
            let r: string = this.text;
            for (const answer of this.answers) {
                r += "\n" + answer.toString();
            }
            return r;
        }

        public check(_input: string): boolean {
            const input: Array<string> = _input.trim().toUpperCase().split(" ");
            for (const answer of this.answers) {
                if (answer.check() && !input.includes(answer.letter) || input.includes(answer.letter) && !answer.check())
                    return false;
            }
            return true;
        }

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

    export class TextQuestion extends Question {
        private answer: string;

        public constructor(_text: string, _answer: string) {
            super(_text);
            this.answer = _answer;
        }

        public toString(): string {
            return this.text;
        }

        public check(_input: string): boolean {
            return _input.trim().replace(/\s+/g, " ") === this.answer;
        }
    }
}