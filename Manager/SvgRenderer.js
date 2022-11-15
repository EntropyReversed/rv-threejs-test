import Manager from './Manager';
import * as THREE from 'three';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';

export default class SvgRenderer {
  constructor() {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scene = this.manager.SvgScene;
    this.canvas = this.manager.canvas;
    this.camera = this.manager.camera;
    this.parent = this.manager.parent;

    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new SVGRenderer( {alpha: true } );
    this.setSize();
    this.renderer.setClearColor( 0x000000, 0);
    this.parent.querySelector('.scene').appendChild( this.renderer.domElement );


    // const node = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
    // node.setAttribute( 'stroke', 'white' );
    // node.setAttribute( 'fill', 'transparent' );
    // node.setAttribute( 'r', '10' );
    // node.setAttribute( 'stroke-width', '10' );
    // node.style.cursor = 'pointer';
    // var object = new THREE.SVGObject( node );
    // object.position.x = 0;
    // object.position.y = 0;
    // object.position.z = 1500;
    // this.scene.add( object );
    console.dir(THREE)
  }

  setSize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
  }

  resize() {
    this.setSize();
  }

  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
