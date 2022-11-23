import * as THREE from 'three';
import Manager from '../Manager';
import gsap from 'gsap';
import { GUI } from 'dat.gui';

export default class Enviroment {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.05,
    };

    this.setSunlight();
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 1.25);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(8192, 8192);
    this.sunLight.shadow.normalBias = 0.05;
    const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    this.scene.add(helper);
    this.sunLight.position.set(-1, 8, -2);
    this.scene.add(this.sunLight);

    this.ambientlight = new THREE.AmbientLight('#ffffff', 2.5);
    this.scene.add(this.ambientlight);


    const gui = new GUI();
    const lightFolder = gui.addFolder('Light');

    lightFolder.add(this.sunLight.position, 'x', -10, 10);
    lightFolder.add(this.sunLight.position, 'y', -10, 10);
    lightFolder.add(this.sunLight.position, 'z', -10, 10);
    lightFolder.open();

  }
}
