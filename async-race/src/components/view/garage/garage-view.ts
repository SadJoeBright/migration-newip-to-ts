import './garage.css';
import Car from '../../car/car';
import createElement from '../../utils/create-element';

export default class Garage {
  car: Car;

  garage: HTMLElement;

  constructor() {
    this.garage = createElement({
      tagName: 'div',
      classNames: ['garage'],
    });
  }

  public getElement() {
    return this.garage;
  }
}
