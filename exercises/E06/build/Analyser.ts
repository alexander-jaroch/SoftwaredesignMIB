namespace E06 {
    export abstract class Analyser {
        protected _audioElement: HTMLAudioElement;
        protected _audioContext: AudioContext;
        protected _mediaSource: MediaElementAudioSourceNode;
        protected _analyserNode: AnalyserNode;
        protected _frequencies: Uint8Array;
        protected _canvasElement: HTMLCanvasElement;
        protected _canvasContext: CanvasRenderingContext2D;
        protected _canvasCenter: Vector;

        protected constructor(audioElement: HTMLAudioElement, fftSize: PowerOfTwo, canvasElement: HTMLCanvasElement) {
            this._audioElement = audioElement;
            this._audioContext = new AudioContext();
            this._mediaSource = this._audioContext.createMediaElementSource(this._audioElement);
            this._analyserNode = this._audioContext.createAnalyser();
            this._mediaSource.connect(this._analyserNode);
            this._analyserNode.connect(this._audioContext.destination);
            this._analyserNode.fftSize = fftSize;
            this._frequencies = new Uint8Array(this._analyserNode.frequencyBinCount);
            this._canvasElement = canvasElement;
            this._canvasContext = canvasElement.getContext("2d");
            this._canvasCenter = new Vector(this._canvasElement.width / 2, this._canvasElement.height / 2);
        }

        public analyse(): void {
            this._analyserNode.getByteFrequencyData(this._frequencies);
        }

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