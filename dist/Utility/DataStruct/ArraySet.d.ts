/**集合 */
export interface Set<T> {
    add(t: T): void;
    remove(t: T): void;
    indexOf(t: T): number;
    size(): number;
    clear(): void;
    toArray(): T[];
}
export declare class ArraySet<T> implements Set<T> {
    private arr;
    add(t: T): void;
    remove(t: T): void;
    indexOf(t: T): number;
    size(): number;
    clear(): void;
    toArray(): T[];
}
