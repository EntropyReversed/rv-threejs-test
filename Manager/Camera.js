import Manager from './Manager';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

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
    this.perspectiveCamera.position.z = 12;
    this.perspectiveCamera.lookAt(0, 0, 0);
    this.perspectiveCamera.rotation.order = 'YXZ';
    this.scene.add(this.perspectiveCamera);
    // this.helper = new THREE.CameraHelper(this.perspectiveCamera);
    // this.scene.add(this.helper);

    const lookAtVector = new THREE.Vector3(0, 0, 0);
    const rotAtVector = new THREE.Vector3(0, 0, 0);
    const target = new THREE.Vector3(0, 0, 0);
    console.log(target);
    // target.copy( lookAtVector ).add( rotAtVector );
    // object.lookAt( target );

    const gui = new GUI();
    const folder = gui.addFolder('Camera');

    folder
      .add(this.perspectiveCamera.position, 'x', -30, 30, 0.01)
      .onChange((val) => {
        this.perspectiveCamera.lookAt(0, 0, 0);
      });
    folder
      .add(this.perspectiveCamera.position, 'y', -30, 30, 0.01)
      .onChange((val) => {
        this.perspectiveCamera.lookAt(0, 0, 0);
      });
    folder
      .add(this.perspectiveCamera.position, 'z', -30, 30, 0.01)
      .onChange((val) => {
        this.perspectiveCamera.lookAt(0, 0, 0);
      });
    folder.open();

    this.setPath()
  }

  setPath() {
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 12),
      new THREE.Vector3(0, 0, 9),
      new THREE.Vector3(0, 0, 6),
      new THREE.Vector3(3, 0, 4),
      new THREE.Vector3(1, 0, 2),
    ]);

    const points = this.curve.getPoints(10);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    console.log(geometry)

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);

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

    const size = 20;
    const divisions = 20;

    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.y = -0.005;
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(3);
    axesHelper.position.y = -0.01;
    this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
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
