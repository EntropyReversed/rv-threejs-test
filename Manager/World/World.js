import Manager from '../Manager';
import Model from './Model';
import Enviroment from './Enviroment';
import Text from './Text';

export default class World {
  constructor() {
    this.manager = new Manager();
    this.resources = this.manager.resources;
    this.text = new Text();

    this.resources.on('ready', () => {
      this.enviroment = new Enviroment();
      this.model = new Model();
    });
  }

  update() {
    if (this.model) {
      this.model.update();
    }
  }
}
