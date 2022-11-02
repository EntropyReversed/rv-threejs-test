import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import Renderer from './Renderer';
import Time from './Utils/Time';
import Resources from './Utils/Resources';
import World from './World/World';
import assets from './Utils/assets';
import TriggerScroll from '../Manager/Utils/TriggerScroll';

export default class Manager {
  static instance;

  constructor(parent) {
    if (Manager.instance) {
      return Manager.instance;
    }
    Manager.instance = this;
    this.parent = parent;
    this.canvas = this.parent.querySelector("canvas");
    this.scene = new THREE.Scene();
    this.scrollTrigger = new TriggerScroll();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.world = new World();


    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('update', () => {
      this.update();
    });
  }

  setParent(parent) {
    this.parent = parent;
  }

  resize() {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
