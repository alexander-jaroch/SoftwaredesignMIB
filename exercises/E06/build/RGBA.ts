namespace E06 {
    export class RGBA {
        private _r: number;
        private _g: number;
        private _b: number;
        private _a: number;

        public constructor(r: number, g: number, b: number, a: number) {
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
    }
}