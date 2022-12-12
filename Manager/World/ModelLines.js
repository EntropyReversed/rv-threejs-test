import { GUI } from 'dat.gui';
import * as THREE from 'three';
import gsap from 'gsap';


const linesData = [
  ['red', ''],
  ['blue', '<'],
  ['green', '<'],
  ['purple', '<'],
  ['teal', '<'],
  ['blue', '<'],
  ['purple', '<'],
  ['red', '<'],
  ['crimson', '<'],
  ['orange', '<'],
  ['red', '<'],
  ['red', '<'],
  ['red', '<'],
  ['red', '<'],
  ['red', '<'],
];

export default class ModelLines {
  constructor(line, group) {
    this.line = line;
    this.group = group;
    this.posOffsetZ = 0.012;
    this.rotOffset = 0.01;
    this.setUp();
  }

  setUp() {
    this.lines = [];
    for (let i = 0; i < linesData.length; i++) {
      const mesh = this.line.clone();
      mesh.material = new THREE.MeshStandardMaterial();
      mesh.material.color = new THREE.Color(linesData[i][0]);
      mesh.visible = false;
      mesh.material.wireframe = true
      mesh.material.flatShading = false;

      mesh.position.z = i * -this.posOffsetZ;
      mesh.rotation.z = 2.5;
      mesh.layers.enable(1);

      mesh.scale.z = 1;
      this.lines.push(mesh);
      this.group.add(mesh);
    }
  }

  getTimeline() {
    this.timeline = gsap.timeline();

    this.lines.forEach((line) => {
      this.timeline.set(line, { visible: true });
    });

    this.lines.forEach((line, index) => {
      console.log(linesData[index]);
      this.timeline.to(
        line.rotation,
        { z: 1, duration: Math.random() * 3 + 1 },
        linesData[index][1]
      );
    });

    return this.timeline;
  }
}
