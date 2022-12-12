import Manager from './Manager';
import * as THREE from 'three';

export default class Renderer {
  constructor() {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scene = this.manager.scene;
    this.canvas = this.manager.canvas;
    this.camera = this.manager.camera;

    this.scissorMult = 2;

    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    this.renderer.powerPreference = 'high-performance';
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    // this.renderer.toneMapping = THREE.ACESfilmicToneMapping;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 2;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(new THREE.Color('rgb(13,13,13)'));
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);

    console.log('renderer info', this.renderer.info);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);

    // second screen
    // this.renderer.setScissorTest(true);
    // this.renderer.setViewport(
    //   this.sizes.width - this.sizes.width / this.scissorMult,
    //   this.sizes.height - this.sizes.height / this.scissorMult,
    //   this.sizes.width / this.scissorMult,
    //   this.sizes.height / this.scissorMult
    // );
    // this.renderer.setScissor(
    //   this.sizes.width - this.sizes.width / this.scissorMult,
    //   this.sizes.height - this.sizes.height / this.scissorMult,
    //   this.sizes.width / this.scissorMult,
    //   this.sizes.height / this.scissorMult
    // );
    // this.renderer.render(this.scene, this.camera.perspectiveCameraMain);
    // this.renderer.setScissorTest(false);
  }
}
