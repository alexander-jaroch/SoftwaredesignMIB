"use strict";
var E06;
(function (E06) {
    class VisualiserStyle {
        constructor(options) {
            this.amplitudeColorHigh = new E06.RGBA(255, 255, 255, 0.5);
            this.amplitudeColorLow = new E06.RGBA(0, 0, 0, 0.5);
            this.amplitudeWidth = 0.5;
            this.maxAmplitudeHeight = 40;
            this.padding = 10;
            this.shadowColorFrom = new E06.RGBA(255, 255, 255, 0.25);
            this.shadowColorTo = new E06.RGBA(255, 255, 255, 0);
            this.shadowHeight = 25;
            Object.assign(this, options);
        }
    }
    E06.VisualiserStyle = VisualiserStyle;
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
            this._canvasCenter = new E06.Vector(this._canvasElement.width / 2, this._canvasElement.height / 2);
        }
        clearCanvas() {
            this._canvasContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        }
    }
    E06.Visualiser = Visualiser;
})(E06 || (E06 = {}));
//# sourceMappingURL=Visualiser.js.map