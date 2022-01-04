"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InRect = exports.GetCurrentTime = exports.WordPosToScreen = exports.SetModelPosition = void 0;
const THREE = __importStar(require("three"));
/**设置加载模型居中 */
exports.SetModelPosition = (object) => {
    object.updateMatrixWorld();
    // 获得包围盒得min和max
    let box = new THREE.Box3().setFromObject(object);
    // 返回包围盒的宽度，高度，和深度
    let size = box.getSize(new THREE.Vector3());
    // 返回包围盒的中心点
    let center = box.getCenter(new THREE.Vector3());
    object.position.x += object.position.x - center.x;
    object.position.y += object.position.y - center.y;
    object.position.z += object.position.z - center.z;
};
/**世界坐标系转屏幕坐标系 */
exports.WordPosToScreen = (object, camera) => {
    var vector = new THREE.Vector3();
    var widthHalf = 0.5 * window.innerWidth;
    var heightHalf = 0.5 * window.innerHeight;
    /*这段代码是重要的在获取前先更新下对象的世界坐标/世界矩阵*/
    object.updateMatrixWorld();
    vector.setFromMatrixPosition(object.matrixWorld);
    vector.project(camera);
    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;
    return {
        x: vector.x,
        y: vector.y
    };
};
/**获取当前时间 */
exports.GetCurrentTime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
};
/**判断当前对象在矩形范围内 */
exports.InRect = (pos, rect) => {
    if (pos.x < rect.left)
        return false;
    if (pos.x > (rect.left + rect.width))
        return false;
    if (pos.y < rect.top)
        return false;
    if (pos.y > (rect.top + rect.height))
        return false;
    return true;
};
