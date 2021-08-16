/**栈 */
export declare class Stack<T> {
    private elements;
    private _size;
    constructor(capacity?: number);
    push(o: T): void;
    pop(): T;
    peek(): T;
    size(): number;
    empty(): boolean;
    clear(capacity?: number): void;
}
