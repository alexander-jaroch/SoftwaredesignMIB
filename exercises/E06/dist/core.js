"use strict";
var E06;
(function (E06) {
    class Vector {
        constructor(x, y) {
            this._x = x;
            this._y = y;
        }
        get x() {
            return this._x;
        }
        get y() {
            return this._y;
        }
        set x(value) {
            this._x = value;
        }
        set y(value) {
            this._y = value;
        }
        add(v) {
            return new Vector(this._x + v.x, this._y + v.y);
        }
        scale(s) {
            return new Vector(this._x * s, this._y * s);
        }
        length() {
            return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
        }
    }
    E06.Vector = Vector;
})(E06 || (E06 = {}));
var E06;
(function (E06) {
    class RGBA {
        constructor(r, g, b, a) {
            this._r = r;
            this._g = g;
            this._b = b;
            this._a = a;
        }
        get r() {
            return this._r;
        }
        get g() {
            return this._g;
        }
        get b() {
            return this._b;
        }
        get a() {
            return this._a;
        }
        interpolate(rgba, t) {
            const diff = new RGBA(rgba.r - this._r, rgba.g - this._g, rgba.b - this._b, rgba.a - this._a);
            return new RGBA(this._r + diff.r * t, this._g + diff.g * t, this._b + diff.b * t, this._a + diff.a * t);
        }
        toString() {
            return "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + this._a + ")";
        }
    }
    E06.RGBA = RGBA;
})(E06 || (E06 = {}));
/// <reference path="Vector.ts" />
/// <reference path="RGBA.ts" />
var E06;
/// <reference path="Vector.ts" />
/// <reference path="RGBA.ts" />
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
/// <reference path="Visualiser.ts" />
var E06;
/// <reference path="Visualiser.ts" />
(function (E06) {
    class BarVisualiser extends E06.Visualiser {
        constructor(frequencies, canvasElement, styleOptions) {
            super(frequencies, canvasElement);
            this._style = new E06.VisualiserStyle(styleOptions);
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
            const dirX = new E06.Vector(1, 0);
            const dirY = new E06.Vector(0, 1);
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
            highlightGrad.addColorStop(0.2, (new E06.RGBA(255, 255, 255, 0)).toString());
            highlightGrad.addColorStop(0.5, (new E06.RGBA(255, 255, 255, 0)).interpolate(new E06.RGBA(255, 255, 255, 0.7), r / 255).toString());
            highlightGrad.addColorStop(0.8, (new E06.RGBA(255, 255, 255, 0)).toString());
            this._canvasContext.strokeStyle = highlightGrad;
            this._canvasContext.stroke();
        }
    }
    E06.BarVisualiser = BarVisualiser;
})(E06 || (E06 = {}));
/// <reference path="Visualiser.ts" />
var E06;
/// <reference path="Visualiser.ts" />
(function (E06) {
    class RadialVisualiser extends E06.Visualiser {
        constructor(frequencies, canvasElement, styleOptions) {
            super(frequencies, canvasElement);
            this._style = new E06.VisualiserStyle(styleOptions);
            this.resize();
        }
        get style() {
            return this._style;
        }
        beautify() {
            for (let i = 0; i < this._frequencies.length / 2; i++) {
                const x = Math.max(this._frequencies[i], this._frequencies[this._frequencies.length - 1 - i]);
                this._frequencies[i] = x;
                this._frequencies[this._frequencies.length - 1 - i] = x;
            }
        }
        resize() {
            this._innerRadius = Math.min(this._canvasCenter.x, this._canvasCenter.y) - this._style.maxAmplitudeHeight - this._style.shadowHeight - this._style.padding;
            this._canvasContext.lineWidth = 2 * Math.PI * this._innerRadius / this._frequencies.length * this._style.amplitudeWidth;
            this._canvasContext.lineCap = "round";
        }
        renderOne(i, r) {
            const α = 2 * Math.PI / this._frequencies.length * i;
            const dir = new E06.Vector(Math.cos(α), Math.sin(α));
            this._canvasContext.beginPath();
            const offset = this._canvasCenter.add(dir.scale(this._innerRadius));
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
    E06.RadialVisualiser = RadialVisualiser;
})(E06 || (E06 = {}));
/// <reference path="RadialVisualiser.ts" />
/// <reference path="BarVisualiser.ts" />
var E06;
/// <reference path="RadialVisualiser.ts" />
/// <reference path="BarVisualiser.ts" />
(function (E06) {
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.style.position = "fixed";
    audio.style.top = "25px";
    document.body.appendChild(audio);
    const fftSize = 512;
    let audioContext;
    let mediaSource;
    let analyserNode;
    const input = document.createElement("input");
    input.type = "file";
    input.style.color = "rgba(255, 255, 255, 1)";
    document.body.appendChild(input);
    input.addEventListener("change", function () {
        if (input.files[0]) {
            audio.src = URL.createObjectURL(input.files[0]);
            if (!audioContext) {
                audioContext = new AudioContext();
                mediaSource = audioContext.createMediaElementSource(audio);
                analyserNode = audioContext.createAnalyser();
                mediaSource.connect(analyserNode);
                analyserNode.connect(audioContext.destination);
                analyserNode.fftSize = fftSize;
            }
            audio.play();
        }
    });
    const canvas = document.createElement("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);
    const radialStyle = {
        shadowColorFrom: new E06.RGBA(255, 0, 102, 0.2),
        shadowColorTo: new E06.RGBA(255, 0, 102, 0),
        amplitudeColorLow: new E06.RGBA(255, 0, 102, 0.5),
        amplitudeColorHigh: new E06.RGBA(255, 179, 209, 0.5)
    };
    const barStyle = {
        maxAmplitudeHeight: 100,
        amplitudeWidth: 0.75,
        shadowHeight: 50,
        shadowColorFrom: new E06.RGBA(0, 255, 255, 0.2),
        shadowColorTo: new E06.RGBA(255, 255, 0, 0),
        amplitudeColorLow: new E06.RGBA(0, 255, 255, 0.5),
        amplitudeColorHigh: new E06.RGBA(255, 255, 0, 0.5),
        padding: 0
    };
    let visualiserType = "radial";
    const values = new Uint8Array(fftSize / 2);
    let visualiser = new E06.RadialVisualiser(values, canvas, radialStyle);
    requestAnimationFrame(animate);
    function animate() {
        if (analyserNode)
            analyserNode.getByteFrequencyData(values);
        visualiser.frequencies = values;
        visualiser.beautify();
        visualiser.clearCanvas();
        visualiser.renderAll();
        requestAnimationFrame(animate);
    }
    addEventListener("resize", function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        visualiser.recenter();
        visualiser.resize();
    });
    canvas.addEventListener("click", function () {
        if (visualiserType === "radial") {
            visualiserType = "bar";
            visualiser = new E06.BarVisualiser(values, canvas, barStyle);
        }
        else if (visualiserType === "bar") {
            visualiserType = "radial";
            visualiser = new E06.RadialVisualiser(values, canvas, radialStyle);
        }
    });
})(E06 || (E06 = {}));
//# sourceMappingURL=core.js.map