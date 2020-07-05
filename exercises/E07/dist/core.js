"use strict";
var E07;
(function (E07) {
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
    E07.Vector = Vector;
})(E07 || (E07 = {}));
var E07;
(function (E07) {
    class Countable {
        constructor() {
            this._count = 0;
        }
        get count() {
            return this._count;
        }
        increaseCount() {
            this._count++;
        }
    }
    E07.Countable = Countable;
})(E07 || (E07 = {}));
/// <reference path="Countable.ts" />
var E07;
/// <reference path="Countable.ts" />
(function (E07) {
    class RGBA extends E07.Countable {
        constructor(r, g, b, a) {
            super();
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
        get brightness() {
            return (0.33 * this._r + 0.5 * this._g + 0.17 * this._b) / 255 * this._a;
        }
        interpolate(rgba, t) {
            const diff = new RGBA(rgba.r - this._r, rgba.g - this._g, rgba.b - this._b, rgba.a - this._a);
            return new RGBA(this._r + diff.r * t, this._g + diff.g * t, this._b + diff.b * t, this._a + diff.a * t);
        }
        toString() {
            return "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + this._a + ")";
        }
        equals(rgba) {
            return this._r === rgba._r && this._g === rgba._g && this._b === rgba._b && this._a === rgba._a;
        }
    }
    E07.RGBA = RGBA;
})(E07 || (E07 = {}));
/// <reference path="Vector.ts" />
/// <reference path="RGBA.ts" />
var E07;
/// <reference path="Vector.ts" />
/// <reference path="RGBA.ts" />
(function (E07) {
    class VisualiserStyle {
        constructor(options) {
            this.amplitudeColorHigh = new E07.RGBA(255, 255, 255, 0.5);
            this.amplitudeColorLow = new E07.RGBA(0, 0, 0, 0.5);
            this.amplitudeWidth = 0.5;
            this.maxAmplitudeHeight = 40;
            this.padding = 10;
            this.shadowColorFrom = new E07.RGBA(255, 255, 255, 0.25);
            this.shadowColorTo = new E07.RGBA(255, 255, 255, 0);
            this.shadowHeight = 25;
            Object.assign(this, options);
        }
    }
    E07.VisualiserStyle = VisualiserStyle;
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
            this._canvasCenter = new E07.Vector(this._canvasElement.width / 2, this._canvasElement.height / 2);
        }
        clearCanvas() {
            this._canvasContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        }
    }
    E07.Visualiser = Visualiser;
})(E07 || (E07 = {}));
/// <reference path="Visualiser.ts" />
var E07;
/// <reference path="Visualiser.ts" />
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
/// <reference path="Countable.ts" />
var E07;
/// <reference path="Countable.ts" />
(function (E07) {
    class FrequencyMap {
        constructor(filter) {
            this._frequencyMap = new Array();
            this._filter = filter || function () { return false; };
        }
        get max() {
            return this._max;
        }
        get map() {
            return this._frequencyMap;
        }
        get(object) {
            for (let i = 0; i < this._frequencyMap.length; i++) {
                if (this._frequencyMap[i].equals(object)) {
                    return this._frequencyMap[i].count;
                }
            }
            return undefined;
        }
        count(key) {
            if (!this._filter(key)) {
                for (let i = 0; i < this._frequencyMap.length; i++) {
                    if (this._frequencyMap[i].equals(key)) {
                        this._frequencyMap[i].increaseCount();
                        return;
                    }
                    if (this._frequencyMap[i].count > this._max.count) {
                        this._max = this._frequencyMap[i];
                    }
                }
                key.increaseCount();
                if (this._frequencyMap.length === 0) {
                    this._max = key;
                }
                this._frequencyMap.push(key);
            }
        }
    }
    E07.FrequencyMap = FrequencyMap;
})(E07 || (E07 = {}));
/// <reference path="Visualiser.ts" />
var E07;
/// <reference path="Visualiser.ts" />
(function (E07) {
    class RadialVisualiser extends E07.Visualiser {
        constructor(frequencies, canvasElement, styleOptions) {
            super(frequencies, canvasElement);
            this._style = new E07.VisualiserStyle(styleOptions);
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
            const dir = new E07.Vector(Math.cos(α), Math.sin(α));
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
            highlightGrad.addColorStop(0.2, (new E07.RGBA(255, 255, 255, 0)).toString());
            highlightGrad.addColorStop(0.5, (new E07.RGBA(255, 255, 255, 0)).interpolate(new E07.RGBA(255, 255, 255, 0.7), r / 256).toString());
            highlightGrad.addColorStop(0.8, (new E07.RGBA(255, 255, 255, 0)).toString());
            this._canvasContext.strokeStyle = highlightGrad;
            this._canvasContext.stroke();
        }
    }
    E07.RadialVisualiser = RadialVisualiser;
})(E07 || (E07 = {}));
/// <reference path="FrequencyMap.ts" />
/// <reference path="RadialVisualiser.ts" />
/// <reference path="BarVisualiser.ts" />
var E07;
/// <reference path="FrequencyMap.ts" />
/// <reference path="RadialVisualiser.ts" />
/// <reference path="BarVisualiser.ts" />
(function (E07) {
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.style.position = "fixed";
    audio.style.top = "50px";
    audio.style.left = "50px";
    const fftSize = 512;
    let audioContext;
    let mediaSource;
    let analyserNode;
    const inputSong = document.createElement("input");
    inputSong.type = "file";
    inputSong.style.color = "rgba(255, 255, 255, 1)";
    inputSong.style.position = "fixed";
    inputSong.style.top = "5px";
    inputSong.style.left = "10px";
    inputSong.addEventListener("change", function () {
        if (inputSong.files[0]) {
            audio.src = URL.createObjectURL(inputSong.files[0]);
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
    const canvasVisualizer = document.createElement("canvas");
    canvasVisualizer.width = innerWidth;
    canvasVisualizer.height = innerHeight;
    canvasVisualizer.style.position = "fixed";
    const radialStyle = {
        shadowColorFrom: new E07.RGBA(0, 0, 0, 0.5),
        shadowColorTo: new E07.RGBA(0, 0, 0, 0),
        amplitudeColorLow: new E07.RGBA(0, 0, 0, 0.5),
        amplitudeColorHigh: new E07.RGBA(255, 255, 255, 0.5)
    };
    const barStyle = {
        maxAmplitudeHeight: 100,
        amplitudeWidth: 0.75,
        shadowHeight: 50,
        shadowColorFrom: new E07.RGBA(0, 0, 0, 0.5),
        shadowColorTo: new E07.RGBA(0, 0, 0, 0),
        amplitudeColorLow: new E07.RGBA(0, 0, 0, 0.5),
        amplitudeColorHigh: new E07.RGBA(255, 255, 255, 0.5),
        padding: 0
    };
    let visualiserType = "radial";
    const values = new Uint8Array(fftSize / 2);
    let visualiser = new E07.RadialVisualiser(values, canvasVisualizer, radialStyle);
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
        canvasVisualizer.width = innerWidth;
        canvasVisualizer.height = innerHeight;
        visualiser.recenter();
        visualiser.resize();
    });
    canvasVisualizer.addEventListener("click", function () {
        if (visualiserType === "radial") {
            visualiserType = "bar";
            visualiser = new E07.BarVisualiser(values, canvasVisualizer, barStyle);
        }
        else if (visualiserType === "bar") {
            visualiserType = "radial";
            visualiser = new E07.RadialVisualiser(values, canvasVisualizer, radialStyle);
        }
    });
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";
    const inputImage = document.createElement("input");
    inputImage.type = "file";
    inputImage.style.color = "rgba(255, 255, 255, 1)";
    inputImage.style.position = "fixed";
    inputImage.style.top = "5px";
    inputImage.style.right = "10px";
    const canvasImage = document.createElement("canvas");
    canvasImage.style.position = "fixed";
    const context = canvasImage.getContext("2d");
    document.body.appendChild(canvasImage);
    document.body.appendChild(canvasVisualizer);
    document.body.appendChild(inputSong);
    document.body.appendChild(inputImage);
    document.body.appendChild(audio);
    let image = new Image();
    function inRange(x, min, max) {
        return x >= min && x <= max;
    }
    function filter(rgba) {
        const c = rgba;
        const t = 50;
        return inRange(c.r, c.g - t, c.g + t) && inRange(c.r, c.b - t, c.b + t)
            || inRange(c.g, c.r - t, c.r + t) && inRange(c.g, c.b - t, c.b + t)
            || inRange(c.b, c.r - t, c.r + t) && inRange(c.b, c.g - t, c.g + t);
    }
    inputImage.addEventListener("change", function () {
        if (inputImage.files[0]) {
            image.src = URL.createObjectURL(inputImage.files[0]);
            image.addEventListener("load", function () {
                canvasImage.width = image.width;
                canvasImage.height = image.height;
                context.drawImage(image, 0, 0);
                const imageData = context.getImageData(0, 0, canvasImage.width, canvasImage.height);
                const colors = new E07.FrequencyMap(filter);
                ////////////////////////////////
                const resolution = 4096;
                ////////////////////////////////
                const skip = image.width * image.height / resolution;
                let brightest = new E07.RGBA(imageData.data[0], imageData.data[1], imageData.data[2], 1);
                let darkest = new E07.RGBA(imageData.data[0], imageData.data[1], imageData.data[2], 1);
                for (let i = 0; i < imageData.data.length; i = Math.floor(i + 4 * skip)) {
                    const pixel = new E07.RGBA(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2], 1);
                    colors.count(pixel);
                    if (!filter(pixel)) {
                        if (pixel.brightness > brightest.brightness) {
                            brightest = pixel;
                        }
                        if (pixel.brightness < darkest.brightness) {
                            darkest = pixel;
                        }
                    }
                }
                console.log(darkest.toString(), colors.max.toString(), brightest.toString());
                visualiser.style.amplitudeColorLow = colors.max.brightness > 0.5 ? darkest : brightest;
                visualiser.style.amplitudeColorHigh = colors.max.brightness > 0.5 ? brightest : darkest;
                visualiser.style.shadowColorFrom = new E07.RGBA(0, 0, 0, 0.5);
                visualiser.style.shadowColorTo = new E07.RGBA(0, 0, 0, 0);
                barStyle.amplitudeColorLow = colors.max.brightness > 0.5 ? darkest : brightest;
                barStyle.amplitudeColorHigh = colors.max.brightness > 0.5 ? brightest : darkest;
                barStyle.shadowColorFrom = new E07.RGBA(0, 0, 0, 0.5);
                barStyle.shadowColorTo = new E07.RGBA(0, 0, 0, 0);
                radialStyle.amplitudeColorLow = colors.max.brightness > 0.5 ? darkest : brightest;
                radialStyle.amplitudeColorHigh = colors.max.brightness > 0.5 ? brightest : darkest;
                radialStyle.shadowColorFrom = new E07.RGBA(0, 0, 0, 0.5);
                radialStyle.shadowColorTo = new E07.RGBA(0, 0, 0, 0);
            });
        }
    });
})(E07 || (E07 = {}));
//# sourceMappingURL=core.js.map