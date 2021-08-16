"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Singleton_1 = __importDefault(require("./Singleton/Singleton"));
const Dictionary_1 = __importDefault(require("./DataStruct/Dictionary"));
/**事件系统
 */
class EventDispatcher extends Singleton_1.default {
    //注册事件
    static addEventListener(_eventType, _callBack) {
        if (!EventDispatcher.eventListenerDic.has(_eventType)) {
            EventDispatcher.eventListenerDic.set(_eventType, new EventListener());
            EventDispatcher.eventListenerCountDic.set(_eventType, new EventListenerCount());
        }
        if (EventDispatcher.eventListenerDic.get(_eventType).Append(_callBack)) {
            EventDispatcher.eventListenerCountDic.get(_eventType).addCount();
        }
    }
    ;
    //移除事件
    static removeEventListener(_eventType, _callBack) {
        if (EventDispatcher.eventListenerDic.has(_eventType)) {
            EventDispatcher.eventListenerDic.get(_eventType).Remove(_callBack);
            EventDispatcher.eventListenerCountDic.get(_eventType).removeCount();
            if (EventDispatcher.eventListenerCountDic.get(_eventType).getCount() <= 0) {
                EventDispatcher.eventListenerDic.delete(_eventType);
                EventDispatcher.eventListenerCountDic.delete(_eventType);
            }
        }
        else {
            console.log("移除不存在的事件侦听:  " + _eventType);
        }
    }
    static dispatchEvent(_eventType, _eventParams = null) {
        if (EventDispatcher.eventListenerDic.has(_eventType)) {
            {
                var eventListener = EventDispatcher.eventListenerDic.get(_eventType);
                eventListener.Excute(_eventParams);
            }
        }
        else {
            //console.warn("事件", _eventType, "未注册！")
        }
    }
}
exports.default = EventDispatcher;
EventDispatcher.eventListenerDic = new Dictionary_1.default();
EventDispatcher.eventListenerCountDic = new Dictionary_1.default();
/**侦听计数 */
class EventListenerCount {
    constructor() {
        this.count = 0;
    }
    addCount() {
        this.count++;
    }
    removeCount() {
        this.count--;
        if (this.count <= 0)
            this.count = 0;
    }
    getCount() {
        return this.count;
    }
}
/**事件侦听器 */
class EventListener {
    constructor() {
        this.OnEvent = [];
    }
    Excute(myEvent) {
        this.OnEvent.forEach(element => {
            if (element != null)
                element(myEvent);
        });
    }
    Append(event) {
        var index = this.OnEvent.indexOf(event);
        if (index == -1) {
            this.OnEvent.push(event);
            //console.log("注册进入" + index);
            return true;
        }
        else {
            console.log("该方法已经注册过" + "  " + index);
            return false;
        }
    }
    Remove(event) {
        var index = this.OnEvent.indexOf(event);
        if (index > -1) {
            this.OnEvent.splice(index, 1);
        }
    }
}
