"use strict";
var E06;
(function (E06) {
    class RadialAnalyser extends E06.Analyser {
        constructor(audioElement, fftSize, canvasElement, style) {
            super(audioElement, fftSize, canvasElement);
            this._style = style;
        }
        beautify() {
            for (let i = 0; i < this._frequencies.length / 2; i++) {
                const x = Math.max(this._frequencies[i], this._frequencies[this._frequencies.length - 1 - i]);
                this._frequencies[i] = x;
                this._frequencies[this._frequencies.length - 1 - i] = x;
            }
        }
        renderOne(i, r) {
            const α = 2 * Math.PI / this._frequencies.length * i;
            const dir = new E06.Vector(Math.cos(α), Math.sin(α));
            this._canvasContext.beginPath();
            const offset = this._canvasCenter.add(dir.scale(this._style.innerRadius));
            this._canvasContext.moveTo(offset.x, offset.y);
            const amplitude = offset.add(dir.scale(r / 255 * this._style.maxAmplitudeHeight));
            this._canvasContext.lineTo(amplitude.x, amplitude.y);
            this._canvasContext.strokeStyle = this._style.amplitudeColorLow.interpolate(this._style.amplitudeColorHigh, r / 255).toString();
            this._canvasContext.stroke();
            const shadow = amplitude.add(dir.scale(this._style.shadowHeight));
            this._canvasContext.lineTo(shadow.x, shadow.y);
            const shadowGrad = this._canvasContext.createLinearGradient(amplitude.x, amplitude.y, shadow.x, shadow.y);
            shadowGrad.addColorStop(0, this._style.shadowColorFrom.toString());
            shadowGrad.addColorStop(1, this._style.shadowColorTo.toString());
            this._canvasContext.strokeStyle = shadowGrad;
            this._canvasContext.stroke();
            // highlight
            const highlight = shadow.add(dir.scale(-1 * r / 255 * this._style.maxAmplitudeHeight - this._style.shadowHeight));
            this._canvasContext.lineTo(highlight.x, highlight.y);
            const highlightGrad = this._canvasContext.createLinearGradient(shadow.x, shadow.y, highlight.x, highlight.y);
            highlightGrad.addColorStop(0.2, (new E06.RGBA(255, 255, 255, 0)).toString());
            highlightGrad.addColorStop(0.5, (new E06.RGBA(255, 255, 255, 0)).interpolate(new E06.RGBA(255, 255, 255, 0.7), r / 256).toString());
            highlightGrad.addColorStop(0.8, (new E06.RGBA(255, 255, 255, 0)).toString());
            this._canvasContext.strokeStyle = highlightGrad;
            this._canvasContext.stroke();
        }
    }
    E06.RadialAnalyser = RadialAnalyser;
})(E06 || (E06 = {}));
//# sourceMappingURL=RadialAnalyser.js.map