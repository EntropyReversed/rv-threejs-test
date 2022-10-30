import Manager from './Manager';
import * as THREE from 'three';

export default class Camera {
  constructor() {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scene = this.manager.scene;
    this.canvas = this.manager.canvas;

    this.createPerspectiveCamera();
    this.createPerspectiveCameraMain();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
  }

  createPerspectiveCameraMain() {
    this.perspectiveCameraMain = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCameraMain);
    this.perspectiveCameraMain.position.z = 5;
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.perspectiveCameraMain.aspect = this.sizes.aspect;
    this.perspectiveCameraMain.updateProjectionMatrix();
  }

  update() {}
}
