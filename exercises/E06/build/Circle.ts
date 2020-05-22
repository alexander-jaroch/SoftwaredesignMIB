namespace circle {
    class Vector {
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
    }

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const context: CanvasRenderingContext2D = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const center: Vector = new Vector(innerWidth / 2, innerHeight / 2);

    const values: Array<number> = new Array<number>(128); // values

    // Variables
    const radius: number = 250; // inner emptied circle
    const maxAmpLen: number = 25; // maximum length of amplitude stroke in px

    const col: string = "rgba(128, 128, 255, 0.8)"; // color of main stroke
    const fadeCol0: string = "rgba(128, 128, 255, 0.4)"; // first color of fading stroke
    const fadeCol1: string = "rgba(128, 128, 255, 0)"; // second color of fading stroke

    // Context Settings
    context.lineWidth = 2 * Math.PI * radius / values.length * 0.25;
    context.lineCap = "round";

    requestAnimationFrame(animate);

    function animate(): void {
        randomizeValues();
        clearCanvas();
        renderAll();
        requestAnimationFrame(animate);
    }

    function clearCanvas(): void {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function renderAll(): void {
        for (let i: number = 0; i < values.length; i++) {
            renderOne(i, values[i]);
        }
    }

    function renderOne(i: number, r: number): void {
        const α: number = 2 * Math.PI / values.length * i;
        const dir: Vector = new Vector(Math.cos(α), Math.sin(α));

        context.beginPath();
        const offset: Vector = center.add(dir.scale(radius));
        context.moveTo(offset.x, offset.y);

        const amplitude: Vector = offset.add(dir.scale(r / 255 * maxAmpLen));
        context.lineTo(amplitude.x, amplitude.y);

        context.strokeStyle = col;
        context.stroke();

        const shadow: Vector = amplitude.add(dir.scale(50));
        context.lineTo(shadow.x, shadow.y);

        const g: CanvasGradient = context.createLinearGradient(amplitude.x, amplitude.y, shadow.x, shadow.y);
        g.addColorStop(0, fadeCol0);
        g.addColorStop(1, fadeCol1);
        context.strokeStyle = g;
        context.stroke();
    }

    function randomizeValues(): void {
        for (let i: number = 0; i < values.length; i++) {
            values[i] = Math.random() * 256;
            //values[i] = 2 * i;
        }
    }
}