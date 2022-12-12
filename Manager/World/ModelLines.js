import { GUI } from 'dat.gui';
import * as THREE from 'three';
import gsap from 'gsap';

export default class ModelLines {
  constructor(line, group) {
    this.line = line;
    this.group = group;
    this.posOffsetZ = 0.01;
    this.rotOffset = 0.01;
    this.setUp();
  }

  setUp() {
    this.lines = [];
    for (let i = 0; i < 18; i++) {
      const mesh = this.line.clone();
      mesh.material = new THREE.MeshBasicMaterial();
      mesh.material.color = new THREE.Color('red');
      // mesh.material.wireframe = true
      mesh.material.flatShading = false;
      mesh.geometry.computeVertexNormals();
      mesh.geometry.verticesNeedUpdate = true;

      mesh.position.z = i * -this.posOffsetZ;
      mesh.rotation.z = Math.PI * 1.5;

      mesh.scale.z = 1;
      this.lines.push(mesh);
      this.group.add(mesh);
    }
  }

  getTimeline() {
    this.timeline = gsap.timeline();

    this.lines.forEach((line, index) => {
      this.timeline.to(
        line.rotation,
        { z: -0.02, duration: Math.random() * 6 + 2 },
        index === 0 ? '' : '<'
      );
    });

    return this.timeline;
  }
}
