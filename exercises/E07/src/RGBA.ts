/// <reference path="Countable.ts" />

namespace E07 {
    export class RGBA extends Countable<RGBA> {
        private _r: number;
        private _g: number;
        private _b: number;
        private _a: number;

        public constructor(r: number, g: number, b: number, a: number) {
            super();
            this._r = r;
            this._g = g;
            this._b = b;
            this._a = a;
        }

        public get r(): number {
            return this._r;
        }

        public get g(): number {
            return this._g;
        }

        public get b(): number {
            return this._b;
        }

        public get a(): number {
            return this._a;
        }

        public get brightness(): number {
            return (0.33 * this._r + 0.5 * this._g + 0.17 * this._b) / 255 * this._a;
        }

        public interpolate(rgba: RGBA, t: number): RGBA {
            const diff: RGBA = new RGBA(
                rgba.r - this._r,
                rgba.g - this._g,
                rgba.b - this._b,
                rgba.a - this._a
            );

            return new RGBA(
                this._r + diff.r * t,
                this._g + diff.g * t,
                this._b + diff.b * t,
                this._a + diff.a * t
            );
        }

        public toString(): string {
            return "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + this._a + ")";
        }

        public equals(rgba: RGBA): boolean {
            return this._r === rgba._r && this._g === rgba._g && this._b === rgba._b && this._a === rgba._a;
        }
    }
}