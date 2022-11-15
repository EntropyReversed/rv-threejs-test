import * as THREE from 'three';
import Manager from '../Manager';

export default class CircleTextures {
  constructor(circle) {
    this.circle = circle
    this.manager = new Manager();
    this.resources = this.manager.resources;
    this.textures = [];

    for (const [key, value] of Object.entries(this.resources.items)) {
      if (value.isTexture) {
        value.encoding = THREE.sRGBEncoding;
        this.textures.push(value);
      }
    }
  }

  setTexture(index) {
    const texture = this.textures[index];
    texture.needsUpdate = true;
    return texture;
  }
}
