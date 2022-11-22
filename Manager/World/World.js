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
    this.firstText = new Text('.firstTitle', true);

    this.resources.on('ready', () => {
      this.enviroment = new Enviroment();
      this.model = new Model();
      this.setUpTimeline();
    });
  }

  setUpTimeline() {
    const linesTimeline = this.model.lines.timeline;

    const linesReverse = this.model.lines.reversedTimeline;

    const modelTimeline1 = this.model.timeline;
    const modelTimeline2 = this.model.timeline2;

    this.masterTimeline
      .add(modelTimeline1)
      .add(linesTimeline, '-=0.45')
      .add(modelTimeline2, '-=1')
      .add(linesReverse);

    this.scrollTrigger = new TriggerScroll();
  }
}
