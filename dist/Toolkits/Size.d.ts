import * as THREE from 'three';
import * as Utility from '../Utility';
export default class Size extends Utility.Eventemitter {
    width: number;
    height: number;
    aspect: number;
    viewportwidth: number;
    viewportheight: number;
    constructor(canvas: HTMLElement, renderer: THREE.Renderer);
    private canvas;
    private renderer;
    private resize;
    Init(): void;
    Destroy(): void;
}
