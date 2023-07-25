/* eslint-disable no-console */
import AppView from '../view/appView';
import Car from '../car/car';
import Api from '../api/api';
import GarageView from '../view/garage/garageView';
import { CarData } from '../../types/types';
import getRandomName from '../utils/getRandomName';
import getRandomColor from '../utils/getRandomColor';
import carNames from '../../data/carNames';
import WinnersView from '../view/winners/winnersView';
import createElement from '../utils/create-element';
import svgCode from '../../data/svgCode';

export default class Controller {
  currentGaragePage: number;

  currentWinnersPage: number;

  api: Api;

  appView: AppView;

  car: Car;

  garageView: GarageView;

  winnersView: WinnersView;

  cars: Car[] = [];

  private winner: Car | null = null;

  private boundDefineWinner = this.defineWinner.bind(this);

  constructor() {
    this.currentGaragePage = 1;
    this.currentWinnersPage = 1;
    this.api = new Api();
    this.appView = new AppView();
    this.winnersView = this.appView.winnersView;
    this.appView.toWinnersBtn.addEventListener('click', this.renderWinners.bind(this, this.currentWinnersPage));
    this.garageView = this.appView.garageView;
    this.garageView.nextButton.addEventListener('click', this.nextGaragePage.bind(this));
    this.garageView.prevButton.addEventListener('click', this.prevgGaragePage.bind(this));
    this.garageView.createButton.addEventListener('click', this.addCar.bind(this));
    this.garageView.updateButton.addEventListener('click', this.updateCar.bind(this));
    this.garageView.raceButton.addEventListener('click', this.startRace.bind(this));
    this.garageView.generateButton.addEventListener('click', this.generateCars.bind(this));
    this.garageView.resetButton.addEventListener('click', this.reset.bind(this));
    this.winnersView.nextButton.addEventListener('click', this.nextWinnersPage.bind(this));
    this.winnersView.prevButton.addEventListener('click', this.prevWinnersPage.bind(this));
    this.renderGarage(this.currentGaragePage);
  }

  private async nextGaragePage() {
    const pagesAmount = await this.api.getCarsPagesAmount();
    if (this.currentGaragePage < pagesAmount) {
      this.currentGaragePage += 1;
      this.renderGarage(this.currentGaragePage);
    }
  }

  private prevgGaragePage(): void {
    if (this.currentGaragePage > 1) {
      this.currentGaragePage -= 1;
      this.renderGarage(this.currentGaragePage);
    }
  }

  private async nextWinnersPage() {
    const pagesAmount = await this.api.getWinnersPagesAmount();
    if (this.currentWinnersPage < pagesAmount) {
      this.currentWinnersPage += 1;
      this.renderWinners(this.currentWinnersPage);
    }
  }

  private prevWinnersPage() {
    if (this.currentWinnersPage > 1) {
      this.currentWinnersPage -= 1;
      this.renderWinners(this.currentWinnersPage);
    }
  }

  async addCar() {
    const pagesAmount = await this.api.getCarsPagesAmount();
    const carsAmount = await this.api.getCarsAmount();
    const allCars = await this.api.getCars(pagesAmount);
    const id = allCars[allCars.length - 1].id + 1;
    const name = (this.garageView.textInput as HTMLInputElement).value;
    const color = (this.garageView.colorInput as HTMLInputElement).value;
    await this.api.createCar({ name, color, id });
    this.garageView.title.textContent = `Garage(${carsAmount})`;
    if (this.currentGaragePage === pagesAmount) {
      this.renderGarage(this.currentGaragePage);
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

  private async renderGarage(page: number) {
    this.cars = [];
    const carsAmount = await this.api.getCarsAmount();
    this.garageView.title.textContent = `Garage(${carsAmount})`;
    this.garageView.pageNumber.textContent = `Page #${this.currentGaragePage}`;
    const carsData = await this.api.getCars(page);
    this.garageView.garage.innerHTML = '';
    carsData.forEach((data: CarData) => {
      const { name, color, id } = data;
      this.renderCar(name, color, id);
    });
  }

  async renderWinners(page: number) {
    const winners = await this.api.getWinners(page);
    const winnersAmount = await this.api.getWinnersAmount();
    this.winnersView.title.textContent = `Winners (${winnersAmount})`;
    this.winnersView.pageNumber.textContent = `Page #${this.currentWinnersPage}`;
    this.winnersView.chartBody.innerHTML = '';
    winners.forEach(async (winner, index) => {
      const line = createElement({
        tagName: 'div',
        classNames: ['chart__line'],
        parentNode: this.winnersView.chartBody,
      });

      const number = createElement({
        tagName: 'div',
        classNames: ['chart__column', 'chart__number'],
        textContent: `${index + 1}`,
      });

      const car = createElement({
        tagName: 'div',
        classNames: ['chart__column'],
      });
      const carData = await this.api.getCar(winner.id);
      const { color } = carData;
      car.innerHTML = svgCode;
      car.children[0].setAttribute('fill', color);
      car.children[0].setAttribute('width', '38px');
      car.children[0].setAttribute('height', '16px');
      const carName = carData.name;

      const name = createElement({
        tagName: 'div',
        classNames: ['chart__column', 'chart__name'],
        textContent: `${carName}`,
      });
      const wins = createElement({
        tagName: 'div',
        classNames: ['chart__column'],
        textContent: `${winner.wins}`,
      });
      const bestTime = createElement({
        tagName: 'div',
        classNames: ['chart__column'],
        textContent: `${winner.time}`,
      });

      line.append(number, car, name, wins, bestTime);
    });
  }

  async removeCar(id: number) {
    await this.api.deleteCar(id);
    const allWinners = await this.api.getWinners();
    if (allWinners.some((winner) => winner.id === id)) {
      this.api.deleteWinner(id);
    }
    this.renderGarage(this.currentGaragePage);
  }

  async generateCars() {
    const pagesAmount = await this.api.getCarsPagesAmount();
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

  private async reset() {
    this.garageView.hideWinner();
    const promises = this.cars.map((car) => this.stop(car.id));
    await Promise.all(promises);
  }

  private async defineWinner(event: AnimationEvent): Promise<void> {
    this.garageView.garage.removeEventListener('animationend', this.boundDefineWinner);
    this.winner = this.cars.find((car) => event.target === car.car);
    this.winner.wins += 1;
    this.garageView.winnerMessage.textContent = `${this.winner.name} wins with time ${this.winner.time}s`;
    await this.addWinner();
    this.garageView.showWinner();
  }

  private async addWinner() {
    const allWinners = await this.api.getWinners();
    const { id, wins, time } = this.winner;
    if (allWinners.some((winner) => winner.id === id && time < winner.time)) {
      await this.api.updateWinner({ id, wins, time });
    } else {
      await this.api.createWinner({ id, wins, time });
    }
  }
}
