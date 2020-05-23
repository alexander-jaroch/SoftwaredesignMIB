"use strict";
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
//# sourceMappingURL=RGBA.js.map