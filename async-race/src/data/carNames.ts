import { CarNames } from '../types/types';

const carNames: CarNames = {
  brand: ['Mersedes', 'Audi', 'Volkswagen', 'BMW', 'Toyota', 'Skoda', 'Nissan', 'Jeep', 'Mitsubishi', 'Lada'],
  model: ['S600', 'A8', 'Passat', 'M5', 'Camry', 'Octavia', 'Almera', 'GrandCherokee', 'Lancer', 'Vesta'],
};

export default carNames;
// async updateCar() {
//   const selectedCar = this.cars.filter((car) => car.isSelected);
//   if (selectedCar) {
//     selectedCar.forEach(async (car) => {
//       const { id } = car;
//       const name = (this.garageView.textInput as HTMLInputElement).value;
//       const color = (this.garageView.colorInput as HTMLInputElement).value;
//       if (name && color) {
//         await this.api.updateCar({ name, color, id });
//         this.renderGarage(this.currentGaragePage);
//         car.isSelected = false;
//         (this.garageView.textInput as HTMLInputElement).value = '';
//         this.garageView.textInput.setAttribute('placeholder', '');
//       } else {
//         this.garageView.textInput.setAttribute('placeholder', 'please, type in car\'s name');
//       }
//     });
//   } else {
//     this.garageView.textInput.setAttribute('placeholder', 'please, select the car');
//   }
// }
