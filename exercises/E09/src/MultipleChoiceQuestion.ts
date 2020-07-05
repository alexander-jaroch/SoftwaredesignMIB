/// <reference path="Question.ts" />
/// <reference path="Answer.ts" />

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

        public static parse(_json: MultipleChoiceQuestionData): MultipleChoiceQuestion {
            return new MultipleChoiceQuestion(_json.text, _json.answers.map(x => Answer.parse(x)));
        }

        public toString(): string {
            const letterSet: Array<string> = ["A", "B", "C", "D", "E", "F"];
            const usedIndices: Array<number> = new Array<number>();
            let questionStr: string = this.text;
            for (let i: number = 0; i < this.answers.length; i++) {
                let randomIndex: number;
                do
                    randomIndex = Math.floor(Math.random() * this.answers.length);
                while (usedIndices.includes(randomIndex));
                usedIndices.push(randomIndex);
                this.answers[randomIndex].letter = letterSet[i];
                questionStr += "\n" + this.answers[randomIndex].toString();
            }
            return questionStr;
        }

        public check(_input: string): boolean {
            const input: Array<string> = _input.toUpperCase().replace(/,?\s*/g, "").split("");
            for (const answer of this.answers) {
                if (answer.check() && !input.includes(answer.letter) || input.includes(answer.letter) && !answer.check())
                    return false;
            }
            return true;
        }

        public json(): MultipleChoiceQuestionData {
            return {
                type: "MultipleChoiceQuestion",
                text: this.text,
                answers: this.answers.map(x => x.json())
            };
        }
    }
}
