import * as THREE from 'three';
import Manager from '../Manager';
import CircleTextures from './CircleTextures';
import Shader2 from './Shader2';
import Shader from './Shader';
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
    this.resources = this.manager.resources;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.scale = 1;
    this.maxScale = 7.2;
    this.circle = new THREE.Mesh();
    this.textures = new CircleTextures(this);
    this.texture = this.textures.setTexture(0);
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

    this.lastIndex = 0;

    // this.material = new THREE.MeshStandardMaterial({
    //   map: this.texture,
    //   shading: THREE.FlatShading,
    // });

    // this.material.toneMapped = false;
    // this.material.roughness = 0;
    // this.material.needsUpdate = true;

    const uniforms = THREE.UniformsUtils.merge([
      { texture1: { value: null } },
      { uvOffset: { value: new THREE.Vector2(0, 0) } },

      THREE.UniformsLib.lights,
    ]);

    this.material2 = new THREE.ShaderMaterial({
      uniforms: uniforms,
      ...Shader,
      lights: true,
      // wireframe: true
    });

    // THREE.UniformsUtils.merge() calls THREE.clone() on each uniform. 
    // Texture needs to be assigned here so it's not cloned
    this.material2.uniforms.texture1.value = this.texture;

    this.circle.receiveShadow = true;
    this.circle.geometry = this.geometry;
    this.circle.material = this.material2;

    // this.circle.material = new THREE.MeshPhysicalMaterial({
    //   metalness: 1,
    //   roughness: 0,
    //   envMapIntensity: 0.9,
    //   clearcoat: 0.5,
    //   transparent: true,
    //   transmission: 0,
    //   opacity: 1,
    //   reflectivity: 1,
    // })

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
