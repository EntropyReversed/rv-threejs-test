import * as THREE from 'three';
import Manager from '../Manager';
import Model from './Model';
import Enviroment from './Enviroment';
import Controls from './Controls';
import GSAP from 'gsap';

const map = (n, start1, end1, start2, end2) => {
  const val = ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  if (val < start2) return start2;
  if (val > end2) return end2;
  return val;
};

export default class Letters {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.sizes = this.manager.sizes;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.group = new THREE.Group();

    this.scene.add(this.group)

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.scrollTrigger.on('scroll', (e) => {
      this.onScroll(e);
    });

    this.time.on('update', () => {
      this.update();
    });
  }

  add(child) {
    this.group.add(child);
  }

  onScroll(e) {
    const startPercent = 0.6;
    const endPercent = 1;
    if (e > startPercent && e < endPercent) {
      this.lerp.target = map(e, startPercent, endPercent, 0, 1);
    } else if (e > endPercent) {
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

    // console.log(this.letters.position);
  }
}