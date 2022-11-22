export default class Sizes {
  constructor() {
    this.mult = 1;
    this.width = window.innerWidth * this.mult;
    this.height = window.innerHeight * this.mult;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }

  resize() {
    this.width = window.innerWidth * this.mult;
    this.height = window.innerHeight * this.mult;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }
}
