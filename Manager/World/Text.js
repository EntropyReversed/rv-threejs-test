import Manager from '../Manager';

export default class Text {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.sizes = this.manager.sizes;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.text = this.manager.parent.querySelector('h2');

    this.scrollTrigger.on('scroll', (e) => {
      this.onScroll(e);
    });
  }

  onScroll(e) {
    e > 0.75 ? this.text.classList.add('in') : this.text.classList.remove('in');
  }
}
