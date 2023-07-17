import './modal-window.css';
import createElement from '../../utils/create-element';

export default class ModalWindow {
  private modalWrapper: HTMLElement;

  private modalWindow: HTMLElement;

  private modalText: HTMLElement;

  private modalBtn: HTMLElement;

  constructor() {
    this.modalWrapper = createElement({
      tagName: 'div',
      classNames: ['modal__wrapper'],
      parentNode: document.body,
    });

    this.modalWindow = createElement({
      tagName: 'div',
      classNames: ['modal'],
      parentNode: this.modalWrapper,
    });

    this.modalText = createElement({
      tagName: 'p',
      classNames: ['modal__text'],
      textContent: 'Hooray! All levels completed!',
    });

    this.modalBtn = createElement({
      tagName: 'div',
      classNames: ['modal__btn'],
      textContent: 'OK',
    });

    this.modalWindow.append(this.modalText, this.modalBtn);
    this.modalBtn.addEventListener('click', () => {
      this.modalWrapper.remove();
    });
  }

  public static show(): void {
    const modal = new ModalWindow();
    document.body.append(modal.modalWrapper);
  }
}
