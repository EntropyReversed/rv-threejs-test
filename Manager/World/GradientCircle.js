import * as THREE from 'three';
import Manager from '../Manager';
import Shader from './Shader';
import gsap from 'gsap';

export default class GradientCircle {
  constructor() {
    this.manager = new Manager();
    this.camera = this.manager.camera.perspectiveCamera;
    this.scene = this.manager.scene;
    this.modelGroup = this.scene.children.filter(
      (child) => child.name === 'Model'
    )[0];
    this.masterTimeline = this.manager.masterTimeline;
    this.timeline = gsap.timeline();

    this.setCircleGrad();
    this.setUpTimeline();
  }

  setCircleGrad() {
    this.circle = new THREE.Mesh();

    this.texture = new THREE.CanvasTexture(this.generateTexture());
    this.geometry = new THREE.PlaneGeometry(4.3, 4.3);

    this.uniforms = THREE.UniformsUtils.merge([
      { u_texture: { value: null } },
      { progress: { value: 0 } },
      { warp: { value: 0 } },

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

    this.circle.position.z = -0.001;

    this.modelGroup.add(this.circle);
  }

  setUpTimeline() {
    this.timeline
      .fromTo(this.circle.scale, { x: 0, y: 0 }, { x: 1, y: 1, duration: 0.8 })
      .to(this.modelGroup.rotation, { x: -1, z: -0.5, duration: 1 })
      .to(this.circle.scale, { x: 0.5, y: 0.5 }, '<')
      .to(this.modelGroup.position, { z: 4, duration: 0.8 }, '<');

      this.linesGroup = this.scene.children.filter(
        (child) => child.name === 'Lines'
      );
      console.log(this.linesGroup)
  }

  generateTexture() {
    const size = 1024;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    ctx.rect(0, 0, size, size);
    const gradient = ctx.createLinearGradient(size / 2, 0, size / 2, size);
    gradient.addColorStop(0, '#a59bf4');
    gradient.addColorStop(1, '#f2a0ac');
    ctx.fillStyle = gradient;
    ctx.fill();

    // document.body.appendChild(canvas);
    return canvas;
  }
}
