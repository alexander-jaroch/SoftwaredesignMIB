namespace E06 {
    export class RadialVisualiser extends Visualiser {
        protected _style: VisualiserStyle;
        private _innerRadius: number;

        public constructor(frequencies: Uint8Array, canvasElement: HTMLCanvasElement, styleOptions: Partial<VisualiserStyle>) {
            super(frequencies, canvasElement);
            this._style = new VisualiserStyle(styleOptions);
            this.resize();
        }

        public get style(): VisualiserStyle {
            return this._style;
        }

        public beautify(): void {
            for (let i: number = 0; i < this._frequencies.length / 2; i++) {
                const x: number = Math.max(this._frequencies[i], this._frequencies[this._frequencies.length - 1 - i]);
                this._frequencies[i] = x;
                this._frequencies[this._frequencies.length - 1 - i] = x;
            }
        }

        public resize(): void {
            this._innerRadius = Math.min(this._canvasCenter.x, this._canvasCenter.y) - this._style.maxAmplitudeHeight - this._style.shadowHeight - this._style.padding;
            this._canvasContext.lineWidth = 2 * Math.PI * this._innerRadius / this._frequencies.length * this._style.amplitudeWidth;
            this._canvasContext.lineCap = "round";
        }

        protected renderOne(i: number, r: number): void {
            const α: number = 2 * Math.PI / this._frequencies.length * i;
            const dir: Vector = new Vector(Math.cos(α), Math.sin(α));

            this._canvasContext.beginPath();
            const offset: Vector = this._canvasCenter.add(dir.scale(this._innerRadius));
            this._canvasContext.moveTo(offset.x, offset.y);

            const amplitude: Vector = offset.add(dir.scale(r / 255 * this._style.maxAmplitudeHeight));
            this._canvasContext.lineTo(amplitude.x, amplitude.y);

            this._canvasContext.strokeStyle = this._style.amplitudeColorLow.interpolate(this._style.amplitudeColorHigh, r / 255).toString();
            this._canvasContext.stroke();

            const shadow: Vector = amplitude.add(dir.scale(this._style.shadowHeight));
            this._canvasContext.lineTo(shadow.x, shadow.y);

            const shadowGrad: CanvasGradient = this._canvasContext.createLinearGradient(amplitude.x, amplitude.y, shadow.x, shadow.y);
            shadowGrad.addColorStop(0, this._style.shadowColorFrom.toString());
            shadowGrad.addColorStop(1, this._style.shadowColorTo.toString());
            this._canvasContext.strokeStyle = shadowGrad;
            this._canvasContext.stroke();

            // highlight
            const highlight: Vector = shadow.add(dir.scale(-1 * r / 255 * this._style.maxAmplitudeHeight - this._style.shadowHeight));
            this._canvasContext.lineTo(highlight.x, highlight.y);
            const highlightGrad: CanvasGradient = this._canvasContext.createLinearGradient(shadow.x, shadow.y, highlight.x, highlight.y);
            highlightGrad.addColorStop(0.2, (new RGBA(255, 255, 255, 0)).toString());
            highlightGrad.addColorStop(0.5, (new RGBA(255, 255, 255, 0)).interpolate(new RGBA(255, 255, 255, 0.7), r / 256).toString());
            highlightGrad.addColorStop(0.8, (new RGBA(255, 255, 255, 0)).toString());
            this._canvasContext.strokeStyle = highlightGrad;
            this._canvasContext.stroke();
        }
    }
}