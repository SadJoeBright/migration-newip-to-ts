import './sidebar.css';
import createElement from '../../utils/create-element';
import { Level } from '../../../types/types';

export default class SideBar {
  levelNumber: number;

  levelsData: Level[];

  sidebar: HTMLElement;

  asideTitle: HTMLElement;

  levelList: HTMLElement;

  restartButton: HTMLElement;

  changeLevelFunction: (levelNumber: number) => void;

  constructor(
    levelsData: Level[],
    levelNumber: number,
    changeLevelFunction: (levelNumber: number) => void,
  ) {
    this.levelsData = levelsData;
    this.levelNumber = levelNumber;
    this.changeLevelFunction = changeLevelFunction;

    this.sidebar = createElement({
      tagName: 'aside',
      classNames: ['aside'],
    });

    this.asideTitle = createElement({
      tagName: 'h2',
      classNames: ['aside__title'],
      textContent: 'Levels',
      parentNode: this.sidebar,
    });

    this.levelList = createElement({
      tagName: 'div',
      classNames: ['aside__level-list'],
      parentNode: this.sidebar,
      eventHandler: (event: Event) => this.chooseLevel(event as MouseEvent),
      eventType: 'click',
    });

    this.restartButton = createElement({
      tagName: 'div',
      classNames: ['restart-btn'],
      textContent: 'Restart',
      parentNode: this.sidebar,
      eventHandler: this.restartGame.bind(this),
      eventType: 'click',
    });
    this.fillLevelList();
  }

  private fillLevelList(): void {
    for (let i = 0; i < this.levelsData.length; i += 1) {
      const levelItem = createElement({
        tagName: 'div',
        classNames: ['level-item'],
        textContent: `${i + 1}`,
      });
      this.levelList.append(levelItem);
    }
  }

  private chooseLevel(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.parentNode === this.levelList) {
      if (this.levelList.querySelector('.level-item_selected')) {
        this.levelList.querySelector('.level-item_selected').classList.remove('level-item_selected');
      }
      target.classList.add('level-item_selected');
      this.levelNumber = Number(target.textContent);
      this.changeLevelFunction(this.levelNumber);
    }
  }

  private restartGame = (): void => {
    this.levelNumber = 1;
    this.changeLevelFunction(this.levelNumber);
    [...this.levelList.children].forEach((child: Element) => {
      child.classList.remove('completed', 'completed-with-help');
    });
  };
}
