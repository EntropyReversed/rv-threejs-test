import * as THREE from 'three';
import Manager from '../Manager';
import CircleTextures from './CircleTextures';
import Shader from './Shader';
import gsap from 'gsap';

export default class GradientCircle {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.masterTimeline = this.manager.masterTimeline;

    this.timeline = gsap.timeline();
    this.setCircleGrad();
  }

  setCircleGrad() {
    this.circle = new THREE.Mesh();

    this.textures = new CircleTextures(this);
    this.texture = this.textures.setTexture(0);
    this.geometry = new THREE.PlaneGeometry(4.3, 4.3);

    this.uniforms = THREE.UniformsUtils.merge([
      { u_texture: { value: null } },
      { progress: { value: 1 } },

      THREE.UniformsLib.lights,
    ]);

    this.materialGrad = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      ...Shader,
      lights: true,
      transparent: true,
    });
    this.materialGrad.depthWrite = false;

    // THREE.UniformsUtils.merge() calls THREE.clone() on each uniform.
    // Texture needs to be assigned here so it's not cloned
    this.materialGrad.uniforms.u_texture.value = this.texture;

    this.circle.castShadow = false;
    this.circle.receiveShadow = true;
    this.circle.geometry = this.geometry;
    this.circle.material = this.materialGrad;
    this.circle.depthWrite = true;

    // this.circle.position.y = 0.001;
    this.scene.add(this.circle);
  }
}
