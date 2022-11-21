import * as THREE from 'three';
import GSAP from 'gsap';
import Manager from '../Manager';
import GradientCircle from './GradientCircle';
import LinesAnimation from './LinesAnimation';
import Letters from './Letters';

export default class Model {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;
    this.model = this.resources.items.model;
    // this.gradientCircle = new GradientCircle();
    this.lines = new LinesAnimation(this.scene);

    this.setModel();

    window.scrollTo(0, 0);
  }

  setModel() {
    this.group = this.model.scene.children[0];
    this.group.scale.set(0.8, 0.8, 0.8);

    this.circle = this.group.children[0];
    this.circle.material.metalness = 0;
    this.circle.material.color = new THREE.Color('rgb(255,255,255)');
    this.circle.material.opacity = 0;

    this.lettersTop = this.group.children[1];
    this.lettersTop.material.transparent = true;
    this.lettersTop.material.opacity = 0;

    this.letters = this.group.children[2];
    this.letters.material.transparent = true;
    this.letters.material.opacity = 0;

    this.scene.add(this.group);
  }

  resize() {}

  update() {}
}
