"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/* eslint-disable */
const CAPACITY = 10;
/**栈 */
class Stack {
    constructor(capacity = CAPACITY) {
        this.elements = new Array(capacity);
        this._size = 0;
    }
    push(o) {
        var len = this.elements.length;
        if (this._size >= len) {
            let temp = new Array(len);
            this.elements = this.elements.concat(temp);
        }
        this.elements[this._size++] = o;
    }
    pop() {
        return this.elements[--this._size];
    }
    peek() {
        return this.elements[this._size - 1];
    }
    size() {
        return this._size;
    }
    empty() {
        return this._size == 0;
    }
    clear(capacity = CAPACITY) {
        delete this.elements[0];
        this.elements = new Array(capacity);
        this._size = 0;
    }
}
exports.Stack = Stack;
