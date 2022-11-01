import * as THREE from 'three';
import Manager from '../Manager';

export default class Enviroment {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;

    this.setSunlight();
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 2.5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 50;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.01;
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);
    this.sunLight.position.set(-20, 20, -20);
    this.scene.add(this.sunLight);

    this.ambientlight = new THREE.AmbientLight('#ffffff', 1);
    this.scene.add(this.ambientlight);
  }

  resize() {}

  update() {}
}
