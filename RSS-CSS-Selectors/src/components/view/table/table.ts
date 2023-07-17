import './table.css';
import createElement from '../../utils/create-element';
import { Level } from '../../../types/types';

export default class Table {
  public table: HTMLElement;

  private levelsData: Level[];

  private levelNumber: number;

  tableEventHandler: (event: MouseEvent) => void;

  constructor(
    levelsData: Level[],
    levelNumber: number,
    tableEventHandler: (event: MouseEvent) => void,
  ) {
    this.table = createElement({
      tagName: 'div',
      classNames: ['table'],
      eventHandler: (event: Event) => this.tableEventHandler(event as MouseEvent),
      eventType: 'mouseover',
    });

    this.tableEventHandler = tableEventHandler;
    this.levelsData = levelsData;
    this.levelNumber = levelNumber;
    this.fillTable(this.levelNumber);
    this.markTargets(this.levelNumber);
    this.setID(this.table);
  }

  public fillTable(levelNumber: number): void {
    this.table.innerHTML = this.levelsData[levelNumber - 1].boardMarkup;
  }

  public markTargets(levelNumber: number): void {
    const targets = this.table.querySelectorAll(this.levelsData[levelNumber - 1].selector);
    targets.forEach((target) => {
      target.classList.add('puls');
    });
  }

  public setID(element: HTMLElement, startIndex = 0): number {
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
}
