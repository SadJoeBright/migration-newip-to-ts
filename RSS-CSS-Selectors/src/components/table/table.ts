/* eslint-disable no-console */
import './table.css';
import createElement from '../utils/create-element';
import levels from '../../data/levels';

const currentLevel = 3;
export default class Table {
  table: HTMLElement;

  constructor() {
    this.table = createElement({
      tagName: 'div',
      classNames: ['table'],
    });
    this.fillTable();
    this.setID(this.table);
    this.getElement();
  }

  private fillTable(): void {
    const markUp = levels[currentLevel - 1].boardMarkup;
    this.table.insertAdjacentHTML('afterbegin', markUp);
  }

  private setID(element: HTMLElement, startIndex = 0): number {
    const children = [...element.childNodes];
    let currentIndex = startIndex;

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i] as HTMLElement;
      if (child.nodeType === Node.ELEMENT_NODE) {
        child.setAttribute('elementId', currentIndex as unknown as string);
        currentIndex += 1;

        if (child.hasChildNodes()) {
          currentIndex = this.setID(child, currentIndex);
        }
      }
    }

    return currentIndex;
  }

  public getElement() {
    return this;
  }
}
