import * as THREE from 'three';
import Manager from '../Manager';

export default class Model {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
  }

  resize() {}

  update() {}
}
