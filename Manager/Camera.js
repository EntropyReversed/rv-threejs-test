import Manager from './Manager';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Camera {
  constructor() {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scene = this.manager.scene;
    this.canvas = this.manager.canvas;

    this.createPerspectiveCamera();
    this.createPerspectiveCameraMain();

    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.5,
      200
    );

    this.scene.add(this.perspectiveCamera);
    this.helper = new THREE.CameraHelper(this.perspectiveCamera);
    this.scene.add(this.helper);
  }

  createPerspectiveCameraMain() {
    this.perspectiveCameraMain = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      200
    );
    this.scene.add(this.perspectiveCameraMain);
    this.perspectiveCameraMain.position.x = 0;
    this.perspectiveCameraMain.position.y = 55;
    this.perspectiveCameraMain.position.z = 60;

    // const size = 20;
    // const divisions = 20;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // gridHelper.position.y = -0.005;
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(3);
    // axesHelper.position.y = -0.01;
    // this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCameraMain, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.perspectiveCameraMain.aspect = this.sizes.aspect;
    this.perspectiveCameraMain.updateProjectionMatrix();
  }

  update() {
    this.controls.update();

    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.perspectiveCameraMain.position);
  }
}
