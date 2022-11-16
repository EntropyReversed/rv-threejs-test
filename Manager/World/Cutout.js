import * as THREE from 'three';
import Manager from '../Manager';
import GSAP from 'gsap';

export default class Cutout {
  constructor(model) {
    this.cutout = model;
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;

    // this.cutout = new THREE.Mesh();

    this.geometry = new THREE.PlaneGeometry(2.5, 2.5);
    // this.model.visible = false;

    this.mat = new THREE.MeshPhysicalMaterial({
      metalness: 0.99,
      roughness: 0.05,
      transparent: true,
      transmission: 0,
      opacity: 0,
    });

    // this.cutout.geometry = this.geometry;
    // this.cutout.receiveShadow = true;
    this.cutout.material = this.mat;
    // this.cutout.scale.set(1.01, 1.01, 1.01);

    // this.cutout.rotation.set(-Math.PI / 2, 0, 0);
    this.cutout.position.y = -0.2;
    // this.scene.add(this.cutout);

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
  }

  onScroll(e) {
    if (e < 0.3) {
      this.cutout.material.opacity = 0;
    } else if (e > 0.95) {
      this.cutout.material.opacity = 1;
      this.lerp.target = 1;
      // this.cutout.material.opacity = 1;
    } else {
      // this.cutout.material.opacity = 0;
      this.lerp.target = 0;
    }

    // switch (true) {
    //   case e < 0.3:
    //     this.lerp.target = 0;
    //     this.cutout.material.opacity = 0;
    //     break;
    //   case e < 0.7:
    //     this.lerp.target = 0;
    //     this.cutout.material.opacity = 1;
    //     break;
    //   case e < 0.94:
    //     this.lerp.target = 1;
    //     break;
    //   case e >= 0.94:
    //     this.lerp.target = 1;
    //     break;
    //   default:
    //     break;
    // }
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.cutout.position.y = this.lerp.current * -0.2;
  }
}
