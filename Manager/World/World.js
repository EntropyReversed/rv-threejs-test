import Manager from '../Manager';
import Model from './Model';
import Enviroment from './Enviroment';
import Text from './Text';
import TriggerScroll from '../Utils/TriggerScroll';

export default class World {
  constructor() {
    this.manager = new Manager();
    this.masterTimeline = this.manager.masterTimeline;
    this.resources = this.manager.resources;
    this.text = new Text();

    this.resources.on('ready', () => {
      this.enviroment = new Enviroment();
      this.model = new Model();
      this.setUpTimeline();
    });
  }

  setUpTimeline() {
    const linesTimeline = this.model.lines.getTimeline();
    const modelTimeline = this.model.timeline;


    this.masterTimeline.add(modelTimeline).add(linesTimeline, "-=0.3");
    this.scrollTrigger = new TriggerScroll();
  }

  update() {
    if (this.model) {
      this.model.update();
    }
  }
}
