"use strict";
var circle;
(function (circle) {
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
    }
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const center = new Vector(innerWidth / 2, innerHeight / 2);
    const values = new Array(128); // values
    // Variables
    const radius = 250; // inner emptied circle
    const maxAmpLen = 25; // maximum length of amplitude stroke in px
    const col = "rgba(128, 128, 255, 0.8)"; // color of main stroke
    const fadeCol0 = "rgba(128, 128, 255, 0.4)"; // first color of fading stroke
    const fadeCol1 = "rgba(128, 128, 255, 0)"; // second color of fading stroke
    // Context Settings
    context.lineWidth = 2 * Math.PI * 256 / values.length * 0.25;
    context.lineCap = "round";
    requestAnimationFrame(animate);
    function animate() {
        randomizeValues();
        clearCanvas();
        renderAll();
        requestAnimationFrame(animate);
    }
    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    function renderAll() {
        for (let i = 0; i < values.length; i++) {
            renderOne(i, values[i]);
        }
    }
    function renderOne(i, r) {
        const α = 2 * Math.PI / values.length * i;
        const dir = new Vector(Math.cos(α), Math.sin(α));
        context.beginPath();
        const offset = center.add(dir.scale(radius));
        context.moveTo(offset.x, offset.y);
        const amplitude = offset.add(dir.scale(r / 255 * maxAmpLen));
        context.lineTo(amplitude.x, amplitude.y);
        context.strokeStyle = col;
        context.stroke();
        const shadow = amplitude.add(dir.scale(50));
        context.lineTo(shadow.x, shadow.y);
        const g = context.createLinearGradient(amplitude.x, amplitude.y, shadow.x, shadow.y);
        g.addColorStop(0, fadeCol0);
        g.addColorStop(1, fadeCol1);
        context.strokeStyle = g;
        context.stroke();
    }
    function randomizeValues() {
        for (let i = 0; i < values.length; i++) {
            values[i] = Math.random() * 256;
            //values[i] = 2 * i;
        }
    }
})(circle || (circle = {}));
//# sourceMappingURL=Circle.js.map