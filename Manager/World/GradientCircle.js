import * as THREE from 'three';
import Manager from '../Manager';
import CircleTextures from './CircleTextures';
import Shader from './Shader';
import GSAP from 'gsap';

export default class GradientCircle {
  constructor(circleCut) {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.masterTimeline = this.manager.masterTimeline;
    this.circleCut = circleCut;
    this.scale = 1;
    this.maxScale = 7.2;
    this.timeline = GSAP.timeline();

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.u_lerp = {
      current: 0,
      target: 0,
      ease: 0.08,
    };

    this.scrollTrigger.on('scroll', (e) => {
      this.onScroll(e);
    });

    this.time.on('update', () => {
      this.update();
    });

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

    this.circle.rotation.set(-Math.PI / 2, 0, 0);
    this.circle.position.y = 0.001;
    this.scene.add(this.circle);

    // console.log(this.circle)

    // this.timeline.to(this.circle.scale, { scale: 0.5}, 0);

    // this.masterTimeline.add(this.timeline);
  }

  onScroll(e) {
    const frames = [0.01, 0.27, 0.5, 0.75, 0.9];
    this.u_lerp.target = 0;

    switch (true) {
      case e < frames[0]:
        this.lerp.target = 0;
        break;
      case e < frames[1]:
        this.lerp.target = GSAP.utils.mapRange(frames[0], frames[1], 0, 1, e);
        break;
      case e < frames[2]:
        this.lerp.target = 1;
        this.lerp.target =
          1 - GSAP.utils.mapRange(frames[1], frames[2], 0, 1 - 0.138, e);
        break;
      case e < frames[3]:
        this.lerp.target = 0.138;
        break;

      case e < frames[4]:
        this.u_lerp.target = 1;
        break;
      case e >= frames[4]:
        this.u_lerp.target = 1;
        break;
      default:
        break;
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

    this.u_lerp.current = GSAP.utils.interpolate(
      this.u_lerp.current,
      this.u_lerp.target,
      this.u_lerp.ease
    );

    this.materialGrad.uniforms.progress.value = this.u_lerp.current;
    this.setCircle(this.lerp.current * this.maxScale);
  }
}
