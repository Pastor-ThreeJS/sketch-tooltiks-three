import Singleton from "./Singleton/Singleton"
import Dictionary from "./DataStruct/Dictionary";

/**事件系统
 */
export default class EventDispatcher extends Singleton {
    private static eventListenerDic: Dictionary = new Dictionary();
    private static eventListenerCountDic: Dictionary = new Dictionary();

    //注册事件
    public static addEventListener(_eventType: string, _callBack: any) {
        if (!EventDispatcher.eventListenerDic.has(_eventType)) {
            EventDispatcher.eventListenerDic.set(_eventType, new EventListener());
            EventDispatcher.eventListenerCountDic.set(_eventType, new EventListenerCount())
        }
        if (EventDispatcher.eventListenerDic.get(_eventType).Append(_callBack)) {
            EventDispatcher.eventListenerCountDic.get(_eventType).addCount();
        }
    };

    //移除事件
    public static removeEventListener(_eventType: string, _callBack: any) {
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

    public static dispatchEvent(_eventType: string, _eventParams: any = null) {
        if (EventDispatcher.eventListenerDic.has(_eventType)) {
            {
                var eventListener = EventDispatcher.eventListenerDic.get(_eventType) as EventListener;
                eventListener.Excute(_eventParams);
            }
        } else {
            //console.warn("事件", _eventType, "未注册！")
        }
    }
}

/**侦听计数 */
class EventListenerCount {

    private count: number = 0;

    public addCount() {
        this.count++;
    }

    public removeCount() {
        this.count--;
        if (this.count <= 0) this.count = 0;
    }

    public getCount(): number {
        return this.count;
    }
}

/**事件侦听器 */
class EventListener {
    private OnEvent: Array<any> = [];
    public Excute(myEvent: any) {
        this.OnEvent.forEach(element => {
            if (element != null)
                element(myEvent);
        });
    }

    public Append(event: any): Boolean {
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

    public Remove(event: any) {
        var index = this.OnEvent.indexOf(event);
        if (index > -1) {
            this.OnEvent.splice(index, 1);
        }
    }
}