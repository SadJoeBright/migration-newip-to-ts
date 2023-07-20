import '../../main.css';
import createElement from '../utils/create-element';
import Garage from './garage/garage-view';

export default class AppView {
  controlPanel: HTMLElement;

  viewSwitcher: HTMLElement;

  toGarageBtn: HTMLElement;

  toWinnersBtn: HTMLElement;

  garage: Garage;

  constructor() {
    this.controlPanel = createElement({
      tagName: 'div',
      classNames: ['control-panel'],
    });

    this.viewSwitcher = createElement({
      tagName: 'div',
      classNames: ['view-switcher'],
      parentNode: this.controlPanel,
    });

    this.toGarageBtn = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'TO GARAGE',
      parentNode: this.viewSwitcher,
    });

    this.toWinnersBtn = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'TO WINNERS',
      parentNode: this.viewSwitcher,
    });

    this.garage = new Garage();
  }

  public create(): void {
    document.body.append(this.controlPanel, this.garage.getElement());
  }
}
