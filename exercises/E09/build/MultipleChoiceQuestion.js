"use strict";
var E09;
(function (E09) {
    class MultipleChoiceQuestion extends E09.Question {
        constructor(_text, _answers) {
            super(_text);
            this.answers = _answers;
        }
        toString() {
            const letterSet = ["A", "B", "C", "D", "E", "F"];
            const usedIndices = new Array();
            let r = this.text;
            for (let i = 0; i < this.answers.length; i++) {
                let randomIndex;
                do
                    randomIndex = Math.floor(Math.random() * this.answers.length);
                while (usedIndices.includes(randomIndex));
                usedIndices.push(randomIndex);
                this.answers[randomIndex].letter = letterSet[i];
                r += "\n" + this.answers[randomIndex].toString();
            }
            return r;
        }
        check(_input) {
            const input = _input.trim().toUpperCase().split(" ");
            for (const answer of this.answers) {
                if (answer.check() && !input.includes(answer.letter) || input.includes(answer.letter) && !answer.check())
                    return false;
            }
            return true;
        }
    }
    E09.MultipleChoiceQuestion = MultipleChoiceQuestion;
})(E09 || (E09 = {}));
//# sourceMappingURL=MultipleChoiceQuestion.js.map