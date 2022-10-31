import * as THREE from 'three';
import Manager from '../Manager';
import Model from './Model';
import Enviroment from './Enviroment';
import Controls from './Controls';

export default class World {
  constructor() {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scene = this.manager.scene;
    this.canvas = this.manager.canvas;
    this.camera = this.manager.camera;
    this.resources = this.manager.resources;

    this.resources.on('ready', () => {
      this.enviroment = new Enviroment();
      this.model = new Model();
      this.controls = new Controls();
    });
  }

  resize() {}

  update() {
    if (this.model) {
      this.model.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
