/* eslint-disable no-console */
import { CarData, EngineResponce } from '../../types/types';

export default class Api {
  pageNumber: number;

  baseURL: string;

  carsPerPageLimit: number;

  constructor() {
    // this.pageNumber = pageNumber;
    this.carsPerPageLimit = 7;
    this.baseURL = 'http://127.0.0.1:3000';
    // this.getCars(this.pageNumber);
    // this.startEngine();
    // this.drive();
  }

  async createCar(carData: CarData) {
    const response = await fetch(`${this.baseURL}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    const data = await response.json();
    return data;
  }

  async getCars(page: number): Promise<CarData[]> {
    const response = await fetch(`${this.baseURL}/garage?_page=${page}&_limit=${this.carsPerPageLimit}`);
    const data: CarData[] = await response.json();
    return data;
  }

  async getCarsAmount() {
    const response = await fetch(`${this.baseURL}/garage?_limit=${this.carsPerPageLimit}`);
    const carsAmount = Number(response.headers.get('X-Total-Count'));
    return carsAmount;
  }

  async getPagesAmount() {
    return Math.ceil(await this.getCarsAmount() / this.carsPerPageLimit);
  }

  async deleteCar(id: number) {
    const response = await fetch(`${this.baseURL}/garage/${id}`, {
      method: 'DELETE',
    });
    return response;
  }

  async start(id: number): Promise<EngineResponce> {
    const response = await fetch(`${this.baseURL}/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const data = await response.json();
    // console.log(data);
    return data;
  }

  // async createCar() {
  //   let response;
  //   try {
  //     response = await fetch(this.baseURL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(carData)
  //     });
  //     const data = await response.json();
  //     return data;
  //   }
  // }

  // async startEngine() {
  //   const response = await fetch(`${this.baseURL}/engine?id=1&status=started`, {
  //     method: 'PATCH',
  //   });
  //   const data = await response.json();
  //   const { velocity } = data;
  //   const { distance } = data;
  //   const time = distance / velocity / 1000;
  //   console.log(time);
  // }

  // async drive() {
  //   await this.startEngine();

  //   const response = await fetch(`${this.baseURL}/engine?id=1&status=drive`, {
  //     method: 'PATCH',
  //   });

  //   if (response.status === 500) {
  //     console.log('STOP');
  //   } else {
  //     console.log('GO');
  //   }
  // }
}

// async function addCar(carData: { name: string; brand: string; year: number; }) {
//   try {
//     const response = await fetch(URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(carData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to add car to the server.');
//     }

//     const data = await response.json();
//     console.log('New car added:', data);
//   } catch (error) {
//     console.error('Error while adding car:');
//   }
// }

// // Пример данных для нового объекта
// const newCarData = {
//   name: 'New Car',
//   brand: 'Some Brand',
//   year: 2023,
//   // Другие свойства объекта, если есть
// };

// // Вызываем функцию для добавления нового объекта
// addCar(newCarData);
