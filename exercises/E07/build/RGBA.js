"use strict";
var E07;
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
//# sourceMappingURL=RGBA.js.map