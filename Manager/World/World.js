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

    const modelTimeline1 = this.model.timeline;
    const modelTimeline2 = this.model.timeline2;

    this.masterTimeline
      .add(modelTimeline1)
      .add(linesTimeline, '-=0.3')
      .add(modelTimeline2, '-=0.8');
    this.scrollTrigger = new TriggerScroll();
  }
}
