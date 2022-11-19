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
    this.offsetY = 0.14;
    this.circle  = child.children[0];
    this.letters = child.children[1];
    this.animation = animation;
    this.mixer = new THREE.AnimationMixer(this.letters);
    new GradientCircle(child);

    this.circle.morphTargetInfluences = [1,1]
    this.letters.morphTargetInfluences = [1,1]

    this.circle.material.depthWrite = true
    this.letters.material.depthWrite = true

    this.circle.castShadow = true
    this.letters.castShadow = true
    this.circle.receiveShadow = true
    this.letters.receiveShadow = true

    // this.letters.children[0].material.opacity = 0;
    // this.letters.children[0].material.transparent = true;
    // this.letters.children[0].material.needsUpdate = true;
    this.colorStart = new THREE.Color(0xffffff);
    this.colorEnd = new THREE.Color(0x000000);
    this.color = new THREE.Color();

    this.letters.material.color = this.color;
    this.letters.material.needsUpdate = true;

    console.log(this.animation);
    // this.clip = THREE.Animation.Clip.findByName(this.animations, "Key.001Action");
    // this.action = this.mixer.clipAction(this.animation);
    // this.action.play();

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.05,
    };

    this.scrollTrigger.on('scroll', (e) => {
      this.onScroll(e);
    });

    this.time.on('update', () => {
      this.update();
    });

    // this.mat = new THREE.MeshPhysicalMaterial({
    //   metalness: 0,
    //   roughness: 0.05,
    //   transparent: true,
    //   transmission: 0,
    //   opacity: 1,
    // });

    // this.letters.receiveShadow = true;
    // // this.circleCut.geometry = this.geometryMetal;
    // this.letters.material = this.mat;
    // this.letters.position.y = -this.offsetY;
  }

  onScroll(e) {


    if (e > 0.9) {
      this.lerp.target = 1;
    } else {
      this.lerp.target = 0.065;
    }
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    const lerpC =
      this.lerp.current > 0.999
        ? 1
        : this.lerp.current < 0.0001
        ? 0.065
        : this.lerp.current;
    // this.letters.position.y = this.lerp.current * 0.2 - this.offsetY;
    this.letters.material.metalness = lerpC * 0.99;

    this.letters.material.color = this.color.lerpColors(
      this.colorStart,
      this.colorEnd,
      lerpC
    );

    this.circle.morphTargetInfluences = [lerpC,lerpC]
    this.letters.morphTargetInfluences = [lerpC,lerpC]
  }
}
