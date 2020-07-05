namespace E07 {
    export abstract class Countable<T> {
        protected _count: number;

        protected constructor() {
            this._count = 0;
        }

        public get count(): number {
            return this._count;
        }

        public increaseCount(): void {
            this._count++;
        }

        public abstract equals(obj: Countable<T>): boolean;
    }
}