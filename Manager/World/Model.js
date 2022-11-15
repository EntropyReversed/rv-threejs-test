import * as THREE from 'three';
import GSAP from 'gsap';
import Manager from '../Manager';
import GradientCircle from './GradientCircle';
import Letters from './Letters';

export default class Model {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;
    this.model = this.resources.items.model;
    this.actualModel = this.model.scene;
    this.gradientCircle = new GradientCircle();

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

      console.log(child)
      if (child.name === 'letters') {
        this.letters = new Letters(child);
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
