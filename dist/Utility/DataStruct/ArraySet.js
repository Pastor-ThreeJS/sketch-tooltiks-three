"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySet = void 0;
class ArraySet {
    constructor() {
        this.arr = [];
    }
    add(t) {
        this.indexOf(t) < 0 && this.arr.push(t);
    }
    remove(t) {
        var i = this.indexOf(t);
        if (i >= 0) {
            delete this.arr[i];
        }
    }
    indexOf(t) {
        return this.arr.indexOf(t);
    }
    size() {
        return Object.keys(this.arr).length;
    }
    clear() {
        delete this.arr;
        this.arr = [];
    }
    toArray() {
        var arr = new Array();
        for (var i = 0; i < this.arr.length; i++) {
            this.arr[i] && arr.push(this.arr[i]);
        }
        return arr;
    }
}
exports.ArraySet = ArraySet;
