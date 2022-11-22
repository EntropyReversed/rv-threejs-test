import GSAP from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EventEmitter } from 'events';
import Manager from '../Manager';

export default class TriggerScroll extends EventEmitter {
  constructor() {
    super();
    this.manager = new Manager();
    this.masterTimeline = this.manager.masterTimeline;
    GSAP.registerPlugin(ScrollTrigger);
    this.createTrigger();
  }

  createTrigger() {
    GSAP.timeline({
      scrollTrigger: {
        trigger: '.scene-wrap',
        start: 'top top',
        scrub: 2,
        markers: true,
        end: 'bottom bottom',
      },
    }).add(this.masterTimeline);
  }
}
