import Manager from '../Manager';
import GSAP from 'gsap';
import * as THREE from 'three';

export default class Letters {
  constructor(child) {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.sizes = this.manager.sizes;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.offsetY = 0.14;
    this.letters = child;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.05,
    };

    this.scrollTrigger.on('scroll', (e) => {
      this.onScroll(e);
    });

    this.time.on('update', () => {
      this.update();
    });

    this.mat = new THREE.MeshPhysicalMaterial({
      metalness: 0,
      roughness: 0.05,
      transparent: true,
      transmission: 0,
      opacity: 1,
    });

    this.letters.receiveShadow = true;
    // this.circleCut.geometry = this.geometryMetal;
    this.letters.material = this.mat;
    this.letters.position.y = -this.offsetY;
  }

  onScroll(e) {
    if (e > 0.9) {
      this.lerp.target = 1;
    } else {
      this.lerp.target = 0;
    }
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    // this.letters.position.y = this.lerp.current * 0.2 - this.offsetY;
    this.mat.metalness = this.lerp.current * 0.99;
  }
}
