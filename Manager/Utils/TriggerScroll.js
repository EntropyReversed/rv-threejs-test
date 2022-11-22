import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Manager from '../Manager';

export default class TriggerScroll {
  constructor() {
    this.manager = new Manager();
    this.masterTimeline = this.manager.masterTimeline;
    gsap.registerPlugin(ScrollTrigger);
    this.createTrigger();
  }

  createTrigger() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.scene-wrap',
          start: 'top top',
          scrub: 2,
          end: 'bottom bottom',
        },
      })
      .add(this.masterTimeline);
  }
}
