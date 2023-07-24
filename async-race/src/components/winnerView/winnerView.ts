import createElement from '../utils/create-element';

export default class WinnerView {
  parentNode: HTMLElement;

  winnerMessage: HTMLElement;

  constructor(parentNode: HTMLElement) {
    this.parentNode = parentNode;

    this.winnerMessage = createElement({
      tagName: 'p',
      classNames: ['winner-massage'],
      parentNode: this.parentNode,
    });
  }

  public hide() {
    this.winnerMessage.remove();
  }
}
