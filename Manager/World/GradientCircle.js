import * as THREE from 'three';
import Manager from '../Manager';
import Shader from './Shader';
import gsap from 'gsap';
import { GUI } from 'dat.gui';

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
      { u_letters_texture: { value: null } },
      { lettersV: { value: 0 } },
      { lUvScale: { value: 1.18 } },
      { lUvposY: { value: 0.032 } },
      { lUvposX: { value: -0.01 } },

      { progress: { value: -0.1 } },

      // THREE.UniformsLib.lights,
    ]);

    this.materialGrad = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      ...Shader,
      // lights: true,
      transparent: true,
    });
    this.materialGrad.depthWrite = false;

    // THREE.UniformsUtils.merge() calls THREE.clone() on each uniform.
    // Texture needs to be assigned here so it's not cloned
    this.materialGrad.uniforms.u_texture.value = this.texture;

    // this.manager.resources.items.lettersTexture.generateMipmaps = false;
    // this.manager.resources.items.lettersTexture.magFilter = THREE.LinearFilter;
    // this.manager.resources.items.lettersTexture.minFilter = THREE.LinearFilter;
    this.materialGrad.uniforms.u_letters_texture.value =
      this.manager.resources.items.lettersTexture;
    // this.circle.castShadow = false;
    // this.circle.receiveShadow = true;
    this.circle.geometry = this.geometry;
    this.circle.material = this.materialGrad;
    // this.circle.depthWrite = true;
    // this.circle.depthTest = true;
    this.circle.position.z = 0.0001;
    // this.circle.renderOrder = 1;

    // const gui = new GUI();
    // const folder = gui.addFolder('Shader');

    // folder.add(this.circle.material.uniforms.lUvScale, 'value', 1, 3, 0.001);
    // folder.add(this.circle.material.uniforms.lUvposY, 'value', 0, 3, 0.001);
    // folder.add(this.circle.material.uniforms.lUvposX, 'value', -1, 3, 0.001);

    // folder.open();

    // this.model.circle.morphTargetInfluences = [0.1, 0]
    // this.model.letters.morphTargetInfluences = [0.1, 0]
    // this.model.lettersTop.morphTargetInfluences = [0.1, 0]

    console.log(this.circle.material)

    this.model.circle.updateMorphTargets();
    this.model.letters.updateMorphTargets();
    this.model.lettersTop.updateMorphTargets();
    this.model.group.add(this.circle);
  }

  setUpTimeline() {
    this.timeline
      .set(this.model.circle.morphTargetInfluences, [0.005, 0])
      .set(this.model.letters.morphTargetInfluences, [0.005, 0])
      .set(this.model.lettersTop.morphTargetInfluences, [0.005, 0])
      .fromTo(
        this.circle.scale,
        // { x: 0.463, y: 0.463 },
        // { x: 0.463, y: 0.463, duration: 0.8 }

        { x: 0, y: 0 },
        { x: 1.5, y: 1.5, duration: 0.8 }
      )
      .set(this.lines.circleMain.circle.material, { opacity: 0 })
      .to(this.model.group.rotation, { x: -1, z: -0.5, duration: 1 })
      .to(this.model.group.position, { z: 4, duration: 0.8 }, '<')
      .to(this.circle.scale, { x: 0.463, y: 0.463 }, '<+0.3')

      .set(this.circle.material.uniforms.lettersV, {
        value: 1,
      })

      .set(this.model.circle.material, { metalness: 0.98 })
      .set(this.model.letters.material, { metalness: 0.98 })
      .set(this.model.lettersTop.material, { metalness: 0.98 })

      .set(this.model.circle.material, { opacity: 1 })
      .set(this.model.letters.material, { opacity: 1 })
      .set(this.model.lettersTop.material, { opacity: 1 })

      .set(this.model.circle.material, { depthWrite: true })
      .set(this.model.letters.material, { depthWrite: true })
      .set(this.model.lettersTop.material, { depthWrite: true })

      .set(this.model.circle.morphTargetInfluences, [0, 0])
      .set(this.model.letters.morphTargetInfluences, [0, 0])
      .set(this.model.lettersTop.morphTargetInfluences, [0, 0])
      .to(
        this.circle.material.uniforms.progress,
        {
          value: 1.1,
          duration: 0.5,
          ease: 'power3.out',
        },
        '<+0.1'
      )
      .to(
        this.model.circle.morphTargetInfluences,
        {
          ...[0, 1],
          duration: 0.1,
        },
        '<+=0.2'
      )
      .to(
        this.model.letters.morphTargetInfluences,
        {
          ...[0, 1],
          duration: 0.1,
        },
        '<'
      )
      .to(
        this.model.lettersTop.morphTargetInfluences,
        {
          ...[0, 1],
          duration: 0.1,
        },
        '<'
      )
      .to(
        this.model.circle.morphTargetInfluences,
        {
          ...[1, 1],
          duration: 0.2,
        },
        '<+0.1'
      )
      .to(
        this.model.letters.morphTargetInfluences,
        {
          ...[1, 1],
          duration: 0.2,
        },
        '<'
      )
      .to(
        this.model.lettersTop.morphTargetInfluences,
        {
          ...[1, 1],
          duration: 0.2,
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

  generateTextureLetters() {
    const size = 1024;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = 'black';
    ctx.rect(0, 0, size, size);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'white';
    var path = new Path2D(
      'M347.431,174.348L345.944,169.02L341.477,168.692C325.277,167.73 246.563,163.631 221.833,248.398L221.832,248.404C220.47,253.104 219.837,257.98 219.953,262.867C219.892,292.718 219.844,416.458 219.844,416.458L219.842,422.7L276.74,422.771L277.007,272.151C277.007,272.139 277.059,252.935 292.732,238.911C303.751,229.051 322.23,222.041 352.9,224.725L361.928,225.515L359.455,216.797C359.455,216.797 349.46,181.551 347.464,174.466L347.431,174.348ZM353.445,218.501C353.445,218.501 341.102,174.977 341.106,174.929C325.784,174.018 251.221,169.973 227.831,250.148C226.642,254.249 226.093,258.51 226.2,262.779C226.139,292.503 226.092,416.46 226.092,416.46L270.503,416.515L270.759,272.152C270.759,272.152 270.635,211.254 353.445,218.501Z'
    );
    ctx.fill(path);

    return canvas;
  }
}
