import GSAP from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EventEmitter } from 'events';

export default class TriggerScroll extends EventEmitter {
  constructor() {
    super();
    GSAP.registerPlugin(ScrollTrigger);
    this.createTrigger();
  }

  createTrigger() {
    ScrollTrigger.create({
      trigger: '.scene-wrap',
      start: 'top top',
      markers: true,
      end: 'bottom bottom',
      onUpdate: (self) => {
        this.emit('scroll', self.progress);
      },
    });
  }
}
