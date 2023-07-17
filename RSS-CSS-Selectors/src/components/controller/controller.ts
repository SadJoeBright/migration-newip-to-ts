import levelsData from '../../data/levelsData';
import createElement from '../utils/create-element';
import createOpenTag from '../utils/create-open-tag';
import Table from '../view/table/table';
import Markup from '../view/markup/markup';
import ModalWindow from '../view/modal-window/modal-window';
import CssEditor from '../view/css-editor/css-editor';
import SideBar from '../view/sidebar/sidebar';
import AppView from '../view/appView';

export default class Controller {
  TABLE: Table;

  CSS_EDITOR: CssEditor;

  MARKUP: Markup;

  SIDEBAR: SideBar;

  view: AppView;

  levelNumber: number;

  levelsAmount: number;

  constructor() {
    this.levelNumber = 1;
    this.levelsAmount = levelsData.length;

    this.TABLE = new Table(levelsData, this.levelNumber, this.showNotice.bind(this));
    this.CSS_EDITOR = new CssEditor(levelsData, this.levelNumber, this.checkAnswer.bind(this));
    this.MARKUP = new Markup(this.TABLE.table, this.showNotice.bind(this));
    this.SIDEBAR = new SideBar(levelsData, this.levelNumber, this.changeLevel.bind(this));

    document.addEventListener('click', () => this.CSS_EDITOR.input.focus());
    window.addEventListener('DOMContentLoaded', this.loadGameState.bind(this));
    window.addEventListener('beforeunload', this.saveGameState.bind(this));
  }

  private changeLevel(level: number): void {
    if (this.SIDEBAR.levelList.querySelector('.level-item_selected')) {
      this.SIDEBAR.levelList.querySelector('.level-item_selected').classList.remove('level-item_selected');
    }
    this.SIDEBAR.levelList.children[level - 1].classList.add('level-item_selected');

    (this.CSS_EDITOR.input as HTMLInputElement).value = '';
    this.CSS_EDITOR.wasHelpUsed = false;
    this.MARKUP.markupContainer.innerHTML = '';
    this.TABLE.fillTable(level);
    this.TABLE.setID(this.TABLE.table);
    this.TABLE.markTargets(level);
    this.MARKUP.insertMarkup(this.TABLE.table);
    this.CSS_EDITOR.showInstructions(level);
    this.CSS_EDITOR.levelNumber = level;
  }

  private checkAnswer(): void {
    const targets = this.TABLE.table
      .querySelectorAll(levelsData[this.CSS_EDITOR.levelNumber - 1].selector);
    if ((this.CSS_EDITOR.input as HTMLInputElement).value
    && JSON.stringify(this.TABLE.table.querySelectorAll((this.CSS_EDITOR.input as HTMLInputElement)
      .value.trim())) === JSON.stringify(targets)
    ) {
      targets.forEach((target) => {
        target.classList.add('out');
        target.classList.remove('puls');
      });
      this.SIDEBAR.levelList.children[this.CSS_EDITOR.levelNumber - 1].classList.add('completed');
      if (this.CSS_EDITOR.wasHelpUsed) {
        this.SIDEBAR.levelList.children[this.CSS_EDITOR.levelNumber - 1].classList.add('completed-with-help');
      }

      if (
        this.SIDEBAR.levelList.querySelectorAll('.completed').length !== this.levelsAmount
        && this.CSS_EDITOR.levelNumber !== this.levelsAmount
      ) {
        setTimeout(() => {
          this.CSS_EDITOR.levelNumber += 1;
          this.changeLevel(this.CSS_EDITOR.levelNumber);
        }, 500);
      } else if (this.SIDEBAR.levelList.querySelectorAll('.completed').length === this.levelsAmount) {
        setTimeout(() => {
          ModalWindow.show();
        }, 500);
      }
    } else {
      this.TABLE.table.classList.add('shake');
      setTimeout(() => {
        this.TABLE.table.classList.remove('shake');
      }, 200);
    }
  }

  private showNotice(event: MouseEvent): void {
    if (event.target !== this.TABLE.table && event.target !== this.MARKUP.markupContainer) {
      const targetId: string = (event.target as HTMLHtmlElement).getAttribute('elementId');
      const tableElement: HTMLElement = this.TABLE.table.querySelector(`[elementId="${targetId}"]`);
      const markUpElement: HTMLElement = this.MARKUP.markupContainer.querySelector(`[elementId="${targetId}"]`);
      const notice = createElement({
        tagName: 'div',
        classNames: ['notice'],
        textContent: `${createOpenTag(tableElement as HTMLElement)}</${tableElement.tagName.toLowerCase()}>`,
        parentNode: tableElement,
      });
      tableElement.classList.add('hovered');
      markUpElement.classList.add('markup-hovered');
      event.target.addEventListener('mouseout', () => {
        tableElement.classList.remove('hovered');
        markUpElement.classList.remove('markup-hovered');
        notice.remove();
      });
    }
  }

  private saveGameState(): void {
    const levelsState = this.SIDEBAR.levelList.innerHTML;
    const gameState = {
      levelNumber: this.CSS_EDITOR.levelNumber,
      levelsState,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }

  private loadGameState(): void {
    type GameState = {
      levelNumber: number;
      levelsState: string;
    };

    const savedGameState = localStorage.getItem('gameState');
    if (savedGameState) {
      const gameState: GameState = JSON.parse(savedGameState);
      this.CSS_EDITOR.levelNumber = gameState.levelNumber;
      this.SIDEBAR.levelList.innerHTML = gameState.levelsState;
      this.changeLevel(this.CSS_EDITOR.levelNumber);
    }
  }
}
