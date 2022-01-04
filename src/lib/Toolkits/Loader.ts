
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader";
import { FileLoader, TextureLoader, Texture } from 'three';
import * as Utility from '../Utility';

export default class Loader extends Utility.Eventemitter {
    constructor() {
        super()
        this.setLoaders()
        this.toLoad = 0
        this.loaded = 0
        this.items = {};
    }

    private loaders: any = {};
    private toLoad: number = 0;
    private loaded: number = 0;
    private items: any = {};


    Init(data: any) {
        if (data.length > 0)
            this.load(data);
        else {
            this.trigger('end')
        }
    }

    GetItem(key: string) {
        return this.items[key];
    }

    private setLoaders() {
        this.loaders = []
        // Images
        //const image = new Image()
        const textureLoader = new TextureLoader();
        this.loaders.push({
            extensions: ['jpg', 'png'],
            action: (_resource: { name: any, source: any, type: string }) => {
                // image.addEventListener('load', () => {
                //     this.fileLoadEnd(_resource, image)
                // })
                // image.addEventListener('error', () => {
                //     this.fileLoadEnd(_resource, image)
                // })
                // image.src = _resource.source
                textureLoader.load(_resource.source, (texture: Texture) => {
                    this.fileLoadEnd(_resource, texture)
                });
            }
        })

        // GLTF
        const gltfLoader = new GLTFLoader()
        this.loaders.push({
            extensions: ['glb', 'gltf'],
            action: (_resource: { name: any, source: any, type: string }) => {
                gltfLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })

        // FBX
        const fbxLoader = new FBXLoader()
        this.loaders.push({
            extensions: ['fbx'],
            action: (_resource: { name: any, source: any, type: string }) => {
                fbxLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })
        //dds
        const ddsLoader = new DDSLoader()
        this.loaders.push({
            extensions: ['dds'],
            action: (_resource: { name: any, source: any, type: string }) => {
                ddsLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })
        //Exr
        const exrLoader = new EXRLoader()
        this.loaders.push({
            extensions: ['exr'],
            action: (_resource: { name: any, source: any, type: string }) => {
                exrLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })

        //glsl
        const fileLoader = new FileLoader()
        this.loaders.push({
            extensions: ['glsl'],
            action: (_resource: { name: any, source: any, type: string }) => {
                fileLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })

    }

    private load(_resources: { name: string, source: string, type: string }[]) {
        for (const _resource of _resources) {
            this.toLoad++
            const extensionMatch = _resource.source.match(/\.([a-z]+)$/)

            if (extensionMatch && typeof extensionMatch[1] !== 'undefined') {
                const extension = extensionMatch[1]
                const loader = this.loaders.find((_loader: { extensions: any[] }) => _loader.extensions.find((_extension) => _extension === extension))

                if (loader) {
                    loader.action(_resource)
                }
                else {
                    console.warn(`Cannot found loader for ${_resource}`)
                }
            }
            else {
                console.warn(`Cannot found extension of ${_resource}`)
            }
        }
    }

    private fileLoadEnd(_resource: { source: string; name: any; type: string }, _data: any) {
        this.loaded++
        this.items[_resource.name] = _data
        let name = _resource.name;
        let data = _data;
        this.trigger('fileEnd', [{ name: _resource.name, source: _resource.source, type: _resource.type, data: _data }])
        //Trigger progress
        //console.log((this.loaded / this.toLoad).toFixed(2))
        this.trigger('progress', [(this.loaded / this.toLoad * 100).toFixed(0)] as any)

        if (this.loaded === this.toLoad) {
            this.trigger('end')
        }
    }
}
