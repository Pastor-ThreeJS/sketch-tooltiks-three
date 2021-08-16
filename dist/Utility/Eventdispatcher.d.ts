import Singleton from "./Singleton/Singleton";
/**事件系统
 */
export default class EventDispatcher extends Singleton {
    private static eventListenerDic;
    private static eventListenerCountDic;
    static addEventListener(_eventType: string, _callBack: any): void;
    static removeEventListener(_eventType: string, _callBack: any): void;
    static dispatchEvent(_eventType: string, _eventParams?: any): void;
}
