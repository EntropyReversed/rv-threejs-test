import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import Renderer from './Renderer';
import Time from './Utils/Time';
import Resources from './Utils/Resources';
import World from './World/World';
import assets from './Utils/assets';
import TriggerScroll from '../Manager/Utils/TriggerScroll';
import GSAP from 'gsap';
import Stats from 'three/addons/libs/stats.module.js';

export default class Manager {
  static instance;

  constructor(parent) {
    if (Manager.instance) {
      return Manager.instance;
    }
    Manager.instance = this;
    this.parent = parent;
    this.canvas = this.parent.querySelector('canvas');
    this.scene = new THREE.Scene();
    this.SvgScene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.masterTimeline = GSAP.timeline();
    this.world = new World();


    


    this.stats = new Stats();
    document.body.appendChild( this.stats.dom );

    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('update', () => {
      this.update();
    });
  }


  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
    this.stats.update();
  }
}
