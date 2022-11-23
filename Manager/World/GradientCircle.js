import * as THREE from 'three';
import Manager from '../Manager';
import Shader from './Shader';
import gsap from 'gsap';

export default class GradientCircle {
  constructor(lines, model) {
    this.lines = lines;
    this.manager = new Manager();
    this.camera = this.manager.camera.perspectiveCamera;
    this.scene = this.manager.scene;
    this.model = model;
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
      { progress: { value: -0.1 } },

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
    // this.circle.depthWrite = true;
    // this.circle.depthTest = true;
    this.circle.position.z = 0.0001;
    // this.circle.renderOrder = 1;

    this.model.circle.updateMorphTargets();
    this.model.letters.updateMorphTargets();
    this.model.lettersTop.updateMorphTargets();
    this.model.group.add(this.circle);
  }

  setUpTimeline() {
    this.timeline
      .fromTo(
        this.circle.scale,
        { x: 0, y: 0 },
        { x: 1.5, y: 1.5, duration: 0.8 }
      )
      .set(this.lines.circleMain.circle.material, { opacity: 0 })
      .to(this.model.group.rotation, { x: -1, z: -0.5, duration: 1 })
      .to(this.model.group.position, { z: 4, duration: 0.8 }, '<')
      .to(this.circle.scale, { x: 0.463, y: 0.463 }, '<+0.3')
      // .to(this.circle.scale, { x: 0.462, y: 0.462 }, '<+0.3')
      .set(this.model.circle.material, { metalness: 0.98 })
      .set(this.model.letters.material, { metalness: 0.98 })
      .set(this.model.circle.material, { opacity: 1 })
      .set(this.model.letters.material, { opacity: 1 })
      .to(
        this.model.lettersTop.material,
        { metalness: 0.98, duration: 0.1 },
        '<'
      )
      .set(this.model.circle.material, { depthWrite: true })
      .set(this.model.letters.material, { depthWrite: true })
      .set(this.model.lettersTop.material, { depthWrite: true })
      .to(
        this.circle.material.uniforms.progress,
        {
          value: 1.1,
          duration: 0.3,
          ease: 'power3.out',
        },
        '<'
      )
      .to(
        this.model.circle.morphTargetInfluences,
        {
          ...[0, 1],
          duration: 0.05,
          onUpdate: () => {
            this.model.circle.material.needUpdate = true;
          },
        },
        '<+=0.1'
      )
      .to(
        this.model.letters.morphTargetInfluences,
        {
          ...[0, 1],
          duration: 0.05,
          onUpdate: () => {
            this.model.letters.material.needUpdate = true;
          },
        },
        '<'
      )
      .to(
        this.model.lettersTop.morphTargetInfluences,
        {
          ...[0, 1],
          duration: 0.05,
          onUpdate: () => {
            this.model.lettersTop.material.needUpdate = true;
          },
        },
        '<'
      )
      .to(
        this.model.circle.morphTargetInfluences,
        {
          ...[1, 1],
          duration: 0.1,
          onUpdate: () => {
            this.model.circle.material.needUpdate = true;
          },
        },
        '<+0.05'
      )
      .to(
        this.model.letters.morphTargetInfluences,
        {
          ...[1, 1],
          duration: 0.1,
          onUpdate: () => {
            this.model.letters.material.needUpdate = true;
          },
        },
        '<'
      )
      .to(
        this.model.lettersTop.morphTargetInfluences,
        {
          ...[1, 1],
          duration: 0.1,
          onUpdate: () => {
            this.model.lettersTop.material.needUpdate = true;
          },
        },
        '<'
      );
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

    return canvas;
  }
}
