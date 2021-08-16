/**字典 */
export default class Dictionary {
    private items;
    private array;
    constructor();
    has(key: any): boolean;
    set(key: any, val: any): void;
    delete(key: any): boolean;
    get(key: any): any;
    values(): any[];
    clear(): void;
}
