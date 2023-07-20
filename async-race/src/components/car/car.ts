import './car.css';
import createElement from '../utils/create-element';
import svgCode from '../../data/svg-code';

export default class Car {
  brand: string;

  model: string;

  color: string;

  garageItem: HTMLElement;

  carControl: HTMLElement;

  selectButton: HTMLElement;

  removeButton: HTMLElement;

  carTitle: HTMLElement;

  engineControl: HTMLElement;

  startButton: HTMLElement;

  stopButton: HTMLElement;

  track: HTMLElement;

  car:HTMLElement;

  flag: HTMLElement;

  constructor(brand: string, model: string, color: string) {
    this.brand = brand;
    this.model = model;
    this.color = color;

    this.garageItem = createElement({
      tagName: 'div',
      classNames: ['garage-item'],
    });

    this.carControl = createElement({
      tagName: 'div',
      classNames: ['car-control'],
      parentNode: this.garageItem,
    });

    this.selectButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'SELECT',
      parentNode: this.carControl,
    });

    this.removeButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'REMOVE',
      parentNode: this.carControl,
    });

    this.carTitle = createElement({
      tagName: 'p',
      classNames: ['car-title'],
      textContent: `${this.brand} ${this.model}`,
      parentNode: this.carControl,
    });

    this.engineControl = createElement({
      tagName: 'div',
      classNames: ['engine-control'],
      parentNode: this.garageItem,
    });

    this.startButton = createElement({
      tagName: 'div',
      classNames: ['button_start'],
      textContent: 'START',
      parentNode: this.engineControl,
      eventHandler: () => this.start(),
      eventType: 'click',
    });

    this.stopButton = createElement({
      tagName: 'div',
      classNames: ['button_stop'],
      textContent: 'STOP',
      parentNode: this.engineControl,
      eventHandler: () => this.stop(),
      eventType: 'click',
    });

    this.track = createElement({
      tagName: 'div',
      classNames: ['track'],
      parentNode: this.garageItem,
    });

    this.car = createElement({
      tagName: 'div',
      classNames: ['car'],
      parentNode: this.track,
    });

    this.car.innerHTML = svgCode;
    this.car.children[0].setAttribute('fill', this.color);

    this.flag = createElement({
      tagName: 'div',
      classNames: ['flag'],
      parentNode: this.track,
    });
  }

  public getCar() {
    return this.garageItem;
  }

  start() {
    const time = Math.random() * 3;
    this.car.classList.add('moove');
    this.car.style.animationDuration = `${time}s`;
  }

  stop() {
    this.car.classList.remove('moove');
  }
}
