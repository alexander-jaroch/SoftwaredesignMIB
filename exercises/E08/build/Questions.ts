namespace E08 {
    export abstract class Question {
        public question: string;

        constructor(_question: string) {
            this.question = _question;
        }

        public abstract toString(): string;
        public abstract checkAnswer(_answer: string): boolean;
    }

    export class YesNoQuestion extends Question {
        public isCorrect: boolean;

        public constructor(_question: string) {
            super(_question);
            this.isCorrect = false;
        }

        public toString(): string {
            return this.question + "\n" + "[Y] Yes\n[N] No";
        }

        public checkAnswer(_answer: string): boolean {
            return this.isCorrect && _answer.toUpperCase() == "Y" || !this.isCorrect && _answer.toUpperCase() == "N";
        }
    }

    export class MultipleChoiceQuestion extends Question {
        public answers: string[];
        public correctAnswersArray: number[];

        public constructor(_question: string) {
            super(_question);
            this.answers = new Array<string>();
            this.correctAnswersArray = new Array<number>();
        }

        public toString(): string {
            let r: string = this.question + "\n";
            for (let i: number = 0; i < this.answers.length; i++) {
                r += "[" + letters(i) + "] " + this.answers[i] + "\n";
            }
            return r;
        }

        public checkAnswer(_answer: string): boolean {
            if (_answer.trim() === "" && this.correctAnswersArray.length === 0) return true;
            const useranswers: string[] = _answer.trim().split(" ").map(function (x: string): string { return x.toUpperCase(); });
            if (useranswers.length == this.correctAnswersArray.length) {
                for (let i: number = 0; i < this.correctAnswersArray.length; i++) {
                    if (!useranswers.includes(letters(this.correctAnswersArray[i])))
                        return false;
                }
                return true;
            }
            return false;
        }
    }

    export class FreeTextQuestion extends Question {
        public correctAnswer: string;

        public constructor(_question: string) {
            super(_question);
            this.correctAnswer = "";
        }

        public toString(): string {
            return this.question + "\n";
        }

        public checkAnswer(_answer: string): boolean {
            return _answer == this.correctAnswer;
        }
    }

    export class SingleChoiceQuestion extends Question {
        public answers: string[];
        public correctAnswer: number;

        public constructor(_question: string) {
            super(_question);
            this.answers = new Array<string>();
            this.correctAnswer = -1;
        }

        public toString(): string {
            let r: string = this.question + "\n";
            for (let i: number = 0; i < this.answers.length; i++) {
                r += "[" + letters(i) + "] " + this.answers[i] + "\n";
            }
            return r;
        }

        public checkAnswer(_answer: string): boolean {
            return _answer.toUpperCase() == letters(this.correctAnswer);
        }
    }

    export class GuessQuestion extends Question {
        public corretAnswer: number;
        public inaccuracyRange: number;

        public constructor(_question: string) {
            super(_question);
            this.corretAnswer = 0;
            this.inaccuracyRange = 0;
        }

        public toString(): string {
            return this.question + "\n";
        }

        public checkAnswer(_answer: string): boolean {
            return Number.parseFloat(_answer) >= this.corretAnswer - this.inaccuracyRange && Number.parseFloat(_answer) <= this.corretAnswer + this.inaccuracyRange;
        }
    }

    function letters(i: number): string {
        switch (i) {
            case 0: return "A";
            case 1: return "B";
            case 2: return "C";
            case 3: return "D";
            case 4: return "E";
            case 5: return "F";
            case 6: return "G";
            case 7: return "H";
            case 8: return "I";
            case 9: return "J";
            case 10: return "K";
            case 11: return "L";
            case 12: return "M";
            case 13: return "N";
            case 14: return "O";
            case 15: return "P";
            case 16: return "Q";
            case 17: return "R";
            case 18: return "S";
            case 19: return "T";
            case 20: return "U";
            case 21: return "V";
            case 22: return "W";
            case 23: return "X";
            case 24: return "Y";
            case 25: return "Z";
            default: return "-";
        }
    }
}