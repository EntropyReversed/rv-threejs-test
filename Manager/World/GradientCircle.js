import * as THREE from 'three';
import Manager from '../Manager';
import GSAP from 'gsap';
import { UniformsLib } from 'three/src/renderers/shaders/UniformsLib.js';
import CustomShader from './Shader.js';

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
    this.maxScale = 7.2;
    this.circle = new THREE.Mesh();
    this.texture = new THREE.Texture(this.generateTexture());
    this.geometry = new THREE.CircleGeometry(2, 64);

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

    this.texture.needsUpdate = true;
    this.texture.encoding = THREE.sRGBEncoding;

    // const t = {
    //   texture1: { value: new THREE.CanvasTexture(this.generateTexture()) },
    // };
    // const o = { uvOffset: { value: new THREE.Vector2(0, 0) } };
    // const uniforms = THREE.UniformsUtils.merge([
    //   t,
    //   o,
    //   THREE.UniformsLib.lights,
    //   THREE.UniformsLib.fog,
    // ]);

    // this.material2 = new THREE.ShaderMaterial({
    //   uniforms: uniforms,
    //   ...CustomShader,
    //   lights: true,
    // });

    this.material = new THREE.MeshStandardMaterial({
      map: this.texture,
      shading: THREE.FlatShading,
    });

    this.material.toneMapped = false;
    this.material.roughness = 0;
    this.material.needsUpdate = true;

    this.circle.receiveShadow = true;
    this.circle.geometry = this.geometry;
    this.circle.material = this.material;

    this.circle.rotation.set(-Math.PI / 2, 0, 0);
    this.scene.add(this.circle);
  }

  onScroll(e) {
    const startPercent = 0.01;
    const waitFor = 0.2;
    const firstBreak = 0.27;
    const secondBreak = 0.3;
    const endPercent = secondBreak * 2 + 0.15;
    if (e < startPercent) {
      this.lerp.target = 0;
    } else if (e >= startPercent && e < firstBreak) {
      this.lerp.target = map(e, startPercent, firstBreak, 0, 1);
    } else if (e >= firstBreak && e < secondBreak + waitFor) {
      this.lerp.target = 1;
    } else if (e >= secondBreak + waitFor && e < endPercent) {
      this.lerp.target = 1 - map(e, secondBreak + waitFor, endPercent, 0, 0.8);
    } else if (e >= endPercent) {
      this.lerp.target = 1 - map(e, endPercent, 1, 0.8, 0.82);
    }
  }

  generateTexture() {
    const size = 1024;
    const canvas2 = document.createElement('canvas');
    canvas2.width = size;
    canvas2.height = size;
    const context = canvas2.getContext('2d');
    context.rect(0, 0, size, size);
    const gradient = context.createLinearGradient(size / 2, 0, size / 2, size);
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
