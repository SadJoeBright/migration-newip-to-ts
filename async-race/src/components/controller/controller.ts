/* eslint-disable no-console */
import AppView from '../view/appView';
import Car from '../car/car';
import Api from '../api/api';
import GarageView from '../view/garage/garageView';
import { CarData } from '../../types/types';
import getRandomName from '../utils/getRandomName';
import getRandomColor from '../utils/getRandomColor';
import carNames from '../../data/carNames';
import WinnerView from '../winnerView/winnerView';

export default class Controller {
  currentPage: number;

  api: Api;

  appView: AppView;

  car: Car;

  garageView: GarageView;

  winnerView: WinnerView;

  cars: Car[] = [];

  finishedCars:Car[] = [];

  private winner: Car | null = null;

  private boundDefineWinner = this.defineWinner.bind(this);

  constructor() {
    this.currentPage = 1;
    this.api = new Api();
    this.appView = new AppView();
    this.garageView = this.appView.garageView;
    this.appView.nextButton.addEventListener('click', this.newtPage.bind(this));
    this.appView.prevButton.addEventListener('click', this.prevPage.bind(this));
    this.garageView.createButton.addEventListener('click', this.addCar.bind(this));
    this.garageView.updateButton.addEventListener('click', this.updateCar.bind(this));
    this.garageView.raceButton.addEventListener('click', this.startRace.bind(this));
    this.garageView.generateButton.addEventListener('click', this.generateCars.bind(this));
    this.garageView.resetButton.addEventListener('click', this.reset.bind(this));
    this.render(this.currentPage);
  }

  private defineWinner(event: AnimationEvent):void {
    this.garageView.garage.removeEventListener('animationend', this.boundDefineWinner);
    this.winner = this.cars.find((car) => event.target === car.car);
    this.winnerView = new WinnerView(this.garageView.header);
    this.winnerView.winnerMessage.textContent = `${this.winner.name} wins with time ${this.winner.time}s`;
  }

  private newtPage(): void {
    this.currentPage += 1;
    this.render(this.currentPage);
  }

  private prevPage(): void {
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
    const name = (this.garageView.textInput as HTMLInputElement).value;
    const color = (this.garageView.colorInput as HTMLInputElement).value;
    await this.api.createCar({ name, color, id });
    this.garageView.title.textContent = `Garage(${carsAmount})`;
    if (this.currentPage === pagesAmount) {
      this.render(this.currentPage);
    }
  }

  private renderCar(name: string, color: string, id: number): void {
    const car = new Car(name, color, id);
    car.removeButton.addEventListener('click', this.removeCar.bind(this, car.id));
    car.startButton.addEventListener('click', this.start.bind(this, car.id));
    car.stopButton.addEventListener('click', this.stop.bind(this, car.id));
    this.garageView.garage.append(car.getCar());
    this.cars.push(car);
  }

  async render(page: number) {
    this.cars = [];
    const carsAmount = await this.api.getCarsAmount();
    this.garageView.title.textContent = `Garage(${carsAmount})`;
    this.garageView.pageNumber.textContent = `Page #${this.currentPage}`;
    const carsData = await this.api.getCars(page);
    this.garageView.garage.innerHTML = '';
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

    this.garageView.title.textContent = `Garage(${carsAmount})`;
  }

  updateCar() {
    this.cars.forEach((car) => {
      if (car.isSelected) {
        const updatedCar = { ...car };
        const newBrand = (this.garageView.textInput as HTMLInputElement).value;
        const newColor = (this.garageView.colorInput as HTMLInputElement).value;
        updatedCar.car.children[0].setAttribute('fill', newColor);
        updatedCar.carTitle.textContent = newBrand;
        updatedCar.isSelected = false;
        updatedCar.carTitle.classList.toggle('selected');

        Object.assign(car, updatedCar);
      }
    });
    (this.garageView.textInput as HTMLInputElement).value = '';
  }

  async start(id: number) {
    const targetCar = this.cars.filter((car) => car.id === id)[0];
    const data = await this.api.start(id);
    const { velocity } = data;
    const { distance } = data;
    const time = Number(Number(distance / velocity / 1000).toFixed(2));
    targetCar.time = time;
    targetCar.startAnimation(time);
    const engineState = await this.api.drive(id);
    if (engineState.status === 500) {
      targetCar.stopAnimation();
    }
  }

  async stop(id: number) {
    const targetCar = this.cars.filter((car) => car.id === id)[0];
    await this.api.stop(id);
    targetCar.getCarBack();
  }

  private async startRace() {
    this.garageView.garage.addEventListener('animationend', this.boundDefineWinner);
    const promises = this.cars.map((car) => this.start(car.id));
    await Promise.all(promises);
  }

  async reset() {
    this.winnerView.hide();
    const promises = this.cars.map((car) => this.stop(car.id));
    await Promise.all(promises);
  }

  // private showWinner(id: number) {

  // }
}
