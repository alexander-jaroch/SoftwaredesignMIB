"use strict";
var E06;
(function (E06) {
    class Analyser {
        constructor(audioElement, fftSize, canvasElement) {
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
            this._canvasCenter = new E06.Vector(this._canvasElement.width / 2, this._canvasElement.height / 2);
        }
        analyse() {
            this._analyserNode.getByteFrequencyData(this._frequencies);
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