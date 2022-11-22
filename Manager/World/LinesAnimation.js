import * as THREE from 'three';
import gsap from 'gsap';

const circleMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  depthWrite: false,
});
const createCircle = (r, width, pos, c = 'rgb(40,40,40)') => {
  const geometry = new THREE.RingGeometry(r, r + width, 100, null, 0, 0);
  const material = circleMaterial.clone();
  material.color = new THREE.Color(c);
  material.needsUpdate = true;
  const mesh = new THREE.Mesh(geometry, material);

  mesh.userData = {
    radius: r,
    width: r + width,
  };
  mesh.position.set(pos.x, pos.y, pos.z);
  return mesh;
};

const createLine = (w, h, pos, ang, origin, c = 'rgb(40,40,40)') => {
  let offset, position;
  if (origin === 'top') {
    offset = new THREE.Vector3(-w * 0.5, 0, 0);
    position = new THREE.Vector3(pos.x, pos.y + w * 0.5, pos.z);
  }
  if (origin === 'btm') {
    offset = new THREE.Vector3(w * 0.5, 0, 0);
    position = new THREE.Vector3(pos.x, (pos.y + w * 0.5) * -1, pos.z);
  }
  if (origin === 'left') {
    offset = new THREE.Vector3(w * 0.5, 0, 0);
    position = new THREE.Vector3(pos.x - w * 0.5, pos.y, pos.z);
  }
  if (origin === 'right') {
    offset = new THREE.Vector3(-w * 0.5, 0, 0);
    position = new THREE.Vector3(pos.x + w * 0.5, pos.y, pos.z);
  }
  if (origin === '') {
    offset = new THREE.Vector3(0, 0, 0);
    position = new THREE.Vector3(pos.x, pos.y, pos.z);
  }

  const geometry = new THREE.PlaneGeometry(w, h);
  geometry.translate(...offset);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(c),
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(0, 0, ang);
  return mesh;
};

const updateCircle = (c, p) => {
  c.geometry.dispose();
  const newGeo = new THREE.RingGeometry(
    c.userData.radius,
    c.userData.width,
    64,
    null,
    0,
    p
  );
  c.geometry = newGeo;
};

class AnimatableCircle {
  constructor(r, w, pos, c) {
    this.circle = createCircle(r, w, pos, c);
    this.obj = {
      progress: 0,
    };
  }
}

class AnimatableLine {
  constructor(w, h, pos, ang, org) {
    this.line = createLine(w, h, pos, ang, org);
    this.obj = {
      progress: 0,
    };
  }
}

export default class LinesAnimation {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'Lines';
    this.r = 2.8;
    this.w = 0.02;

    this.g = 0.2;

    this.timeline = gsap.timeline();
    this.groupTimeline = gsap.timeline();
    this.circlesTimeline = gsap.timeline();
    this.linesTimeline = gsap.timeline();

    this.reversedTimeline = gsap.timeline();
    this.circlesTimelineReverse = gsap.timeline();
    this.linesTimelineReverse = gsap.timeline();

    this.reversedTimeline
      .add(this.linesTimelineReverse)
      .add(this.circlesTimelineReverse, '<+0.2');

    this.timeline
      .add(this.groupTimeline)
      .add(this.circlesTimeline, '<')
      .add(this.linesTimeline);

    this.generateCircles();
    this.generateLines();

    this.scene.add(this.group);
    this.createCirclesReverseTimeline();
    this.createLinesReverseTimeline();

    this.createGroupTimeline();
    this.createCirclesTimeline();
    this.createLinesTimeline();
  }

  generateLines() {
    const halfPI = Math.PI * 0.5;
    this.lineMid = new AnimatableLine(
      12,
      this.w,
      new THREE.Vector3(0, 0, -0.002),
      halfPI,
      'btm'
    );
    this.lineRight = new AnimatableLine(
      12,
      this.w,
      new THREE.Vector3(this.r + this.w * 0.5, 0, -0.001),
      halfPI,
      'btm'
    );
    this.lineLeft = new AnimatableLine(
      12,
      this.w,
      new THREE.Vector3((this.r + this.w * 0.5) * -1, 0, -0.001),
      halfPI,
      'btm'
    );

    this.lineTop = new AnimatableLine(
      18,
      this.w,
      new THREE.Vector3(0, this.r + this.w * 0.5, -0.001),
      0,
      'left'
    );
    this.lineBtm = new AnimatableLine(
      18,
      this.w,
      new THREE.Vector3(0, (this.r + this.w * 0.5) * -1, -0.001),
      0,
      'right'
    );

    this.lineTopI = new AnimatableLine(
      18,
      this.w,
      new THREE.Vector3(0, this.r + this.w * 0.5 - this.g, -0.001),
      0,
      'left'
    );
    this.lineBtmI = new AnimatableLine(
      18,
      this.w,
      new THREE.Vector3(0, (this.r + this.w * 0.5 - this.g) * -1, -0.001),
      0,
      'right'
    );
    this.lineRightI = new AnimatableLine(
      12,
      this.w,
      new THREE.Vector3(this.r + this.w * 0.5 - this.g, 0, -0.0015),
      halfPI,
      'top'
    );
    this.lineLeftI = new AnimatableLine(
      12,
      this.w,
      new THREE.Vector3((this.r + this.w * 0.5 - this.g) * -1, 0, -0.0015),
      halfPI,
      'btm'
    );

    this.lineMidT = new AnimatableLine(
      18,
      this.w,
      new THREE.Vector3(0, this.r * 0.5 + this.w * 0.5 - this.g - 0.1, -0.001),
      0,
      'left'
    );

    this.lineMidB = new AnimatableLine(
      18,
      this.w,
      new THREE.Vector3(
        0,
        (this.r * 0.5 + this.w * 0.5 - this.g) * -1 + 0.1,
        -0.001
      ),
      0,
      'right'
    );

    this.lineD1 = new AnimatableLine(
      18,
      this.w,
      new THREE.Vector3(0, 0, -0.0015),
      halfPI * 0.5,
      ''
    );
    this.lineD2 = new AnimatableLine(
      18,
      this.w,
      new THREE.Vector3(0, 0, -0.001),
      halfPI * -0.5,
      ''
    );

    this.group.add(this.lineMid.line);
    this.group.add(this.lineRight.line);
    this.group.add(this.lineLeft.line);
    this.group.add(this.lineTop.line);
    this.group.add(this.lineBtm.line);
    this.group.add(this.lineTopI.line);
    this.group.add(this.lineBtmI.line);
    this.group.add(this.lineRightI.line);
    this.group.add(this.lineLeftI.line);
    this.group.add(this.lineMidB.line);
    this.group.add(this.lineMidT.line);
    this.group.add(this.lineD1.line);
    this.group.add(this.lineD2.line);
  }

  generateCircles() {
    this.circleMid = new AnimatableCircle(
      this.r,
      this.w,
      new THREE.Vector3(0, 0, 0)
    );
    this.circleMain = new AnimatableCircle(
      this.r - this.g,
      this.w * 2,
      new THREE.Vector3(0, 0, 0),
      'rgb(255,255,255)'
    );
    this.circleLeft = new AnimatableCircle(
      this.r,
      this.w,
      new THREE.Vector3(this.r * -2 - this.w, 0, 0.001)
    );
    this.circleRight = new AnimatableCircle(
      this.r,
      this.w,
      new THREE.Vector3(this.r * 2 + this.w, 0, 0.002)
    );
    this.circleTop = new AnimatableCircle(
      this.r,
      this.w,
      new THREE.Vector3(0, this.r * 2 + this.w, 0.0025)
    );
    this.circleTopS = new AnimatableCircle(
      this.r / 2,
      this.w,
      new THREE.Vector3(this.r / 2, this.r * 1.5 + this.w, 0.0028)
    );
    this.circleTopXS = new AnimatableCircle(
      this.r / 4,
      this.w,
      new THREE.Vector3(this.r / 2, this.r * 1.25 + this.w, 0.003)
    );
    this.circleBtm = new AnimatableCircle(
      this.r,
      this.w,
      new THREE.Vector3(0, this.r * -2 - this.w, 0.0031)
    );
    this.circleBtmS = new AnimatableCircle(
      this.r / 2,
      this.w,
      new THREE.Vector3(this.r / 2, this.r * -1.5 - this.w, 0.0035)
    );

    this.group.add(this.circleMid.circle);
    this.group.add(this.circleLeft.circle);
    this.group.add(this.circleRight.circle);
    this.group.add(this.circleTop.circle);
    this.group.add(this.circleBtm.circle);

    this.group.add(this.circleMain.circle);
    this.group.add(this.circleTopS.circle);
    this.group.add(this.circleTopXS.circle);

    this.group.add(this.circleBtmS.circle);
  }

  createGroupTimeline() {
    this.groupTimeline
      .fromTo(
        this.group.position,
        { x: -3, y: -2, z: 1 },
        { x: 0, y: 0, z: 0, duration: 1 }
      )
      .fromTo(
        this.group.scale,
        { x: 1.5, y: 1.5 },
        { x: 1, y: 1, duration: 2 },
        '<'
      )
      .fromTo(
        this.group.rotation,
        { x: -0.8, y: 0.1 },
        { x: 0, y: 0, duration: 2 },
        '<+0.5'
      );
  }

  createCirclesTimeline() {
    const steps = [
      [this.circleRight, ''],
      [this.circleMid, '<+0.1'],
      [this.circleTopS, '<+0.15'],
      [this.circleTopXS, '<+0.15'],
      [this.circleTop, '<-0.15'],
      [this.circleLeft, '<-0.2'],
      [this.circleBtm, '<+0.1'],
      [this.circleBtmS, '<+0.15'],
      [this.circleMain, '<+1.2'],
    ];
    const dur = 0.8;

    steps.forEach((step) => {
      const twoPI = Math.PI * 2;
      this.circlesTimeline.to(
        step[0].obj,
        {
          progress: twoPI,
          duration: dur,
          onUpdate: () => {
            updateCircle(step[0].circle, step[0].obj.progress);
          },
        },
        step[1]
      );
    });

    steps.forEach((step, i) => {
      this.circlesTimeline.to(
        step[0].circle.material,
        { opacity: 0.3, duration: dur / 2 },
        '<'
      );
    });
  }

  createCirclesReverseTimeline() {
    const steps = [
      [this.circleTopXS, ''],
      [this.circleMid, '<'],
      [this.circleTopS, '<'],
      [this.circleRight, '<'],
      [this.circleTop, '<'],
      [this.circleLeft, '<'],
      [this.circleBtm, '<'],
      [this.circleBtmS, '<'],
    ];
    const dur = 0.4;

    this.circlesTimelineReverse.to(this.circleMain.circle.material, {
      opacity: 1,
    });

    steps.forEach((step) => {
      this.circlesTimelineReverse.to(
        step[0].obj,
        {
          progress: 0,
          duration: dur,
          onUpdate: () => {
            updateCircle(step[0].circle, step[0].obj.progress);
          },
        },
        step[1]
      );
    });
  }

  createLinesTimeline() {
    const steps = [
      [this.lineRight, ''],
      [this.lineLeft, '<'],
      [this.lineTop, '<'],
      [this.lineMidT, '<+0.2'],
      [this.lineTopI, '<'],
      [this.lineBtmI, '<'],
      [this.lineLeftI, '<'],
      [this.lineRightI, '<'],
      [this.lineMidB, '<+0.2'],
      [this.lineBtm, '<'],
      [this.lineMid, '<+0.5'],
      [this.lineD1, '<'],
      [this.lineD2, '<'],
    ];
    const dur = 1;

    steps.forEach((step) => {
      this.linesTimeline.fromTo(
        step[0].line.scale,
        { x: 0 },
        { x: 1, duration: dur },
        step[1]
      );
    });

    steps.forEach((step) => {
      this.linesTimeline.to(
        step[0].line.material,
        { opacity: 0.3, duration: dur / 2 },
        '<'
      );
    });
  }

  createLinesReverseTimeline() {
    const steps = [
      [this.lineMid, ''],
      [this.lineD1, '<'],
      [this.lineD2, '<'],
      [this.lineLeft, '<+0.25'],
      [this.lineTop, '<'],
      [this.lineTopI, '<'],
      [this.lineBtmI, '<'],
      [this.lineLeftI, '<'],
      [this.lineRightI, '<'],
      [this.lineBtm, '<'],
      [this.lineRight, '<'],
      [this.lineMidT, '<+0.1'],
      [this.lineMidB, '<'],
    ];
    const dur = 0.6;

    steps.forEach((step) => {
      this.linesTimelineReverse.to(
        step[0].line.scale,
        { x: 0, duration: dur },
        step[1]
      );
    });
  }
}
