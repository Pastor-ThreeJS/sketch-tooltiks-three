import * as THREE from 'three';
/**设置加载模型居中 */
export declare var SetModelPosition: (object: THREE.Mesh) => void;
/**世界坐标系转屏幕坐标系 */
export declare var WordPosToScreen: (object: THREE.Object3D, camera: THREE.Camera) => {
    x: number;
    y: number;
};
/**获取当前时间 */
export declare var GetCurrentTime: () => string;
/**判断当前对象在矩形范围内 */
export declare var InRect: (pos: {
    x: number;
    y: number;
}, rect: {
    left: number;
    top: number;
    width: number;
    height: number;
}) => Boolean;
