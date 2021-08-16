/**字典 */
export default class Dictionary {
    private items: any;
    private array: any;
    constructor() {
        this.items = {};
        this.has = this.has.bind(this);
        this.set = this.set.bind(this);
        this.delete = this.delete.bind(this);
    }
    has(key: any): boolean {
        return this.items.hasOwnProperty(key);
    }
    set(key: any, val: any) {
        this.items[key] = val;
    }
    delete(key: any): boolean {
        if (this.has(key)) {
            delete this.items[key];
        }
        return false;
    }
    get(key: any): any {
        return this.has(key) ? this.items[key] : undefined;
    }
    values(): any[] {
        let values: any[] = [];
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
