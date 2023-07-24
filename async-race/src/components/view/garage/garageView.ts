import './garage.css';
import createElement from '../../utils/create-element';

export default class GarageView {
  header: HTMLElement;

  garage: HTMLElement;

  controlPanel: HTMLElement;

  controlInput: HTMLElement;

  controlButtons: HTMLElement;

  textInput: HTMLInputElement | HTMLElement;

  colorInput: HTMLElement;

  createButton: HTMLElement;

  updateButton: HTMLElement;

  generateButton: HTMLElement;

  raceButton: HTMLElement;

  resetButton: HTMLElement;

  title: HTMLElement;

  pageNumber: HTMLElement;

  winnerMessage: HTMLElement;

  constructor() {
    this.header = createElement({
      tagName: 'header',
      classNames: ['garage'],
    });

    this.controlPanel = createElement({
      tagName: 'div',
      classNames: ['control-panel'],
      parentNode: this.header,
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

    this.title = createElement({
      tagName: 'h2',
      classNames: ['garage__title'],
      parentNode: this.header,
    });

    this.pageNumber = createElement({
      tagName: 'p',
      classNames: ['garage__page-number'],
      parentNode: this.header,
    });

    this.winnerMessage = createElement({
      tagName: 'p',
      classNames: ['winner-massage', 'winner-massage_visible'],
      parentNode: this.header,
    });

    this.garage = createElement({
      tagName: 'div',
      classNames: ['garage'],
    });

    this.textInput.focus();
  }

  public showWinner() {
    this.winnerMessage.classList.add('winner-massage_visible');
  }

  public hideWinner() {
    this.winnerMessage.classList.remove('winner-massage_visible');
  }
}
