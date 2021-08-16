/* eslint-disable */
/**队列 */
export class Queue<T> {

    private elements: any;
    private _size: number | undefined;

    public constructor(capacity?: number) {
        this.elements = new Array<T>();
        this._size = capacity;
    }

    public enqueue(o: T) {
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

    public dequeue(): T {
        return this.elements.pop();
    }

    public size(): number {
        return this.elements.length;
    }

    public empty(): boolean {
        return this.size() == 0;
    }

    public clear() {
        delete this.elements;
        this.elements = new Array<T>();
    }
}

