import * as THREE from 'three';
import Manager from '../Manager';
import GSAP from 'gsap';

const map = (n, start1, end1, start2, end2) => {
  const val = ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  if (val < start2) return start2;
  if (val > end2) return end2;
  return val;
};

export default class Controls {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;
    this.time = this.manager.time;
    this.camera = this.manager.camera;
    this.scrollTrigger = this.manager.scrollTrigger;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.position = new THREE.Vector3(0, 0, 0);

    this.scrollTrigger.on('scroll', (e) => {
      this.onScroll(e);
    });

    this.setPath();
  }

  onScroll(e) {
    //TODO: move this logic to camera.js
    if (e > 0.3) {
      this.lerp.target = map(e, 0.3, 1, 0, 1);
    } else {
      this.lerp.target = 0;
    }
  }

  setPath() {
    //Create a closed wavey loop
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 20, 0),
      new THREE.Vector3(10, 10, 8),
      new THREE.Vector3(10, 6, 8),
    ]);

    const points = this.curve.getPoints(30);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.curve.getPointAt(this.lerp.current, this.position);
    this.camera.perspectiveCamera.position.copy(this.position);
    this.camera.perspectiveCamera.lookAt(0, 0, 0);
    this.camera.perspectiveCamera.rotation.z = 0;
  }
}
