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

export default class GradientCircle {
  constructor(circle) {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.scale = 1;
    this.maxScale = 7;
    this.circle = circle;

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

    var texture = new THREE.Texture(this.generateTexture());
    texture.needsUpdate = true;

    // material
    var material = new THREE.MeshLambertMaterial({ map: texture });
    this.circle.receiveShadow = true;
    console.log(this.circle);

    this.circle.material = material;

    // this.setCircle(this.scale);
  }

  onScroll(e) {
    const startPercent = 0;
    const endPercent = 0.2;
    if (e > startPercent && e < endPercent) {
      this.lerp.target = map(e, startPercent, endPercent, 0, 1);
    } else if (e > endPercent && e < endPercent + 0.19) {
      this.lerp.target = 1;
    } else if (e > endPercent + 0.19) {
      this.lerp.target =
        1 - map(e, endPercent + 0.19, endPercent * 2 + 0.2, 0, 0.7);
    } else {
      this.lerp.target = 0;
    }
  }

  generateTexture() {
    var size = 256;

    // create canvas
    let canvas2 = document.createElement('canvas');
    canvas2.width = size;
    canvas2.height = size;

    // get context
    var context = canvas2.getContext('2d');

    // draw gradient
    context.rect(0, 0, size, size);
    var gradient = context.createLinearGradient(
      0,
      0,
      Math.cos(180) * size,
      Math.sin(180) * size
    );
    gradient.addColorStop(0, '#a59bf4');
    gradient.addColorStop(1, '#f2a0ac');

    context.fillStyle = gradient;
    context.fill();

    return canvas2;
  }

  setCircle(scale) {
    this.circle.scale.set(scale, 1, scale);
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.setCircle(this.lerp.current * this.maxScale);
  }
}
