export default class EventEmitter {
    callbacks: {};
    /**
     * On
     */
    on(_names: any, callback: any): false | EventEmitter;
    /**
     * Off
     */
    off(_names: any): false | EventEmitter;
    /**
     * Trigger
     */
    trigger(_name: any, _args?: any): false | EventEmitter | null;
    /**
     * Resolve names
     */
    resolveNames(_names: any): any;
    /**
     * Resolve name
     */
    resolveName(name: any): {
        original: any;
        value: any;
        namespace: any;
    };
}
