import Manager from '../Manager';
import GSAP from 'gsap';

export default class Lines {
  constructor() {
    this.manager = new Manager();
    this.sizes = this.manager.sizes;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.parent = this.manager.parent;
    this.createSVG();

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    // this.scrollTrigger.on('scroll', (e) => {
    //   this.onScroll(e);
    // });

    this.time.on('update', () => {
      this.update();
    });
  }

  // onScroll(e) {
  //   e > 0.75 ? (this.lerp.target = 1) : (this.lerp.target = 0);
  // }

  createSVG() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.classList.add('lines-svg');
    this.svg.setAttribute('width', this.sizes.width);
    this.svg.setAttribute('height', this.sizes.height);
    this.svg.setAttribute(
      'viewBox',
      `0 0 ${this.sizes.width} ${this.sizes.height}`
    );

    this.parent.querySelector('.scene').prepend(this.svg);
    // this.createCircle(this.sizes.width * 0.5,this.sizes.height * 0.5, 142)
  }

  createCircle(x, y, r) {
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', r);
    circle.setAttribute('stroke', 'white');
    circle.setAttribute('stroke-width', '4');
    circle.setAttribute('fill', 'transparent');

    this.svg.appendChild(circle);
  }

  createLine() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    // this.letters.position.y = this.lerp.current * 0.2 - this.offsetY;
  }
}
