import Manager from '../Manager';
import GSAP from 'gsap';

export default class Text {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.sizes = this.manager.sizes;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;
    this.text = this.manager.parent.querySelector('h2');

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.scrollTrigger.on('scroll', (e) => {
      this.onScroll(e);
    });

    // this.time.on('update', () => {
    //   this.update();
    // });
  }

  onScroll(e) {
    if (e > 0.75) {
      this.lerp.target = 1;
      this.text.classList.add('in')
    } else {
      this.text.classList.remove('in')
      this.lerp.target = 0.01;
    }
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    const lerpNearZero = this.lerp.current < 0.1 ? true : false;
    this.text.style.transform = `translate3d(-50%, ${
      lerpNearZero ? 0 : this.lerp.current * 100
    }px, 0) scale(${lerpNearZero ? 0 : 1 - this.lerp.current + 1})`;
    this.text.style.opacity = lerpNearZero ? 0 : this.lerp.current;
  }
}
