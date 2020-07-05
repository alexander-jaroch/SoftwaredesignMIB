/// <reference path="Quiz.ts" />

namespace E05 {
    const initialQuestions: Array<Question> = [
        new Question("What is the capital of Germany?", [
            new Answer("Berlin", true),
            new Answer("Stuttgart"),
            new Answer("Cologne")
        ]),
        new Question("What is the capital of Baden-Württemberg?", [
            new Answer("Stutgart", true),
            new Answer("Berlin"),
            new Answer("Cologne")
        ]),
        new Question("What is the answer to the ultimate question of life, the universe, and everything?", [
            new Answer("42", true),
            new Answer("There is no such thing"),
            new Answer("Atoms"),
            new Answer("The Big Bang")
        ])
    ];
    const quiz: Quiz = new Quiz(initialQuestions);
    const quest: HTMLDivElement = document.createElement("div");
    renderQuestion();
    // Main Menu
    const menu: HTMLDivElement = document.createElement("div");
    const h1: HTMLHeadElement = document.createElement("h1");
    h1.appendChild(document.createTextNode("The Quiz"));
    menu.appendChild(h1);
    const msgP: HTMLParagraphElement = document.createElement("p");
    const msgText: Text = document.createTextNode("");
    msgP.appendChild(msgText);
    menu.appendChild(msgP);
    const btnAdd: HTMLButtonElement = document.createElement("button");
    btnAdd.appendChild(document.createTextNode("Add a new Question"));
    btnAdd.addEventListener("click", btnAddClick);
    menu.appendChild(btnAdd);
    const btnAns: HTMLButtonElement = document.createElement("button");
    btnAns.appendChild(document.createTextNode("Answer a Question"));
    btnAns.addEventListener("click", btnAnsClick);
    menu.appendChild(btnAns);
    const statP: HTMLParagraphElement = document.createElement("p");
    const statText: Text = document.createTextNode("");
    statP.appendChild(statText);
    menu.appendChild(statP);

    // Add a Question Form
    const form: HTMLFormElement = document.createElement("form");



    document.body.appendChild(menu);

    // Add a new Question
    function btnAddClick(): void {
        document.body.replaceChild(form, menu);
    }
    // Answer an existing Question
    function btnAnsClick(): void {
        document.body.replaceChild(quest, menu);
    }

    function renderQuestion(): void {
        quest.childNodes.forEach(function (node: ChildNode): void { node.remove(); });
        const questDiv: HTMLDivElement = document.createElement("div");
        const questH2: HTMLHeadElement = document.createElement("h2");
        questH2.appendChild(document.createTextNode(quiz.currentQuestion.text));
        questDiv.appendChild(questH2);
        const ansDiv: HTMLDivElement = document.createElement("div");
        for (let i: number = 0; i < quiz.currentQuestion.answers.length; i++) {
            const answer: Answer = quiz.currentQuestion.answers[i];
            const ansBtn: HTMLButtonElement = document.createElement("button");
            ansBtn.appendChild(document.createTextNode(answer.text));
            ansBtn.addEventListener("click", ansBtnEvents(i));
            ansDiv.appendChild(ansBtn);
        }
        questDiv.appendChild(ansDiv);
        quest.appendChild(questDiv);
    }

    function ansBtnEvents(i: number): EventListener {
        return function (): void {
            if (quiz.answerCurrentQuestion(i))
                msgText.data = "You're right!";
            else
                msgText.data = "You're wrong!";
            statText.data = "You've got " + quiz.correctCount + " out of "
                + quiz.answerCount + " answers right (" + Math.round(quiz.correctCount / quiz.answerCount * 10000) / 100 + "%).";
            document.body.replaceChild(menu, quest);
            renderQuestion();
        };
    }
}