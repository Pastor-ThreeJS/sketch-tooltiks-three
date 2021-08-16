"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
/* eslint-disable */
/**队列 */
class Queue {
    constructor(capacity) {
        this.elements = new Array();
        this._size = capacity;
    }
    enqueue(o) {
        if (o == null) {
            return false;
        }
        //如果传递了size参数就设置了队列的大小
        if (this._size != undefined && !isNaN(this._size)) {
            if (this.elements.length == this._size) {
                this.dequeue();
            }
        }
        this.elements.unshift(o);
        return true;
    }
    dequeue() {
        return this.elements.pop();
    }
    size() {
        return this.elements.length;
    }
    empty() {
        return this.size() == 0;
    }
    clear() {
        delete this.elements;
        this.elements = new Array();
    }
}
exports.Queue = Queue;
