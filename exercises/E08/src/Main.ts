/// <reference path="Questions.ts" />

namespace E08 {
    const q1: YesNoQuestion = new YesNoQuestion("Are roses red?");
    q1.isCorrect = true;
    const q2: SingleChoiceQuestion = new SingleChoiceQuestion("Violets are...");
    q2.answers = ["blue", "violet", "red"];
    q2.correctAnswer = 1;
    const q3: MultipleChoiceQuestion = new MultipleChoiceQuestion("Mercury, Venus, Earth, Mars, ...");
    q3.answers = ["Snickers", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
    q3.correctAnswersArray = [1, 2, 3, 4];
    const q4: GuessQuestion = new GuessQuestion("What is Pi?");
    q4.corretAnswer = 3.1415926535;
    q4.inaccuracyRange = 0.0000000001;
    const q5: FreeTextQuestion = new FreeTextQuestion("Who is the President of the United States?");
    q5.correctAnswer = "Donald Trump";

    const questions: Array<Question> = [q1, q2, q3, q4, q5];
    const score: Array<number> = [0, 0];
    let input: string = "";
    try {
        while (input.toLowerCase() !== "q") {
            console.log(
                "What do you want to do?",
                "\n[ans] Answer a question from the question pool",
                "\n[add] Add a new question to the question pool",
                "\n[q] Quit the quiz"
            );
            input = prompt("Your Input");
            console.log(">", input);
            if (input.toLowerCase() !== "q") {
                if (input.toLowerCase() === "ans") {
                    const randomQuestion: Question = questions[Math.floor(Math.random() * questions.length)];
                    console.log(randomQuestion.toString());
                    input = prompt("Your Answer");
                    console.log(">", input);
                    const result: boolean = randomQuestion.checkAnswer(input);
                    console.log(result ? "You're right!" : "You're wrong!");
                    score[0]++;
                    if (result) score[1]++;
                    console.log(`You've got ${score[1]} out of ${score[0]} questions right!`);
                }
                else if (input.toLowerCase() === "add") {
                    console.log(
                        "What kind of question do you want to add?",
                        "\n[yesno] Yes No Question",
                        "\n[single] Single Choice Question",
                        "\n[multiple] Multiple Choice Question",
                        "\n[guess] Guess Question",
                        "\n[text] Text Question"
                    );
                    input = prompt("Your Choice");
                    console.log(">", input);
                    switch (input.toLowerCase()) {
                        case "yesno":
                            console.log("Type in the question statement");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const yesNoQuestion: YesNoQuestion = new YesNoQuestion(input);
                            do {
                                console.log("Is that statement true?", "\n[Y] Yes", "\n[N] No");
                                input = prompt("Your Choice");
                                console.log(">", input);
                            }
                            while (input.toUpperCase() !== "Y" && input.toUpperCase() !== "N");
                            yesNoQuestion.isCorrect = input.toUpperCase() === "Y";
                            questions.push(yesNoQuestion);
                            console.log("You've successfully added a Yes No Question to the pool.");
                            break;
                        case "single":
                            console.log("Type in the question.");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const singleChoiceQuestion: SingleChoiceQuestion = new SingleChoiceQuestion(input);
                            let singleAnswersCount: number;
                            do {
                                console.log("How many answers do you want to add? You can set two to six possilbe answers. Exactly one answer must be correct.");
                                input = prompt("Your Input");
                                console.log(">", input);
                                singleAnswersCount = Number.parseInt(input);
                            }
                            while (Number.isNaN(singleAnswersCount) || singleAnswersCount < 2 || singleAnswersCount > 6);
                            let singleChoiceAnswers: Array<string> = new Array<string>();
                            let correctAnswerSet: boolean = false;
                            for (let i: number = 0; i < singleAnswersCount; i++) {
                                console.log(`Enter answer #${i + 1}`);
                                input = prompt("Your Input");
                                console.log(">", input);
                                singleChoiceAnswers.push(input);
                                if (!correctAnswerSet) {
                                    do {
                                        console.log("Is this the correct answer?", "\n[Y] Yes", "\n[N] No");
                                        input = prompt("Your Choice");
                                        console.log(">", input);
                                    }
                                    while (input.toUpperCase() !== "Y" && input.toUpperCase() !== "N");
                                    if (input.toUpperCase() === "Y") {
                                        singleChoiceQuestion.correctAnswer = i;
                                        correctAnswerSet = true;
                                    }
                                }
                            }
                            if (correctAnswerSet) {
                                singleChoiceQuestion.answers = singleChoiceAnswers;
                                questions.push(singleChoiceQuestion);
                                console.log("You've successfully added a Single Choice Question to the pool.");
                            }
                            else {
                                console.log("You've failed to create a new Single Choice Question, because you didn't provide a correct answer.");
                            }
                            break;
                        case "multiple":
                            console.log("Type in the question");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const multipleChoiceQuestion: MultipleChoiceQuestion = new MultipleChoiceQuestion(input);
                            let answersCount: number;
                            do {
                                console.log("How many answers do you want to add? You can set two to six possilbe answers. Several answers can be correct.");
                                input = prompt("Your Input");
                                console.log(">", input);
                                answersCount = Number.parseInt(input);
                            }
                            while (Number.isNaN(answersCount) || answersCount < 2 || answersCount > 6);
                            let multipleChoiceAnswers: Array<string> = new Array<string>();
                            for (let i: number = 0; i < answersCount; i++) {
                                console.log(`Enter answer #${i + 1}`);
                                input = prompt("Your Input");
                                console.log(">", input);
                                multipleChoiceAnswers.push(input);
                                do {
                                    console.log("Is this correct answer correct?", "\n[Y] Yes", "\n[N] No");
                                    input = prompt("Your Choice");
                                    console.log(">", input);
                                }
                                while (input.toUpperCase() !== "Y" && input.toUpperCase() !== "N");
                                if (input.toUpperCase() === "Y") {
                                    multipleChoiceQuestion.correctAnswersArray.push(i);
                                }
                            }
                            multipleChoiceQuestion.answers = multipleChoiceAnswers;
                            questions.push(multipleChoiceQuestion);
                            console.log("You've successfully added a Multiple Choice Question to the pool.");
                            break;
                        case "guess":
                            console.log("Type in the question.");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const guessQuestion: GuessQuestion = new GuessQuestion(input);
                            let guessValue: number;
                            do {
                                console.log("Please enter the exact value.");
                                input = prompt("Your Input");
                                console.log(">", input);
                                guessValue = Number.parseFloat(input);
                            }
                            while (Number.isNaN(guessValue));
                            guessQuestion.corretAnswer = guessValue;
                            let guessMargin: number;
                            do {
                                console.log("Please enter a margin by which the given answer is still deemed correct.");
                                input = prompt("Your Input");
                                console.log(">", input);
                                guessMargin = Number.parseFloat(input);
                            }
                            while (Number.isNaN(guessMargin));
                            guessQuestion.inaccuracyRange = guessMargin;
                            questions.push(guessQuestion);
                            console.log("You've successfully added a Guess Question to the pool.");
                            break;
                        case "text":
                            console.log("Type in the question.");
                            input = prompt("Your Input");
                            console.log(">", input);
                            const textQuestion: FreeTextQuestion = new FreeTextQuestion(input);
                            console.log("Please enter the answer text.");
                            input = prompt("Your Input");
                            console.log(">", input);
                            textQuestion.correctAnswer = input;
                            questions.push(textQuestion);
                            console.log("You've successfully added a Text Question to the pool.");
                            break;
                        default:
                            console.warn(`"${input}" is not a valid question type!`);
                    }
                }
                input = "";
            }
        }
    } catch (e) {
        console.error("Quiz has ended unexpectedly!");
    }
}