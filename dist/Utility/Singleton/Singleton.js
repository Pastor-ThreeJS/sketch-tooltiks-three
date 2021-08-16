"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**单例类
 */
class Singleton {
    static Ins() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}
exports.default = Singleton;
