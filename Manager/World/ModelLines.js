import { GUI } from 'dat.gui';
import * as THREE from 'three';
import gsap from 'gsap';

const linesData = [
  ['red', '', 0],
  ['blue', '<', 2],
  ['green', '<', 4],
  ['purple', '<', 1],
  ['teal', '<', 5],
  ['blue', '<', 11],
  ['purple', '<', 8],
  ['red', '<', 7],
  ['crimson', '<', 20],
  ['orange', '<', 21],
  ['purple', '<', 14],
  ['crimson', '<', 5],
  ['teal', '<', 8],
  ['blue', '<', 10],
  ['red', '<', 22],
];

const modelLineMaterial = new THREE.MeshStandardMaterial();

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
      mesh.material = modelLineMaterial.clone();
      mesh.material.color = new THREE.Color(linesData[i][0]);
      // mesh.visible = false;
      // mesh.material.wireframe = true;

      console.log(mesh.geometry);
      // mesh.material.flatShading = false;
      // mesh.geometry.computeVertexNormals();
      // console.log(mesh.material)

      mesh.position.z = i * -this.posOffsetZ;
      mesh.rotation.z = 2.5 + 0.049 * linesData[i][2];
      mesh.scale.z = 1;
      mesh.layers.enable(1);

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
      this.timeline.to(
        line.rotation,
        { z: -0.5 - 0.049 * linesData[index][2], duration: 2 },
        linesData[index][1]
      );
    });
    // Math.random() * 3 + 1
    return this.timeline;
  }
}
