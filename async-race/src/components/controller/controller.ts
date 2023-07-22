/* eslint-disable no-console */
import AppView from '../view/appView';
import Car from '../car/car';
import Api from '../api/api';
import Garage from '../view/garage/garage-view';
import { CarData } from '../../types/types';

export default class Controller {
  currentPage: number;

  api: Api;

  appView: AppView;

  car: Car;

  garage: Garage;

  cars: Car[] = [];

  constructor() {
    this.currentPage = 1;
    this.api = new Api();
    this.render(this.currentPage);
    this.appView = new AppView();
    this.garage = this.appView.garage;
    this.garage.createButton.addEventListener('click', this.createCar.bind(this));
    this.garage.updateButton.addEventListener('click', this.updateCar.bind(this));
    this.garage.raceButton.addEventListener('click', this.startRace.bind(this));
    this.appView.nextButton.addEventListener('click', this.newtPage.bind(this));
    this.appView.prevButton.addEventListener('click', this.prevPage.bind(this));
  }

  newtPage() {
    this.garage.getElement().innerHTML = '';
    this.currentPage += 1;
    this.render(this.currentPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.garage.getElement().innerHTML = '';
      this.currentPage -= 1;
      this.render(this.currentPage);
    }
  }

  createCar() {
    if ((this.garage.textInput as HTMLInputElement).value) {
      const carTitle = (this.garage.textInput as HTMLInputElement).value;
      const carColor = (this.garage.colorInput as HTMLInputElement).value;

      const car = new Car(carTitle, carColor);
      this.appView.garage.getElement().append(car.getCar());

      (this.garage.textInput as HTMLInputElement).value = '';
      this.cars.push(car);
      this.garage.textInput.setAttribute('placeholder', '');
    } else {
      this.garage.textInput.setAttribute('placeholder', 'type in car brand');
      this.garage.textInput.focus();
    }
  }

  async render(page: number) {
    const carsAmount = await this.api.getCarsAmount();
    this.garage.title.textContent = `Garage(${carsAmount})`;
    this.garage.pageNumber.textContent = `Page #${this.currentPage}`;
    const carsData = await this.api.getCars(page);
    carsData.forEach((data: CarData) => {
      const { name } = data;
      const { color } = data;
      const car = new Car(name, color);
      this.garage.getElement().append(car.getCar());
    });
    console.log(carsData);
  }

  updateCar() {
    // if ((this.appView.createTextInput as HTMLInputElement).value) {
    this.cars.forEach((car) => {
      if (car.isSelected) {
        const updatedCar = { ...car };
        const newBrand = (this.garage.textInput as HTMLInputElement).value;
        const newColor = (this.garage.colorInput as HTMLInputElement).value;
        updatedCar.car.children[0].setAttribute('fill', newColor);
        updatedCar.carTitle.textContent = newBrand;
        updatedCar.isSelected = false;
        updatedCar.carTitle.classList.toggle('selected');

        Object.assign(car, updatedCar);
      }
    });
    (this.garage.textInput as HTMLInputElement).value = '';
  // } else {
  // this.appView.createTextInput.setAttribute('placeholder', 'select the car');
  // this.appView.createTextInput.focus();
  // }
  }

  startRace() {
    this.cars.forEach((car) => {
      car.start();
    });
  }
}
