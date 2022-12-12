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

    this.createTimeline();

    // window.scrollTo(0, 0);
  }

  setModel() {
    this.model.scene.traverse((child) => {
      if (child.name === 'Model') {
        this.group = child;
      }
    });

    this.circle = this.group.children[0];
    this.setModelPart(this.circle, 1);

    this.letters = this.group.children[2];
    this.setModelPart(this.letters);

    this.lettersTop = this.group.children[1];
    this.setModelPart(this.lettersTop);

    this.scene.add(this.group);
  }

  setModelPart(part, startOp = 0) {
    // part.material = new THREE.MeshNormalMaterial();

    // part.geometry.computeTangents();
    part.geometry.computeVertexNormals();
    console.log(part.geometry);
    part.geometry.verticesNeedUpdate = true;
    part.geometry.normalsNeedUpdate = true;

    part.material.transparent = true;
    part.material.color = new THREE.Color('rgb(200,200,200)');
    part.material.morphTargets = true;
    // part.material.morphNormals = true;
    // part.material.side = THREE.DoubleSide;
    part.material.depthWrite = true;
    // part.material.skinning = true;
    // part.material.roughnessMap = this.manager.resources.items.roughTex;
    part.material.opacity = startOp;
    part.material.metalness = 0;
    part.material.roughness = 0.1;
    // part.material.wireframe = true;
    part.material.flatShading = true;
    // part.material.vertexColors = true;
    part.material.needsUpdate = true;

    part.receiveShadow = true;
    part.castShadow = true;
  }

  createTimeline() {
    this.timeline = gsap
      .timeline()
      .to(this.circle.material, { opacity: 0.3 })
      .to(this.group.scale, { x: 2, y: 2, duration: 0.8 }, '<')
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
        '<+0.2'
      )
      .to(this.lettersTop.material, { opacity: 0.4 }, '<')
      .to(this.lettersTop.material, { opacity: 1 }, '<+0.5');
  }
}
