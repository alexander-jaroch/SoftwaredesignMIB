namespace E06 {
    export abstract class Analyser {
        protected _frequencies: Uint8Array;
        protected _canvasElement: HTMLCanvasElement;
        protected _canvasContext: CanvasRenderingContext2D;
        protected _canvasCenter: Vector;

        protected constructor(frequencies: Uint8Array, canvasElement: HTMLCanvasElement) {
            this._frequencies = frequencies;
            this._canvasElement = canvasElement;
            this._canvasContext = canvasElement.getContext("2d");
            this._canvasCenter = new Vector(this._canvasElement.width / 2, this._canvasElement.height / 2);
        }

        public set frequencies(value: Uint8Array) {
            this._frequencies = value;
        }

        public abstract beautify(): void;

        public renderAll(): void {
            for (let i: number = 0; i < this._frequencies.length; i++) {
                this.renderOne(i, this._frequencies[i]);
            }
        }

        public clearCanvas(): void {
            this._canvasContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        }

        protected abstract renderOne(i: number, r: number): void;
    }
} 