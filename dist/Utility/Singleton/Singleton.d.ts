/**单例类
 */
export default class Singleton {
    static Ins<T extends {}>(this: new () => T): T;
}
