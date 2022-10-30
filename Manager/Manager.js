import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import Renderer from './Renderer';
import Time from './Utils/Time';
import World from './World/World';

export default class Manager {
  static instance;

  constructor(canvas) {
    if (Manager.instance) {
      return Manager.instance;
    }
    Manager.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.world = new World();

    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('update', () => {
      this.update();
    });
  }

  resize() {
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}
