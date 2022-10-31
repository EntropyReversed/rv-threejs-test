import * as THREE from 'three';
import Manager from '../Manager';

export default class Model {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;
    this.model = this.resources.items.model;
    this.actualModel = this.model.scene;

    this.setModel();
  }

  setModel() {
    this.actualModel.children.forEach((child) => {
      child.castShadow = true;
      child.recieveShadow = true;
    });

    this.scene.add(this.actualModel);
    console.log(this.actualModel);
  }

  resize() {}

  update() {}
}
