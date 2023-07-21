import '../../main.css';
import createElement from '../utils/create-element';
import Garage from './garage/garage-view';

export default class AppView {
  controlPanel: HTMLElement;

  viewSwitcher: HTMLElement;

  toGarageBtn: HTMLElement;

  toWinnersBtn: HTMLElement;

  controlButtons: HTMLElement;

  garage: Garage;

  paginationPanel: HTMLElement;

  prevButton: HTMLElement;

  nextButton: HTMLElement;

  controlInput: HTMLElement;

  textInput: HTMLInputElement | HTMLElement;

  colorInput: HTMLElement;

  createButton: HTMLElement;

  updateButton: HTMLElement;

  generateButton: HTMLElement;

  raceButton: HTMLElement;

  resetButton: HTMLElement;

  constructor() {
    this.viewSwitcher = createElement({
      tagName: 'div',
      classNames: ['view-switcher'],
      // parentNode: this.controlPanel,
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

    this.controlPanel = createElement({
      tagName: 'div',
      classNames: ['control-panel'],
      parentNode: this.garage.garage,
    });

    this.controlInput = createElement({
      tagName: 'div',
      classNames: ['control-input'],
      parentNode: this.controlPanel,
    });

    this.textInput = createElement({
      tagName: 'input',
      classNames: ['text-input'],
      parentNode: this.controlInput,
    });
    this.textInput.setAttribute('type', 'text');

    this.colorInput = createElement({
      tagName: 'input',
      classNames: ['color-input'],
      parentNode: this.controlInput,

    });
    this.colorInput.setAttribute('type', 'color');

    this.controlButtons = createElement({
      tagName: 'div',
      classNames: ['control-buttons'],
      parentNode: this.controlPanel,
    });

    this.createButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'CREATE',
      parentNode: this.controlButtons,
    });

    this.updateButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'UPDATE',
      parentNode: this.controlButtons,
    });

    this.generateButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'GENERATE CARS',
      parentNode: this.controlButtons,
    });

    this.raceButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'RACE',
      parentNode: this.controlButtons,
    });

    this.resetButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'RESET',
      parentNode: this.controlButtons,
    });

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
    document.body.append(this.viewSwitcher, this.garage.getElement(), this.paginationPanel);
    this.textInput.focus();
  }

  toWinners() {
    this.garage.garage.classList.add('hide');
  }

  toGarage() {
    this.garage.garage.classList.remove('hide');
  }
}
