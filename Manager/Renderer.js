import Manager from './Manager';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const params = {
  exposure: 1,
  bloomStrength: 5,
  bloomThreshold: 0,
  bloomRadius: 0,
};

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

    this.renderScene = new RenderPass(
      this.scene,
      this.camera.perspectiveCamera
    );

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    this.composer = new EffectComposer(this.renderer);
    this.composer.renderToScreen = true;
    this.composer.addPass(this.renderScene);
    this.composer.addPass(bloomPass);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    // this.renderer.clear();

    // this.camera.perspectiveCamera.layers.set(1);
    // this.composer.render();

    // this.renderer.clearDepth();
    // this.camera.perspectiveCamera.layers.set(0);
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
