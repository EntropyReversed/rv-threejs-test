import * as THREE from 'three';
import Manager from '../Manager';
import Model from './Model';

export default class World {
  constructor() {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scene = this.manager.scene;
    this.canvas = this.manager.canvas;
    this.camera = this.manager.camera;
    this.resources = this.manager.resources;

    this.resources.on('ready', () => {
      this.model = new Model();
    });
  }

  resize() {}

  update() {}
}
