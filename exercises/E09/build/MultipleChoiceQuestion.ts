namespace E09 {
    export interface MultipleChoiceQuestionData extends QuestionData {
        answers: Array<AnswerData>;
    }

    export class MultipleChoiceQuestion extends Question {
        private answers: Array<Answer>;

        public constructor(_text: string, _answers: Array<Answer>) {
            super(_text);
            this.answers = _answers;
        }

        public toString(): string {
            const letterSet: Array<string> = ["A", "B", "C", "D", "E", "F"];
            const usedIndices: Array<number> = new Array<number>();
            let r: string = this.text;
            for (let i: number = 0; i < this.answers.length; i++) {
                let randomIndex: number;
                do
                    randomIndex = Math.floor(Math.random() * this.answers.length);
                while (usedIndices.includes(randomIndex));
                usedIndices.push(randomIndex);
                this.answers[randomIndex].letter = letterSet[i];
                r += "\n" + this.answers[randomIndex].toString();
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
}
