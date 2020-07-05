"use strict";
/// <reference path="Quiz.ts" />
var E05;
(function (E05) {
    const initialQuestions = [
        new E05.Question("What is the capital of Germany?", [
            new E05.Answer("Berlin", true),
            new E05.Answer("Stuttgart"),
            new E05.Answer("Cologne")
        ]),
        new E05.Question("What is the capital of Baden-Württemberg?", [
            new E05.Answer("Stutgart", true),
            new E05.Answer("Berlin"),
            new E05.Answer("Cologne")
        ]),
        new E05.Question("What is the answer to the ultimate question of life, the universe, and everything?", [
            new E05.Answer("42", true),
            new E05.Answer("There is no such thing"),
            new E05.Answer("Atoms"),
            new E05.Answer("The Big Bang")
        ])
    ];
    const quiz = new E05.Quiz(initialQuestions);
    const quest = document.createElement("div");
    renderQuestion();
    // Main Menu
    const menu = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("The Quiz"));
    menu.appendChild(h1);
    const msgP = document.createElement("p");
    const msgText = document.createTextNode("");
    msgP.appendChild(msgText);
    menu.appendChild(msgP);
    const btnAdd = document.createElement("button");
    btnAdd.appendChild(document.createTextNode("Add a new Question"));
    btnAdd.addEventListener("click", btnAddClick);
    menu.appendChild(btnAdd);
    const btnAns = document.createElement("button");
    btnAns.appendChild(document.createTextNode("Answer a Question"));
    btnAns.addEventListener("click", btnAnsClick);
    menu.appendChild(btnAns);
    const statP = document.createElement("p");
    const statText = document.createTextNode("");
    statP.appendChild(statText);
    menu.appendChild(statP);
    // Add a Question Form
    const form = document.createElement("form");
    document.body.appendChild(menu);
    // Add a new Question
    function btnAddClick() {
        document.body.replaceChild(form, menu);
    }
    // Answer an existing Question
    function btnAnsClick() {
        document.body.replaceChild(quest, menu);
    }
    function renderQuestion() {
        quest.childNodes.forEach(function (node) { node.remove(); });
        const questDiv = document.createElement("div");
        const questH2 = document.createElement("h2");
        questH2.appendChild(document.createTextNode(quiz.currentQuestion.text));
        questDiv.appendChild(questH2);
        const ansDiv = document.createElement("div");
        for (let i = 0; i < quiz.currentQuestion.answers.length; i++) {
            const answer = quiz.currentQuestion.answers[i];
            const ansBtn = document.createElement("button");
            ansBtn.appendChild(document.createTextNode(answer.text));
            ansBtn.addEventListener("click", ansBtnEvents(i));
            ansDiv.appendChild(ansBtn);
        }
        questDiv.appendChild(ansDiv);
        quest.appendChild(questDiv);
    }
    function ansBtnEvents(i) {
        return function () {
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
})(E05 || (E05 = {}));
//# sourceMappingURL=Main.js.map