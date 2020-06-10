namespace E09 {
    // output display
    const outputDiv: HTMLDivElement = document.createElement("div");
    outputDiv.classList.add("padding");
    document.body.appendChild(outputDiv);

    // input line
    const inputDiv: HTMLDivElement = document.createElement("div");
    inputDiv.classList.add("input", "padding");
    document.body.appendChild(inputDiv);

    const inputElt: HTMLInputElement = document.createElement("input");
    inputElt.type = "text";
    inputDiv.appendChild(inputElt);

    // dark mode button
    const mode: HTMLDivElement = document.createElement("div");
    mode.classList.add("mode");
    mode.addEventListener("click", changeMode);
    function changeMode(): void {
        document.body.classList.toggle("dark");
    }
    document.body.appendChild(mode);

    // ???
    addEventListener("click", () => { inputElt.focus(); });
    Main();

    // Main
    async function Main(): Promise<void> {
        const quiz: Quiz = new Quiz(await (await fetch("DefaultQuestions.json")).json());
        let input: string;
        printLn("The Quiz\n========");
        do {
            printLn("[ANS] answer a question\n[ADD] add a question\n[SVQ] save questions\n[CLC] clear console\n[ Q ] quit quiz");
            input = await getInput();

            switch (prepareInput(input)) {
                // answer a question
                case "ANS":
                    printLn(quiz.currentQuestion.toString());
                    input = await getInput();
                    const isRight: boolean = quiz.answerCurrentQuestion(input);
                    if (isRight)
                        printLn("You're right!");
                    else
                        printLn("You're wrong!");
                    printLn(quiz.score + "\n");
                    break;
                // add a question
                case "ADD":
                    break;
                // save questions
                case "SVQ":
                    const questionString: string = JSON.stringify(quiz);
                    const questionBlob: Blob = new Blob([questionString], { type: "application/json" });
                    printLn("Filename: ");
                    input = await getInput();
                    print("File ready... ");
                    printDl(URL.createObjectURL(questionBlob), input);
                    printLn(" (" + questionBlob.size + " Bytes)\n");
                    break;
                case "CLC":
                    outputDiv.innerHTML = "";
                    printLn("The Quiz\n========");
            }
        }
        while (!["Q", "QUIT", "EXIT"].includes(prepareInput(input)));
        inputElt.disabled = true;
        inputElt.value = "Quiz ended.";
    }

    // prepares input for switch cases
    function prepareInput(_input: string): string {
        return _input.trim().toUpperCase();
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
                    printLn("> " + value);
                    inputElt.scrollIntoView();
                    resolve(value);
                }
            };
            inputElt.addEventListener("keydown", keydownEvent);
        });
    }

    // prints a line on custom console
    function printLn(_text: string = ""): void {
        print(_text);
        outputDiv.appendChild(document.createElement("br"));
    }

    // prints on custom console
    function print(_text: string): void {
        const textParts: Array<string> = _text.split("\n");
        for (let i: number = 0; i < textParts.length; i++) {
            outputDiv.appendChild(new Text(textParts[i]));
            if (i < textParts.length - 1)
                outputDiv.appendChild(document.createElement("br"));
        }
    }

    // prints a download url
    function printDl(_url: string, _filename: string): void {
        const download: HTMLAnchorElement = document.createElement("a");
        _filename += ".json";
        download.href = _url;
        download.download = _filename;
        download.appendChild(new Text(_filename));
        outputDiv.appendChild(download);
    }
}