namespace E07 {
    export class BarVisualiser extends Visualiser {
        protected _style: VisualiserStyle;

        public constructor(frequencies: Uint8Array, canvasElement: HTMLCanvasElement, styleOptions: Partial<VisualiserStyle>) {
            super(frequencies, canvasElement);
            this._style = new VisualiserStyle(styleOptions);
            this.resize();
        }

        public get style(): VisualiserStyle {
            return this._style;
        }

        public beautify(): void {
            // DO NOTHING
        }

        public resize(): void {
            this._canvasContext.lineWidth = this._canvasElement.width / this._frequencies.length * this._style.amplitudeWidth;
            this._canvasContext.lineCap = "round";
        }

        protected renderOne(i: number, r: number): void {
            const dirX: Vector = new Vector(1, 0);
            const dirY: Vector = new Vector(0, 1);

            this._canvasContext.beginPath();
            const position: Vector = this._canvasCenter.add(dirX.scale((i + 0.5 - this._frequencies.length / 2) * ((this._canvasElement.width - 2 * this._style.padding) / this._frequencies.length)));
            this._canvasContext.moveTo(position.x, position.y);
            const amplitude: Vector = position.add(dirY.scale(-1 * r / 255 * this._style.maxAmplitudeHeight));
            this._canvasContext.lineTo(amplitude.x, amplitude.y);

            this._canvasContext.strokeStyle = this._style.amplitudeColorLow.interpolate(this._style.amplitudeColorHigh, r / 255).toString();
            this._canvasContext.stroke();

            const shadow: Vector = amplitude.add(dirY.scale(-1 * this._style.shadowHeight));
            this._canvasContext.lineTo(shadow.x, shadow.y);

            const shadowGrad: CanvasGradient = this._canvasContext.createLinearGradient(amplitude.x, amplitude.y, shadow.x, shadow.y);
            shadowGrad.addColorStop(0, this._style.shadowColorFrom.interpolate(this._style.shadowColorTo, r / 255).toString());
            shadowGrad.addColorStop(1, this._style.shadowColorTo.toString());
            this._canvasContext.strokeStyle = shadowGrad;
            this._canvasContext.stroke();

            // highlight
            const highlight: Vector = shadow.add(dirY.scale(2 * this._style.shadowHeight));
            this._canvasContext.lineTo(highlight.x, highlight.y);
            const highlightGrad: CanvasGradient = this._canvasContext.createLinearGradient(shadow.x, shadow.y, highlight.x, highlight.y);
            highlightGrad.addColorStop(0.2, (new RGBA(255, 255, 255, 0)).toString());
            highlightGrad.addColorStop(0.5, (new RGBA(255, 255, 255, 0)).interpolate(new RGBA(255, 255, 255, 0.7), r / 255).toString());
            highlightGrad.addColorStop(0.8, (new RGBA(255, 255, 255, 0)).toString());
            this._canvasContext.strokeStyle = highlightGrad;
            this._canvasContext.stroke();
        }
    }
}