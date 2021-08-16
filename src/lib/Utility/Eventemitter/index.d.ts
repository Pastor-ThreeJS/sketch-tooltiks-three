/**事件触发器 */
export default class EventEmitter {
    /**
     * On
     */
    on(_names, callback);

    /**
     * Off
     */
    off(_names);

    /**
     * Trigger
     */
    trigger(_name, _args?);

    /**
     * Resolve names
     */
    resolveNames(_names);

    /**
     * Resolve name
     */
    resolveName(name);
}
