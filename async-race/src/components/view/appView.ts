import '../../main.css';
import createElement from '../utils/create-element';
import Garage from './garage/garage-view';

export default class AppView {
  viewSwitcher: HTMLElement;

  toGarageBtn: HTMLElement;

  toWinnersBtn: HTMLElement;

  garage: Garage;

  paginationPanel: HTMLElement;

  prevButton: HTMLElement;

  nextButton: HTMLElement;

  constructor() {
    this.viewSwitcher = createElement({
      tagName: 'div',
      classNames: ['view-switcher'],
    });

    this.toGarageBtn = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'TO GARAGE',
      parentNode: this.viewSwitcher,
      eventHandler: () => this.toGarage(),
      eventType: 'click',
    });

    this.toWinnersBtn = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'TO WINNERS',
      parentNode: this.viewSwitcher,
      eventHandler: () => this.toWinners(),
      eventType: 'click',
    });

    this.garage = new Garage();

    this.paginationPanel = createElement({
      tagName: 'div',
      classNames: ['pagination-panel'],
    });

    this.prevButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'PREV',
      parentNode: this.paginationPanel,
    });

    this.nextButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: ' NEXT',
      parentNode: this.paginationPanel,
    });
  }

  public create(): void {
    document.body.append(
      this.viewSwitcher,
      this.garage.header,
      this.garage.getElement(),
      this.paginationPanel,
    );
  }

  toWinners() {
    this.garage.garage.classList.add('hide');
  }

  toGarage() {
    this.garage.garage.classList.remove('hide');
  }
}
