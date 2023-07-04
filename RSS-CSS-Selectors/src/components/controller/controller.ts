import table from '../table/table';
import { markupSection } from '../editor/editor';
import levels from '../../data/levels';

const currentLevel = 3;

export default class Controller {
  table: HTMLElement;

  constructor() {
    this.fillTable();
    this.table = table;
    this.insertMarkUp(table);
  }

  public fillTable(): void {
    const markUp = levels[currentLevel - 1].boardMarkup;
    table.insertAdjacentHTML('afterbegin', markUp);
  }

  public insertMarkUp(element: HTMLElement, intent = '', parent = markupSection): void {
    [...element.children].forEach((child) => {
      const line = document.createElement('div');
      line.classList.add('line');
      const elementId = child.getAttribute('elementId');
      line.setAttribute('elementId', elementId);
      line.textContent = `${intent}<${child.tagName.toLowerCase()} class="${[...child.classList].join(' ')}"></${child.tagName.toLowerCase()}>`;
      parent.append(line);
      if (child.hasChildNodes()) {
        this.insertMarkUp(child as HTMLElement, '   ', line);
      }
    });
  }
}

// function insertMarkUp(element: HTMLElement, intent = '', parent = markupSection): void {
//   [...element.children].forEach((child) => {
//     const line = document.createElement('div');
//     line.classList.add('line');
//     const elementId = child.getAttribute('elementId');
//     line.setAttribute('elementId', elementId);
// eslint-disable-next-line max-len
//     line.textContent = `${intent}<${child.tagName.toLowerCase()} class="${[...child.classList].join(' ')}"></${child.tagName.toLowerCase()}>`;
//     parent.append(line);
//     if (child.hasChildNodes()) {
//       insertMarkUp(child as HTMLElement, '   ', line);
//     }
//   });
// }

// insertMarkUp(table);
