"use strict";
var E07;
(function (E07) {
    class FrequencyMap {
        constructor(filter) {
            this._frequencyMap = new Array();
            this._filter = filter || function () { return false; };
        }
        get max() {
            return this._max;
        }
        get map() {
            return this._frequencyMap;
        }
        get(object) {
            for (let i = 0; i < this._frequencyMap.length; i++) {
                if (this._frequencyMap[i].equals(object)) {
                    return this._frequencyMap[i].count;
                }
            }
            return undefined;
        }
        count(key) {
            if (!this._filter(key)) {
                for (let i = 0; i < this._frequencyMap.length; i++) {
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
    E07.FrequencyMap = FrequencyMap;
})(E07 || (E07 = {}));
//# sourceMappingURL=FrequencyMap.js.map