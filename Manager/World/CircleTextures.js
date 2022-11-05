import * as THREE from 'three';
import Manager from '../Manager';
import GSAP from 'gsap';

const map = (n, start1, end1, start2, end2) => {
  const val = ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  if (val < start2) return start2;
  if (val > end2) return end2;
  return val;
};

export default class CircleTextures {
  constructor(circle) {
    this.circle = circle
    this.manager = new Manager();
    this.resources = this.manager.resources;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.textures = [];

    for (const [key, value] of Object.entries(this.resources.items)) {
      if (value.isTexture) {
        value.encoding = THREE.sRGBEncoding;
        this.textures.push(value);
      }
    }

    this.tlerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.scrollTrigger.on('scroll', (e) => {
      this.onTextureScroll(e);
    });

    this.time.on('update', () => {
      this.update();
    });

    this.lastIndex = 0;
  }

  setTexture(index) {
    const texture = this.textures[index];
    texture.needsUpdate = true;
    return texture;
  }

  onTextureScroll(e) {
    if (e >= 0.75) {
      this.tlerp.target = 1;
    } else {
      this.tlerp.target = 0;
    }
  }

  update() {
    this.tlerp.current = GSAP.utils.interpolate(
      this.tlerp.current,
      this.tlerp.target,
      this.tlerp.ease
    );

    const index = Math.floor(map(this.tlerp.current, 0, 1, 0, 8));
    if (index != this.lastIndex) {
      this.circle.material.map = this.textures[index];
      this.circle.material.needsUpdate = true;
      this.lastIndex = index;
    }
  }
}
