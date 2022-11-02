import * as THREE from 'three';
import Manager from '../Manager';
import GSAP from 'gsap';

const map = (n, start1, end1, start2, end2) => {
  const val = ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  if (val < start2) return start2;
  if (val > end2) return end2;
  return val;
};

export default class GradientCircle {
  constructor() {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scene = this.manager.scene;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.scale = 1;
    this.maxScale = 7;
    this.circle = new THREE.Mesh();

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

    const texture = new THREE.Texture(this.generateTexture());
    texture.needsUpdate = true;
    texture.encoding = THREE.sRGBEncoding;

    const geometry = new THREE.CircleGeometry(2, 64);
    this.circle.geometry = geometry;

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      shading: THREE.FlatShading,
    });
    material.toneMapped = false;
    this.circle.receiveShadow = true;
    this.circle.material = material;

    this.circle.rotation.set(-Math.PI / 2, 0, 0);
    this.scene.add(this.circle);
  }

  onScroll(e) {
    const startPercent = 0.01;
    const waitFor = 0.2
    const firstBreak = 0.27;
    const secondBreak = 0.3;
    const endPercent = secondBreak * 2 + 0.15;
    if (e < startPercent) {
      this.lerp.target = 0;
    } else if (e >= startPercent && e < firstBreak) {
      this.lerp.target = map(e, startPercent, firstBreak, 0, 1);
    } else if (e >= firstBreak && e < secondBreak + waitFor) {
      this.lerp.target = 1;
    } else if (e >= secondBreak + waitFor) {
      this.lerp.target = 1 - map(e, secondBreak + waitFor, endPercent, 0, 0.8);
    }
  }

  generateTexture() {
    var size = 256;
    let canvas2 = document.createElement('canvas');
    canvas2.width = size;
    canvas2.height = size;
    var context = canvas2.getContext('2d');
    context.rect(0, 0, size, size);
    var gradient = context.createLinearGradient(size / 2, 0, size / 2, size);
    gradient.addColorStop(0, '#a59bf4');
    gradient.addColorStop(1, '#f2a0ac');

    context.fillStyle = gradient;
    context.fill();

    document.body.appendChild(canvas2);
    return canvas2;
  }

  setCircle(scale) {
    this.circle.scale.set(scale, scale, scale);
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
