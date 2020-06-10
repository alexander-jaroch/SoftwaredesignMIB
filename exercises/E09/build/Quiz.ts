namespace E09 {
    export class Quiz {
        private questions: Array<Question>;
        private questionIndex: number;
        private answerCount: number;
        private correctCount: number;

        public constructor(_questions: Array<QuestionData>) {
            this.questions = new Array<Question>();
            this.questionIndex = -1;
            this.answerCount = 0;
            this.correctCount = 0;
            this.initQuestions(_questions);
            this.changeCurrentQuestion();
        }

        public get currentQuestion(): Question {
            return this.questions[this.questionIndex];
        }

        public get score(): string {
            return "Score: " + this.correctCount + " of " + this.answerCount + " (" + Math.round((this.correctCount / this.answerCount) * 10000) / 100 + "%)";
        }

        public addQuestion(_question: Question): void {
            this.questions.push(_question);
        }

        public answerCurrentQuestion(_input: string): boolean {
            const r: boolean = this.questions[this.questionIndex].check(_input);
            this.answerCount++;
            if (r)
                this.correctCount++;
            this.changeCurrentQuestion();
            return r;
        }

        private changeCurrentQuestion(): void {
            let r: number;
            do
                r = Math.floor(Math.random() * this.questions.length);
            while (r === this.questionIndex);
            this.questionIndex = r;
        }

        private initQuestions(_questionSet: Array<QuestionData>): void {
            for (let i: number = 0; i < _questionSet.length; i++) {
                switch (_questionSet[i].type) {
                    case "MultipleChoiceQuestion":
                        this.questions.push(MultipleChoiceQuestion.parse(_questionSet[i] as MultipleChoiceQuestionData));
                        break;
                    case "TrueFalseQuestion":
                        this.questions.push(TrueFalseQuestion.parse(_questionSet[i] as TrueFalseQuestionData));
                        break;
                    case "GuessQuestion":
                        this.questions.push(GuessQuestion.parse(_questionSet[i] as GuessQuestionData));
                        break;
                    case "TextQuestion":
                        this.questions.push(TextQuestion.parse(_questionSet[i] as TextQuestionData));
                        break;
                }
            }
        }
    }
}
