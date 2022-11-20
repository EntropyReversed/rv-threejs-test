import { EventEmitter } from 'events';

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.mult = 1;
    this.width = window.innerWidth * this.mult;
    this.height = window.innerHeight * this.mult;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    window.addEventListener('resize', () => {
      this.width = window.innerWidth * this.mult;
      this.height = window.innerHeight * this.mult;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit('resize');
    });
  }
}
