import * as THREE from 'three';
import * as Utility from '../Utility';

export default class Size extends Utility.Eventemitter {

    public width: number = 0;
    public height: number = 0;
    public aspect: number = 1;
    public viewportwidth: number = 0;
    public viewportheight: number = 0;

    constructor(canvas: HTMLElement, renderer: THREE.Renderer) {
        super();

        this.renderer = renderer;
        this.canvas = canvas;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        window.addEventListener("resize", this.resize.bind(this));
    }

    private canvas: HTMLElement
    private renderer: THREE.Renderer;

    private resize() {
        // this.width = this.canvas.offsetWidth;
        // this.height = this.canvas.offsetHeight;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.trigger('resize');
    }

    Init(): void {
        this.resize();
    }

    Destroy(): void {
        window.removeEventListener("resize", this.resize.bind(this));
    }
}