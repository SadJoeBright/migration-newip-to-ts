import '../../main.css';
import createElement from '../utils/create-element';
import GarageView from './garage/garageView';
import WinnersView from './winners/winnersView';

export default class AppView {
  viewSwitcher: HTMLElement;

  toGarageBtn: HTMLElement;

  toWinnersBtn: HTMLElement;

  garageView: GarageView;

  winnersView: WinnersView;

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

    this.garageView = new GarageView();
    this.winnersView = new WinnersView();
  }

  public create(): void {
    document.body.append(
      this.viewSwitcher,
      this.garageView.mainContainer,
      this.winnersView.mainContainer,
    );
  }

  toWinners() {
    this.garageView.mainContainer.classList.add('hide');
    this.winnersView.mainContainer.classList.remove('hide');
  }

  toGarage() {
    this.winnersView.mainContainer.classList.add('hide');
    this.garageView.mainContainer.classList.remove('hide');
  }
}
