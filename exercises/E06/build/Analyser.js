"use strict";
var E06;
(function (E06) {
    class Analyser {
        constructor(frequencies, canvasElement) {
            this._frequencies = frequencies;
            this._canvasElement = canvasElement;
            this._canvasContext = canvasElement.getContext("2d");
            this._canvasCenter = new E06.Vector(this._canvasElement.width / 2, this._canvasElement.height / 2);
        }
        set frequencies(value) {
            this._frequencies = value;
        }
        renderAll() {
            for (let i = 0; i < this._frequencies.length; i++) {
                this.renderOne(i, this._frequencies[i]);
            }
        }
        clearCanvas() {
            this._canvasContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        }
    }
    E06.Analyser = Analyser;
})(E06 || (E06 = {}));
//# sourceMappingURL=Analyser.js.map