"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**字典 */
class Dictionary {
    constructor() {
        this.items = {};
        this.has = this.has.bind(this);
        this.set = this.set.bind(this);
        this.delete = this.delete.bind(this);
    }
    has(key) {
        return this.items.hasOwnProperty(key);
    }
    set(key, val) {
        this.items[key] = val;
    }
    delete(key) {
        if (this.has(key)) {
            delete this.items[key];
        }
        return false;
    }
    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }
    values() {
        let values = [];
        for (let k in this.items) {
            if (this.has(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }
    clear() {
        this.items = {};
    }
}
exports.default = Dictionary;
