import Manager from '../Manager';
import GSAP from 'gsap';

export default class Letters {
  constructor(child) {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.sizes = this.manager.sizes;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.offsetY = 0.125;
    this.letters = child;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.scrollTrigger.on('scroll', (e) => {
      this.onScroll(e);
    });

    this.time.on('update', () => {
      this.update();
    });
  }

  onScroll(e) {
    e > 0.5 ? (this.lerp.target = 1) : (this.lerp.target = 0);
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.letters.position.y = this.lerp.current * 0.2 - this.offsetY;
  }
}
