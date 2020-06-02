"use strict";
var E07;
(function (E07) {
    class VisualiserStyle {
        constructor(options) {
            this.amplitudeColorHigh = new E07.RGBA(255, 255, 255, 0.5);
            this.amplitudeColorLow = new E07.RGBA(0, 0, 0, 0.5);
            this.amplitudeWidth = 0.5;
            this.maxAmplitudeHeight = 40;
            this.padding = 10;
            this.shadowColorFrom = new E07.RGBA(255, 255, 255, 0.25);
            this.shadowColorTo = new E07.RGBA(255, 255, 255, 0);
            this.shadowHeight = 25;
            Object.assign(this, options);
        }
    }
    E07.VisualiserStyle = VisualiserStyle;
    class Visualiser {
        constructor(frequencies, canvasElement) {
            this._frequencies = frequencies;
            this._canvasElement = canvasElement;
            this._canvasContext = canvasElement.getContext("2d");
            this.recenter();
        }
        set frequencies(value) {
            this._frequencies = value;
        }
        renderAll() {
            for (let i = 0; i < this._frequencies.length; i++) {
                this.renderOne(i, this._frequencies[i]);
            }
        }
        recenter() {
            this._canvasCenter = new E07.Vector(this._canvasElement.width / 2, this._canvasElement.height / 2);
        }
        clearCanvas() {
            this._canvasContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        }
    }
    E07.Visualiser = Visualiser;
})(E07 || (E07 = {}));
//# sourceMappingURL=Visualiser.js.map