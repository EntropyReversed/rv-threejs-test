import Manager from '../Manager';
import GSAP from 'gsap';
import GradientCircle from './GradientCircle';
import * as THREE from 'three';

export default class Letters {
  constructor(child, animation) {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.sizes = this.manager.sizes;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.offsetY = 0.065;
    this.circle = child.children[0];
    this.letters = child.children[1];
    this.animation = animation;
    this.mixer = new THREE.AnimationMixer(this.letters);
    new GradientCircle(child);

    this.circle.morphTargetInfluences = [0, 0];
    this.letters.morphTargetInfluences = [0, 0];

    this.circle.material.depthWrite = true;
    this.letters.material.depthWrite = true;

    this.circle.castShadow = true;
    this.letters.castShadow = true;
    this.circle.receiveShadow = true;
    this.letters.receiveShadow = true;

    // this.letters.children[0].material.opacity = 0;
    // this.letters.children[0].material.transparent = true;
    // this.letters.children[0].material.needsUpdate = true;
    this.colorStart = new THREE.Color(0xffffff);
    this.colorEnd = new THREE.Color(0x000000);
    this.color = new THREE.Color();

    this.letters.material.color = this.color;
    this.letters.material.needsUpdate = true;

    // console.log(this.animation);
    // this.clip = THREE.Animation.Clip.findByName(this.animations, "Key.001Action");
    // this.action = this.mixer.clipAction(this.animation);
    // this.action.play();

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.lerpCol = {
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

    this.mat = new THREE.MeshPhysicalMaterial({
      metalness: 0,
      roughness: 0.05,
      transmission: 0,
    });

    // this.letters.receiveShadow = true;
    // // this.circleCut.geometry = this.geometryMetal;
    this.letters.material = this.mat;
    // this.letters.position.y = -this.offsetY;
  }

  onScroll(e) {
    this.lerpCol.target = 0;
    this.lerp.target = 0;

    if (e > 0.75 && e < 0.8) {
      this.lerpCol.target = 1;
    } else if (e >= 0.8) {
      this.lerp.target = 1;
      this.lerpCol.target = 1;
    }
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.lerpCol.current = GSAP.utils.interpolate(
      this.lerpCol.current,
      this.lerpCol.target,
      this.lerpCol.ease
    );

    // this.letters.position.y = this.lerp.current * 0.2 - this.offsetY;
    this.letters.material.metalness = this.lerpCol.current * 0.99;

    this.letters.material.color = this.color.lerpColors(
      this.colorStart,
      this.colorEnd,
      this.lerpCol.current
    );

    const lerpC =
      this.lerp.current > 0.999
        ? 1
        : this.lerp.current < 0.001
        ? 0
        : this.lerp.current;

    this.circle.morphTargetInfluences = [lerpC, 0];
    this.letters.morphTargetInfluences = [lerpC, 0];
  }
}
