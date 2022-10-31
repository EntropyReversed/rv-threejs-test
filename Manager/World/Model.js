import * as THREE from 'three';
import GSAP from 'gsap';
import Manager from '../Manager';

export default class Model {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;
    this.model = this.resources.items.model;
    this.actualModel = this.model.scene;

    // this.lerp = {
    //   current: 0,
    //   target: 0,
    //   ease: 0.1,
    // };

    // this.onMouseMove();
    this.setModel();
  }

  setModel() {
    this.actualModel.children.forEach((child) => {
      child.castShadow = true;
      child.recieveShadow = true;

      if (child.name === 'circleGrad') {
        const scale = 0;
        child.scale.set(scale, scale, scale);
      }
    });

    this.scene.add(this.actualModel);
  }

  // onMouseMove() {
  //   window.addEventListener('mousemove', e => {
  //     this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
  //     this.lerp.target = this.rotation * 0.1;
  //   })
  // }

  resize() {}

  update() {
    // this.lerp.current = GSAP.utils.interpolate(
    //   this.lerp.current,
    //   this.lerp.target,
    //   this.lerp.ease
    // );
    // this.actualModel.rotation.y = this.lerp.current;
  }
}
