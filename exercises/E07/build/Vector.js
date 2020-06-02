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
//# sourceMappingURL=Vector.js.map