import { GUI } from 'dat.gui';
import * as THREE from 'three';
import gsap from 'gsap';

export default class EdgeRim {
  constructor(edge, group) {
    this.edge = edge;
    this.group = group;
    this.setUp();
  }

  setUp() {
    this.group.add(this.edge)
  }


}
