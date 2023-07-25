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

  isStopped: boolean;

  time: number | null;

  id: number;

  wins: number;

  constructor(name: string, color: string, id: number) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.isSelected = false;
    this.isStopped = true;
    this.time = null;
    this.wins = 0;

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
      eventType: 'click',
    });

    this.stopButton = createElement({
      tagName: 'div',
      classNames: ['button_stop', 'button_disabled'],
      textContent: 'STOP',
      parentNode: this.engineControl,
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

  public startAnimation(time: number): void {
    this.car.style.animationDuration = `${time}s`;
    this.car.classList.add('moove');
  }

  public stopAnimation(): void {
    const position = window.getComputedStyle(this.car).getPropertyValue('left');
    this.car.style.left = position;
    this.car.classList.remove('moove');
  }

  public getCarBack(): void {
    this.car.classList.remove('moove');
    this.car.style.left = '90px';
  }

  // public disable(event): void {
  //   event.target.classList.add('disabled')
  // }
}
