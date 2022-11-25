import gsap from 'gsap';
import Manager from '../Manager';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default class Text {
  constructor() {
    this.manager = new Manager();
    // this.text = this.manager.parent.querySelector(selector);
    this.timeline = gsap.timeline();
    this.splitText('.firstTitle .top');
    this.splitText('.firstTitle .btm');

    this.timeline
      .fromTo('.firstTitle .top .letter', {opacity: 0}, {
        duration: 1.5,
        opacity: 1,
        stagger: 0.015,
      })
      .fromTo('.firstTitle .btm .letter', {opacity: 0}, {
        duration: 1.5,
        opacity: 1,
        stagger: 0.015,
      }, "<+0.4")
      // .to('.firstTitle .btm', {
      //   duration: 2,
      //   text: {
      //     value:
      //       this.manager.parent.querySelector('.firstTitle .btm').dataset.text,
      //     speed: 4,
      //   },
      //   ease: 'none',
      // }, "<+0.3")
      .to(
        '.firstTitle',
        {
          opacity: 0,
          duration: 0.1,
        }, "-=0.65"
      );

  }

  splitText(selector) {
    const node = this.manager.parent.querySelector(selector);
    const word = [...node.dataset.text];
    node.innerHTML = '';
    word.forEach((letter, letterIndex) => {
      const spannedLetter = document.createElement('span');
      if (letter == ' ') {
        spannedLetter.textContent = '\xa0';
      } else {
        spannedLetter.textContent = letter;
        spannedLetter.style.opacity = 0;
        spannedLetter.classList.add('letter');
      }

      node.appendChild(spannedLetter);
    });
  }
}
