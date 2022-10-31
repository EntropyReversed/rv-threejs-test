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

      if (child.name === 'circleGrad') {
        console.log(child);
        const scale = 0;
        child.scale.set(scale, scale, scale);
      }
    });

    this.scene.add(this.actualModel);
  }

  resize() {}

  update() {}
}
