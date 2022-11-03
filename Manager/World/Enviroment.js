import * as THREE from 'three';
import Manager from '../Manager';
import GSAP from 'gsap';

const map = (n, start1, end1, start2, end2) => {
  const val = ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  if (val < start2) return start2;
  if (val > end2) return end2;
  return val;
};

export default class Enviroment {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.scrollTrigger = this.manager.scrollTrigger;
    this.time = this.manager.time;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setSunlight();

    // this.scrollTrigger.on('scroll', (e) => {
    //   this.onScroll(e);
    // });

    // this.time.on('update', () => {
    //   this.update();
    // });
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 2.5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 60;
    this.sunLight.shadow.mapSize.set(4096, 4096);
    this.sunLight.shadow.normalBias = 0.01;
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);
    this.sunLight.position.set(-30, 20, -30);
    this.scene.add(this.sunLight);

    this.ambientlight = new THREE.AmbientLight('#ffffff', 1);
    this.scene.add(this.ambientlight);
  }

  onScroll(e) {
    if (e > 0.75) {
      this.lerp.target = 1;
    } else {
      this.lerp.target = 0;
    }
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.sunLight.position.set(-30, this.lerp.current * 15 + 10, -30);
  }
}
