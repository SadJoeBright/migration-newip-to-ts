import AppView from '../view/appView';
import Car from '../car/car';

export default class Controller {
  appView: AppView;

  car: Car;

  cars: Car[] = [];

  constructor() {
    this.appView = new AppView();
    this.appView.createButton.addEventListener('click', this.createCar.bind(this));
    this.appView.updateButton.addEventListener('click', this.updateCar.bind(this));
  }

  createCar() {
    if ((this.appView.textInput as HTMLInputElement).value) {
      const carTitle = (this.appView.textInput as HTMLInputElement).value;
      const carColor = (this.appView.colorInput as HTMLInputElement).value;

      const car = new Car(carColor, carTitle);
      this.appView.garage.getElement().append(car.getCar());

      (this.appView.textInput as HTMLInputElement).value = '';
      this.cars.push(car);
      this.appView.textInput.setAttribute('placeholder', '');
    } else {
      this.appView.textInput.setAttribute('placeholder', 'type in car brand');
      this.appView.textInput.focus();
    }
  }

  updateCar() {
    // if ((this.appView.createTextInput as HTMLInputElement).value) {
    this.cars.forEach((car) => {
      if (car.isSelected) {
        const updatedCar = { ...car };
        const newBrand = (this.appView.textInput as HTMLInputElement).value;
        const newColor = (this.appView.colorInput as HTMLInputElement).value;
        updatedCar.car.children[0].setAttribute('fill', newColor);
        updatedCar.carTitle.textContent = newBrand;
        updatedCar.isSelected = false;
        updatedCar.carTitle.classList.toggle('selected');

        Object.assign(car, updatedCar);
      }
    });
    (this.appView.textInput as HTMLInputElement).value = '';
    // } else {
    // this.appView.createTextInput.setAttribute('placeholder', 'select the car');
    // this.appView.createTextInput.focus();
    // }
  }
}
