"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 查看信息小控件
const stats_js_1 = __importDefault(require("stats-js"));
class StatsWindow {
    constructor() {
        if (StatsWindow._instance) {
            return StatsWindow._instance;
        }
        else {
            let stats;
            stats = new stats_js_1.default();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.right = '0px';
            stats.domElement.style.left = "auto";
            stats.domElement.style.top = '0px';
            stats.domElement.style.zIndex = '1000';
            var root = document.getElementById("Stats-output");
            if (root != null) {
                StatsWindow._instance = this;
                this.stats = stats;
                document.getElementById("Stats-output").appendChild(stats.domElement);
            }
        }
        return this;
    }
}
exports.default = StatsWindow;
