import * as THREE from 'three';
import Manager from '../Manager';

export default class Controls {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;
    this.time = this.manager.time;
    this.camera = this.manager.camera;

    this.setPath();
  }

  setPath() {
    //Create a closed wavey loop
    this.curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-10, 0, 10),
        new THREE.Vector3(-5, 5, 5),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, -5, 5),
        new THREE.Vector3(10, 0, 10),
      ],
      true
    );

    this.dummyCurve = new THREE.Vector3(0, 0, 0);
    this.curve.getPointAt(1, this.dummyCurve);
    this.camera.perspectiveCamera.position.copy(this.dummyCurve);

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
  }

  resize() {}

  update() {}
}
