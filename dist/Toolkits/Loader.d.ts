import * as Utility from '../Utility';
export declare class Loader extends Utility.Eventemitter {
    constructor();
    private loaders;
    private toLoad;
    private loaded;
    private items;
    Init(data: any): void;
    GetItem(key: string): any;
    private setLoaders;
    private load;
    private fileLoadEnd;
}
