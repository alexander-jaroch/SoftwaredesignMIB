"use strict";
var E07;
(function (E07) {
    class BarVisualiser extends E07.Visualiser {
        constructor(frequencies, canvasElement, styleOptions) {
            super(frequencies, canvasElement);
            this._style = new E07.VisualiserStyle(styleOptions);
            this.resize();
        }
        get style() {
            return this._style;
        }
        beautify() {
            // DO NOTHING
        }
        resize() {
            this._canvasContext.lineWidth = this._canvasElement.width / this._frequencies.length * this._style.amplitudeWidth;
            this._canvasContext.lineCap = "round";
        }
        renderOne(i, r) {
            const dirX = new E07.Vector(1, 0);
            const dirY = new E07.Vector(0, 1);
            this._canvasContext.beginPath();
            const position = this._canvasCenter.add(dirX.scale((i + 0.5 - this._frequencies.length / 2) * ((this._canvasElement.width - 2 * this._style.padding) / this._frequencies.length)));
            this._canvasContext.moveTo(position.x, position.y);
            const amplitude = position.add(dirY.scale(-1 * r / 255 * this._style.maxAmplitudeHeight));
            this._canvasContext.lineTo(amplitude.x, amplitude.y);
            this._canvasContext.strokeStyle = this._style.amplitudeColorLow.interpolate(this._style.amplitudeColorHigh, r / 255).toString();
            this._canvasContext.stroke();
            const shadow = amplitude.add(dirY.scale(-1 * this._style.shadowHeight));
            this._canvasContext.lineTo(shadow.x, shadow.y);
            const shadowGrad = this._canvasContext.createLinearGradient(amplitude.x, amplitude.y, shadow.x, shadow.y);
            shadowGrad.addColorStop(0, this._style.shadowColorFrom.interpolate(this._style.shadowColorTo, r / 255).toString());
            shadowGrad.addColorStop(1, this._style.shadowColorTo.toString());
            this._canvasContext.strokeStyle = shadowGrad;
            this._canvasContext.stroke();
            // highlight
            const highlight = shadow.add(dirY.scale(2 * this._style.shadowHeight));
            this._canvasContext.lineTo(highlight.x, highlight.y);
            const highlightGrad = this._canvasContext.createLinearGradient(shadow.x, shadow.y, highlight.x, highlight.y);
            highlightGrad.addColorStop(0.2, (new E07.RGBA(255, 255, 255, 0)).toString());
            highlightGrad.addColorStop(0.5, (new E07.RGBA(255, 255, 255, 0)).interpolate(new E07.RGBA(255, 255, 255, 0.7), r / 255).toString());
            highlightGrad.addColorStop(0.8, (new E07.RGBA(255, 255, 255, 0)).toString());
            this._canvasContext.strokeStyle = highlightGrad;
            this._canvasContext.stroke();
        }
    }
    E07.BarVisualiser = BarVisualiser;
})(E07 || (E07 = {}));
//# sourceMappingURL=BarVisualiser.js.map