import * as THREE from 'three';
import gsap from 'gsap';
import Manager from '../Manager';
import GradientCircle from './GradientCircle';
import LinesAnimation from './LinesAnimation';

export default class Model {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.resources = this.manager.resources;
    this.model = this.resources.items.model;
    this.setModel();

    this.lines = new LinesAnimation(this.scene);
    this.gradientCircle = new GradientCircle(this.lines, this);

    // this.setOverlay();
    this.createTimeline();

    window.scrollTo(0, 0);
  }

  // setOverlay() {
  //   this.overlayGeo = new THREE.PlaneGeometry(20, 20);
  //   this.overlayMat = new THREE.MeshBasicMaterial({
  //     color: new THREE.Color('rgb(0,0,0)'),
  //     transparent: true,
  //     opacity: 0,
  //   });
  //   this.overlay = new THREE.Mesh(this.overlayGeo, this.overlayMat);
  //   this.overlay.position.z = 11;
  //   this.scene.add(this.overlay);
  // }

  setModel() {
    this.group = this.model.scene.children[0];
    this.group.scale.set(2.6, 2.6, 2.6);
    this.group.position.set(0, 0, 0.1);

    this.circle = this.group.children[0];
    this.circle.material.transparent = true;
    this.circle.material.metalness = 0;
    this.circle.material.roughness = 0.1;
    this.circle.material.color = new THREE.Color('rgb(255,255,255)');
    this.circle.material.morphTargets = true;
    this.circle.material.depthWrite = false;
    this.circle.material.side = THREE.DoubleSide;

    this.lettersTop = this.group.children[1];
    this.lettersTop.material.transparent = true;
    this.lettersTop.material.opacity = 0;
    this.lettersTop.material.color = new THREE.Color('rgb(255,255,255)');
    this.lettersTop.material.morphTargets = true;
    this.lettersTop.material.depthWrite = true;
    this.lettersTop.material.roughness = 0.1;

    this.letters = this.group.children[2];
    this.letters.material.transparent = true;
    this.letters.material.opacity = 0;
    this.letters.material.color = new THREE.Color('rgb(255,255,255)');
    this.letters.material.morphTargets = true;
    this.letters.material.depthWrite = true;
    this.letters.material.side = THREE.DoubleSide;
    this.letters.material.roughness = 0.1;

    // this.circle.frustumCulled = false;
    // this.lettersTop.frustumCulled = false;
    // this.letters.frustumCulled = false;

    this.circle.receiveShadow = true;
    this.lettersTop.receiveShadow = true;
    this.letters.receiveShadow = true;


    this.circle.castShadow = true;
    this.lettersTop.castShadow = true;
    this.letters.castShadow = true;

    this.scene.add(this.group);
  }

  // setMaterial(mat) {
  //   mat.material.transparent = true;
  //   mat.material.opacity = 0;
  //   mat.material.color = new THREE.Color('rgb(255,255,255)');
  //   mat.material.morphTargets = true;
  //   mat.material.side = THREE.DoubleSide;
  // }

  createTimeline() {
    this.timeline = gsap
      .timeline()
      .to(this.circle.material, { opacity: 0.3 })
      .to(this.group.scale, { x: 2.4, y: 2.4, duration: 0.6 }, '<+0.3')
      .to(this.group.scale, { x: 2.6, y: 2.6, duration: 0.2 })
      .to(this.circle.material, { opacity: 1 }, '<')
      .to(this.group.rotation, { z: 0.6, duration: 0.4 }, '<')
      .to(
        this.group.position,
        { z: 12, x: -0.5, duration: 0.2, ease: 'power3.in' },
        '<'
      );

    this.timeline2 = gsap
      .timeline()
      .set(this.circle.material, { opacity: 0 })
      .set(this.group.rotation, { z: 0 })
      .set(this.group.position, { x: 0.3, y: 0.08 })
      .set(this.lettersTop.material, { opacity: 1 })
      .to(this.group.scale, { x: 2.6, y: 2.6, duration: 0.2 })
      .to(
        this.group.position,
        { x: 0, z: 0.5, duration: 0.4, ease: 'power3.out' },
        '<'
      )
      .to(this.lettersTop.material, { opacity: 0.4 }, '<')
      .to(this.lettersTop.material, { opacity: 1 }, '<+0.5');
    // .to(this.overlay.material, { opacity: 0.4 }, '<');
  }

  resize() {}
}
