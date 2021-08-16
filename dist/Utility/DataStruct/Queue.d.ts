/**队列 */
export declare class Queue<T> {
    private elements;
    private _size;
    constructor(capacity?: number);
    enqueue(o: T): boolean;
    dequeue(): T;
    size(): number;
    empty(): boolean;
    clear(): void;
}
