import GSAP from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EventEmitter } from 'events';
import Manager from '../Manager';

export default class TriggerScroll extends EventEmitter {
  constructor() {
    super();
    this.manager = new Manager();
    this.parent = this.manager.parent;
    this.masterTimeline = this.manager.masterTimeline;
    GSAP.registerPlugin(ScrollTrigger);
    this.createTrigger();
  }

  createTrigger() {
    this.scrollTrigger = ScrollTrigger.create({
      trigger: '.scene-wrap',
      start: 'top top',
      // markers: true,
      end: 'bottom bottom',
      scrub: true,
      animation: this.masterTimeline,
      onUpdate: (self) => {
        this.parent.style.setProperty(
          '--scroll',
          Math.round(self.progress * 100) / 100
        );
        this.emit('scroll', self.progress);
      },
    });

    // GSAP.timeline({
    //   scrollTrigger: {
    //     trigger: ".scene-wrap",
    //     start: 'top top',
    //     markers: true,
    //     end: 'bottom bottom',
    //     onEnter: () => console.log("animation-start"),
    //     onLeave: () => console.log("animation-end"),
    //     onUpdate: (self) => {
    //       this.parent.style.setProperty(
    //         '--scroll',
    //         Math.round(self.progress * 100) / 100
    //       );
    //       this.emit('scroll', self.progress);
    //     },
    //   }
    // }).add(this.masterTimeline);
  }
  
}
