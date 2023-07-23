/* eslint-disable no-console */
import AppView from '../view/appView';
import Car from '../car/car';
import Api from '../api/api';
import Garage from '../view/garage/garage-view';
import { CarData } from '../../types/types';
import getRandomName from '../utils/getRandomName';
import getRandomColor from '../utils/getRandomColor';
import carNames from '../../data/carNames';

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
    this.garage.createButton.addEventListener('click', this.addCar.bind(this));
    this.garage.updateButton.addEventListener('click', this.updateCar.bind(this));
    this.garage.raceButton.addEventListener('click', this.startRace.bind(this));
    this.appView.nextButton.addEventListener('click', this.newtPage.bind(this));
    this.appView.prevButton.addEventListener('click', this.prevPage.bind(this));
    this.garage.generateButton.addEventListener('click', this.generateCars.bind(this));
  }

  newtPage() {
    this.currentPage += 1;
    this.render(this.currentPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.render(this.currentPage);
    }
  }

  async addCar() {
    const pagesAmount = await this.api.getPagesAmount();
    const carsAmount = await this.api.getCarsAmount();
    const id = carsAmount + 1;
    // if ((this.garage.textInput as HTMLInputElement).value) {
    const name = (this.garage.textInput as HTMLInputElement).value;
    const color = (this.garage.colorInput as HTMLInputElement).value;
    await this.api.createCar({ name, color, id });
    this.garage.title.textContent = `Garage(${carsAmount})`;
    if (this.currentPage === pagesAmount) {
      this.render(this.currentPage);
    }
  }

  renderCar(name: string, color: string, id: number): void {
    const car = new Car(name, color, id);
    car.removeButton.addEventListener('click', this.removeCar.bind(this, car.id));
    car.startButton.addEventListener('click', this.start.bind(this, car.id));
    this.garage.getElement().append(car.getCar());
    this.cars.push(car);
  }

  async render(page: number) {
    this.cars = [];
    const carsAmount = await this.api.getCarsAmount();
    this.garage.title.textContent = `Garage(${carsAmount})`;
    this.garage.pageNumber.textContent = `Page #${this.currentPage}`;
    const carsData = await this.api.getCars(page);
    this.garage.getElement().innerHTML = '';
    carsData.forEach((data: CarData) => {
      const { name } = data;
      const { color } = data;
      const { id } = data;
      this.renderCar(name, color, id);
    });
  }

  async removeCar(id: number) {
    await this.api.deleteCar(id);
    this.render(this.currentPage);
  }

  async generateCars() {
    const pagesAmount = await this.api.getPagesAmount();
    const carsData = await this.api.getCars(pagesAmount);
    const lastCarId = carsData[carsData.length - 1].id;

    const createCarPromises = [];

    for (let id = lastCarId + 1; id <= lastCarId + 100; id += 1) {
      const name = getRandomName(carNames);
      const color = getRandomColor();
      const promise = this.api.createCar({ name, color, id });
      createCarPromises.push(promise);
    }

    await Promise.all(createCarPromises);

    const carsAmount = await this.api.getCarsAmount();

    this.garage.title.textContent = `Garage(${carsAmount})`;
  }

  updateCar() {
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
  }

  async start(id: number) {
    const targetCar = this.cars.filter((car) => car.id === id)[0];
    const data = await this.api.start(id);
    const { velocity } = data;
    const { distance } = data;
    const time = distance / velocity / 1000;
    targetCar.start(time);
    const engineState = await this.api.drive(id);
    if (engineState.status === 500) {
      targetCar.stop();
    }
  }

  async startRace() {
    const promises = this.cars.map((car) => this.start(car.id));
    await Promise.all(promises);
  }
}
