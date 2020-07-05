namespace E07 {
    export class Vector {
        private _x: number;
        private _y: number;

        public constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }

        public get x(): number {
            return this._x;
        }

        public get y(): number {
            return this._y;
        }

        public set x(value: number) {
            this._x = value;
        }

        public set y(value: number) {
            this._y = value;
        }

        public add(v: Vector): Vector {
            return new Vector(this._x + v.x, this._y + v.y);
        }

        public scale(s: number): Vector {
            return new Vector(this._x * s, this._y * s);
        }

        public length(): number {
            return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
        }
    }
}