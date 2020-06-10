namespace E09 {
    const outputElt: HTMLDivElement = document.createElement("div");
    document.body.appendChild(outputElt);

    const inputElt: HTMLInputElement = document.createElement("input");
    inputElt.type = "text";
    document.body.appendChild(inputElt);

    /*const modeBtn: HTMLDivElement = document.createElement("div");
    modeBtn.id = "modeBtn";
    modeBtn.dataset.mode = "light";
    modeBtn.addEventListener("click", () => {
        if (modeBtn.dataset.mode === "light") {
            document.body.classList.add("darkmode");
            modeBtn.dataset.mode = "dark";
        } else {
            document.body.classList.remove("darkmode");
            modeBtn.dataset.mode = "light";
        }
    });
    document.body.appendChild(modeBtn);*/

    // ???
    addEventListener("click", () => { inputElt.focus(); });

    Main();

    // Main
    async function Main(): Promise<void> {
        const defaultQuestions: QuestionDataSet = await (await fetch("DefaultQuestions.json")).json();
        const quiz: Quiz = new Quiz(defaultQuestions);

        printLn("The Quiz");
        printLn("========");

        let input: string;
        do {
            printLn(quiz.currentQuestion.toString());
            input = await getInput();
            printLn("> " + input);
            printLn(quiz.answerCurrentQuestion(input) + "");
            printLn(quiz.score);
        }
        while (input !== "exit");
        inputElt.disabled = true;
        inputElt.value = "Quiz ended.";
    }

    // waits for user input
    function getInput(): Promise<string> {
        inputElt.focus();
        return new Promise(function (resolve: FunctionStringCallback): void {
            const keydownEvent: EventListener = (event: Event) => {
                if ((event as KeyboardEvent).key === "Enter") {
                    const value: string = inputElt.value;
                    inputElt.value = "";
                    inputElt.removeEventListener("keydown", keydownEvent);
                    resolve(value);
                }
            };
            inputElt.addEventListener("keydown", keydownEvent);
        });
    }

    // prints a line on custom console
    function printLn(_text: string): void {
        const textParts: Array<string> = _text.split("\n");
        for (const part of textParts) {
            outputElt.appendChild(new Text(part));
            outputElt.appendChild(document.createElement("br"));
        }
    }
}