import * as THREE from 'three';

/**设置加载模型居中 */
export var SetModelPosition = (object: THREE.Mesh) => {
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
}

/**世界坐标系转屏幕坐标系 */
export var WordPosToScreen = (object: THREE.Object3D, camera: THREE.Camera) => {
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
}

/**获取当前时间 */
export var GetCurrentTime = (): string => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

/**判断当前对象在矩形范围内 */
export var InRect = (pos: { x: number, y: number }, rect: { left: number, top: number, width: number, height: number }): Boolean => {

    if (pos.x < rect.left)
        return false;
    if (pos.x > (rect.left + rect.width))
        return false;
    if (pos.y < rect.top)
        return false;
    if (pos.y > (rect.top + rect.height))
        return false;
    return true;
}