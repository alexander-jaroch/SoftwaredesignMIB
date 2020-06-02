namespace E07 {
    export interface BooleanFunction<T> {
        (object: T): boolean;
    }

    export class FrequencyMap<T> {
        private _frequencyMap: Array<Countable<T>>;
        private _max: Countable<T>;
        private _filter: BooleanFunction<Countable<T>>;

        public constructor(filter?: BooleanFunction<Countable<T>>) {
            this._frequencyMap = new Array<Countable<T>>();
            this._filter = filter || function (): boolean { return false; };
        }

        public get max(): Countable<T> {
            return this._max;
        }

        public get map(): Array<Countable<T>> {
            return this._frequencyMap;
        }

        public get(object: Countable<T>): number {
            for (let i: number = 0; i < this._frequencyMap.length; i++) {
                if (this._frequencyMap[i].equals(object)) {
                    return this._frequencyMap[i].count;
                }
            }
            return undefined;
        }

        public count(key: Countable<T>): void {
            if (!this._filter(key)) {
                for (let i: number = 0; i < this._frequencyMap.length; i++) {
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
}