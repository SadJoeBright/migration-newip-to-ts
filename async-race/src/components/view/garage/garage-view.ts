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
    this.addCar();
  }

  public addCar() {
    this.car = new Car('Mersedes', 'S500', 'red');
    this.garage.append(this.car.getCar());
    this.car = new Car('Mersedes', 'S500', 'red');
    this.garage.append(this.car.getCar());
    this.car = new Car('Mersedes', 'S500', 'red');
    this.garage.append(this.car.getCar());
    this.car = new Car('Mersedes', 'S500', 'red');
    this.garage.append(this.car.getCar());
    this.car = new Car('Mersedes', 'S500', 'red');
    this.garage.append(this.car.getCar());
    this.car = new Car('Mersedes', 'S500', 'red');
    this.garage.append(this.car.getCar());
    this.car = new Car('Mersedes', 'S500', 'red');
    this.garage.append(this.car.getCar());
  }

  public getElement() {
    return this.garage;
  }
}
