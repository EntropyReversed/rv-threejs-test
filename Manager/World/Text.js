import gsap from 'gsap';
import Manager from '../Manager';

export default class Text {
  constructor(selector, breakChars = false) {
    this.manager = new Manager();
    this.breakChars = breakChars;
    this.text = this.manager.parent.querySelector(selector);
    this.timeline = gsap.timeline();

    // this.scrollTrigger.on('scroll', (e) => {
    //   this.onScroll(e);
    // });

  }



  // onScroll(e) {
  //   e > 0.75 ? this.text.classList.add('in') : this.text.classList.remove('in');
  // }
}
