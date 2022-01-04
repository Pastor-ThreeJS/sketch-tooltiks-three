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
const GLTFLoader_js_1 = require("three/examples/jsm/loaders/GLTFLoader.js");
const FBXLoader_js_1 = require("three/examples/jsm/loaders/FBXLoader.js");
const LUTCubeLoader_js_1 = require("three/examples/jsm/loaders/LUTCubeLoader.js");
const EXRLoader_1 = require("three/examples/jsm/loaders/EXRLoader");
const DDSLoader_1 = require("three/examples/jsm/loaders/DDSLoader");
const three_1 = require("three");
const Utility = __importStar(require("../Utility"));
class Loader extends Utility.Eventemitter {
    constructor() {
        super();
        this.loaders = {};
        this.toLoad = 0;
        this.loaded = 0;
        this.items = {};
        this.setLoaders();
        this.toLoad = 0;
        this.loaded = 0;
        this.items = {};
    }
    Init(data) {
        if (data.length > 0)
            this.load(data);
        else {
            this.trigger('end');
        }
    }
    GetItem(key) {
        return this.items[key];
    }
    setLoaders() {
        this.loaders = [];
        // Images
        //const image = new Image()
        const textureLoader = new three_1.TextureLoader();
        this.loaders.push({
            extensions: ['jpg', 'png'],
            action: (_resource) => {
                // image.addEventListener('load', () => {
                //     this.fileLoadEnd(_resource, image)
                // })
                // image.addEventListener('error', () => {
                //     this.fileLoadEnd(_resource, image)
                // })
                // image.src = _resource.source
                textureLoader.load(_resource.source, (texture) => {
                    this.fileLoadEnd(_resource, texture);
                });
            }
        });
        // GLTF
        const gltfLoader = new GLTFLoader_js_1.GLTFLoader();
        this.loaders.push({
            extensions: ['glb', 'gltf'],
            action: (_resource) => {
                gltfLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            }
        });
        // FBX
        const fbxLoader = new FBXLoader_js_1.FBXLoader();
        this.loaders.push({
            extensions: ['fbx'],
            action: (_resource) => {
                fbxLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            }
        });
        //dds
        const ddsLoader = new DDSLoader_1.DDSLoader();
        this.loaders.push({
            extensions: ['dds'],
            action: (_resource) => {
                ddsLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            }
        });
        //Exr
        const exrLoader = new EXRLoader_1.EXRLoader();
        this.loaders.push({
            extensions: ['exr'],
            action: (_resource) => {
                exrLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            }
        });
        //glsl
        const fileLoader = new three_1.FileLoader();
        this.loaders.push({
            extensions: ['glsl'],
            action: (_resource) => {
                fileLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            }
        });
        //lutcube
        const lUTCubeLoader = new LUTCubeLoader_js_1.LUTCubeLoader();
        this.loaders.push({
            extensions: ['cube'],
            action: (_resource) => {
                lUTCubeLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data);
                });
            }
        });
    }
    load(_resources) {
        for (const _resource of _resources) {
            this.toLoad++;
            const extensionMatch = _resource.source.match(/\.([a-z]+)$/);
            if (extensionMatch && typeof extensionMatch[1] !== 'undefined') {
                const extension = extensionMatch[1];
                const loader = this.loaders.find((_loader) => _loader.extensions.find((_extension) => _extension === extension));
                if (loader) {
                    loader.action(_resource);
                }
                else {
                    console.warn(`Cannot found loader for ${_resource}`);
                }
            }
            else {
                console.warn(`Cannot found extension of ${_resource}`);
            }
        }
    }
    fileLoadEnd(_resource, _data) {
        this.loaded++;
        this.items[_resource.name] = _data;
        let name = _resource.name;
        let data = _data;
        this.trigger('fileEnd', [{ name: _resource.name, source: _resource.source, type: _resource.type, data: _data }]);
        //Trigger progress
        //console.log((this.loaded / this.toLoad).toFixed(2))
        this.trigger('progress', [(this.loaded / this.toLoad * 100).toFixed(0)]);
        if (this.loaded === this.toLoad) {
            this.trigger('end');
        }
    }
}
exports.default = Loader;
