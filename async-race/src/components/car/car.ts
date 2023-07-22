import './car.css';
import createElement from '../utils/create-element';
import svgCode from '../../data/svgCode';

export default class Car {
  name: string;

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

  isSelected: boolean;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
    this.isSelected = false;

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
      eventHandler: () => this.select(),
      eventType: 'click',
    });

    this.removeButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'REMOVE',
      parentNode: this.carControl,
      eventHandler: () => this.remove(),
      eventType: 'click',
    });

    this.carTitle = createElement({
      tagName: 'p',
      classNames: ['car-title'],
      textContent: `${this.name}`,
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

  public getCar(): HTMLElement {
    return this.garageItem;
  }

  public select(): void {
    this.isSelected = !this.isSelected;
    this.carTitle.classList.toggle('selected');
  }

  public remove(): void {
    this.garageItem.remove();
  }

  public start(): void {
    // const time = Math.random() * 3;
    this.car.style.animationDuration = `${5}s`;
    this.car.classList.add('moove');
    // this.car.classList.add('finish');
    // setTimeout(() => {
    // this.car.classList.remove('moove');
    // }, time * 1000);
  }

  public stop(): void {
    const position = window.getComputedStyle(this.car).getPropertyValue('left');
    this.car.style.left = position;
    this.car.classList.remove('moove');
  }
}
