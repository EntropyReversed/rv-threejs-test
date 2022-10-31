import * as THREE from 'three';
import Manager from '../Manager';
import GSAP from 'gsap';

export default class Controls {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;
    this.time = this.manager.time;
    this.camera = this.manager.camera;

    this.dummyCurve = new THREE.Vector3(0, 0, 0);
    this.progress = 0;
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.position = new THREE.Vector3(0, 0, 0);

    this.setPath();
    this.onWheel();
  }

  setPath() {
    //Create a closed wavey loop
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, 10),
      new THREE.Vector3(-5, 5, 5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, -5, 5),
      new THREE.Vector3(10, 0, 10),
    ]);

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
  }

  onWheel() {
    window.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        this.lerp.target += 0.05;
      } else {
        this.lerp.target -= 0.05;
      }
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
    this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
    this.curve.getPointAt(this.lerp.current, this.position);
    this.camera.perspectiveCamera.position.copy(this.position);
    this.camera.perspectiveCamera.lookAt(0, 0, 0);
  }
}
