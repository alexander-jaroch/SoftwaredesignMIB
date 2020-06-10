namespace E09 {
    export interface QuestionDataSet {
        multipleChoiceQuestions: Array<MultipleChoiceQuestionData>;
        trueFalseQuestions: Array<TrueFalseQuestionData>;
        guessQuestions: Array<GuessQuestionData>;
        textQuestions: Array<TextQuestionData>;
    }

    export class Quiz {
        private questions: Array<Question>;
        private questionIndex: number;
        private answerCount: number;
        private correctCount: number;

        public constructor(_questions: QuestionDataSet) {
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

        private initQuestions(_questionSet: QuestionDataSet): void {
            for (const question of _questionSet.multipleChoiceQuestions) {
                const answers: Array<Answer> = new Array<Answer>();
                for (const answer of question.answers) {
                    answers.push(new Answer(answer.text, answer.isRight));
                }
                this.questions.push(new MultipleChoiceQuestion(question.text, answers));
            }

            for (const question of _questionSet.trueFalseQuestions) {
                this.questions.push(new TrueFalseQuestion(question.text, question.answer));
            }

            for (const question of _questionSet.guessQuestions) {
                this.questions.push(new GuessQuestion(question.text, question.answer, question.tolerance));
            }

            for (const question of _questionSet.textQuestions) {
                this.questions.push(new TextQuestion(question.text, question.answer));
            }
        }
    }
}