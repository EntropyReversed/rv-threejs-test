import Manager from './Manager';
import * as THREE from 'three';

export default class Renderer {
  constructor() {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scene = this.manager.scene;
    this.canvas = this.manager.canvas;
    this.camera = this.manager.camera;

    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCameraMain);
  }
}
