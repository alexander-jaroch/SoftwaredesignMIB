namespace E06 {
    export interface VisualiserStyleOptions {
        [option: string]: number | RGBA;
    }

    export class VisualiserStyle {
        [option: string]: number | RGBA | Function;
        public amplitudeColorHigh: RGBA = new RGBA(255, 255, 255, 0.5);
        public amplitudeColorLow: RGBA = new RGBA(0, 0, 0, 0.5);
        public amplitudeWidth: number = 0.5;
        public maxAmplitudeHeight: number = 40;
        public padding: number = 10;
        public shadowColorFrom: RGBA = new RGBA(255, 255, 255, 0.25);
        public shadowColorTo: RGBA = new RGBA(255, 255, 255, 0);
        public shadowHeight: number = 25;

        protected constructor(options: VisualiserStyleOptions) {
            this.init(options);
        }

        protected init(options: VisualiserStyleOptions): void {
            for (let option in options) {
                if (this[option]) {
                    this[option] = options[option];
                }
            }
        }
    }

    export abstract class Visualiser {
        protected _frequencies: Uint8Array;
        protected _canvasElement: HTMLCanvasElement;
        protected _canvasContext: CanvasRenderingContext2D;
        protected _canvasCenter: Vector;
        protected abstract _style: VisualiserStyle;

        protected constructor(frequencies: Uint8Array, canvasElement: HTMLCanvasElement) {
            this._frequencies = frequencies;
            this._canvasElement = canvasElement;
            this._canvasContext = canvasElement.getContext("2d");
            this.recenter();
        }

        public set frequencies(value: Uint8Array) {
            this._frequencies = value;
        }

        public abstract get style(): VisualiserStyle;

        public abstract beautify(): void;

        public renderAll(): void {
            for (let i: number = 0; i < this._frequencies.length; i++) {
                this.renderOne(i, this._frequencies[i]);
            }
        }

        public recenter(): void {
            this._canvasCenter = new Vector(this._canvasElement.width / 2, this._canvasElement.height / 2);
        }

        public abstract resize(): void;

        public clearCanvas(): void {
            this._canvasContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        }

        protected abstract renderOne(i: number, r: number): void;
    }
} 