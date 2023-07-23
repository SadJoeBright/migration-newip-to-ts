/* eslint-disable no-console */
import { CarData, EngineResponce } from '../../types/types';

export default class Api {
  private baseURL: string;

  private carsPerPageLimit: number;

  constructor() {
    this.baseURL = 'http://127.0.0.1:3000';
    this.carsPerPageLimit = 7;
  }

  async createCar(carData: CarData): Promise<CarData> {
    const response = await fetch(`${this.baseURL}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    const data: CarData = await response.json();

    return data;
  }

  public async getCars(page: number): Promise<CarData[]> {
    const response = await fetch(`${this.baseURL}/garage?_page=${page}&_limit=${this.carsPerPageLimit}`);
    const data: CarData[] = await response.json();

    return data;
  }

  public async getCarsAmount(): Promise<number> {
    const response = await fetch(`${this.baseURL}/garage?_limit=${this.carsPerPageLimit}`);
    const carsAmount = Number(response.headers.get('X-Total-Count'));

    return carsAmount;
  }

  public async getPagesAmount() {
    return Math.ceil(await this.getCarsAmount() / this.carsPerPageLimit);
  }

  public async deleteCar(id: number): Promise<Response> {
    const response = await fetch(`${this.baseURL}/garage/${id}`, {
      method: 'DELETE',
    });

    return response;
  }

  public async start(id: number): Promise<EngineResponce> {
    const response = await fetch(`${this.baseURL}/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const data: EngineResponce = await response.json();

    return data;
  }

  public async drive(id: number): Promise<Response> {
    const response = await fetch(`${this.baseURL}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });

    return response;
  }

  public async stop(id: number): Promise<Response> {
    const response = await fetch(`${this.baseURL}/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });

    return response;
  }
}
