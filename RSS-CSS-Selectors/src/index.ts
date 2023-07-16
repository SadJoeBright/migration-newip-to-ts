import './global.css';
import levelsData from './data/levelsData';
import createElement from './components/utils/create-element';
import createOpenTag from './components/utils/create-open-tag';
import Table from './components/table/table';
import Markup from './components/markup/markup';
import ModalWindow from './components/modal-window/modal-window';
import CssEditor from './components/css-editor/css-editor';
import SideBar from './components/sidebar/sidebar';
import AppView from './components/appView/appView';

let levelNumber = 1;
const levelsAmount = levelsData.length;

// const MAIN_CONTAINER = createElement({
//   tagName: 'div',
//   classNames: ['main-container'],
//   parentNode: document.body,
// });

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const TABLE = new Table(levelsData, levelNumber, showNotice);

// MAIN_CONTAINER.append(TABLE.table);

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const CSS_EDITOR = new CssEditor(levelsData, levelNumber, checkAnswer);
const { input } = CSS_EDITOR;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const MARKUP = new Markup(TABLE.table, showNotice);

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const SIDEBAR = new SideBar(levelsData, levelNumber, changeLevel);
// document.body.append(SIDEBAR.sidebar);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const view = new AppView(TABLE.table, CSS_EDITOR.editor, MARKUP.markupContainer, SIDEBAR.sidebar);
view.create();

function changeLevel(level: number): void {
  if (SIDEBAR.levelList.querySelector('.level-item_selected')) {
    SIDEBAR.levelList.querySelector('.level-item_selected').classList.remove('level-item_selected');
  }
  SIDEBAR.levelList.children[level - 1].classList.add('level-item_selected');

  (input as HTMLInputElement).value = '';
  CSS_EDITOR.wasHelpUsed = false;
  MARKUP.markupContainer.innerHTML = '';
  TABLE.fillTable(level);
  TABLE.setID(TABLE.table);
  TABLE.markTargets(level);
  MARKUP.insertMarkup(TABLE.table);
  CSS_EDITOR.showInstructions(level);
  CSS_EDITOR.levelNumber = level;

  levelNumber = level;
}

function checkAnswer(): void {
  const targets = TABLE.table.querySelectorAll(levelsData[levelNumber - 1].selector);
  if ((input as HTMLInputElement).value
  && JSON.stringify(TABLE.table.querySelectorAll((input as HTMLInputElement).value.trim()))
  === JSON.stringify(targets)) {
    targets.forEach((target) => {
      target.classList.add('out');
      target.classList.remove('puls');
    });
    SIDEBAR.levelList.children[levelNumber - 1].classList.add('completed');
    if (CSS_EDITOR.wasHelpUsed) {
      SIDEBAR.levelList.children[levelNumber - 1].classList.add('completed-with-help');
    }

    if (SIDEBAR.levelList.querySelectorAll('.completed').length !== levelsAmount && levelNumber !== levelsAmount) {
      setTimeout(() => {
        levelNumber += 1;
        changeLevel(levelNumber);
      }, 500);
    } else if (SIDEBAR.levelList.querySelectorAll('.completed').length === levelsAmount) {
      setTimeout(() => {
        ModalWindow.show();
      }, 500);
    }
  } else {
    TABLE.table.classList.add('shake');
    setTimeout(() => {
      TABLE.table.classList.remove('shake');
    }, 200);
  }
}

function showNotice(event: MouseEvent): void {
  if (event.target !== TABLE.table && event.target !== MARKUP.markupContainer) {
    const targetId: string = (event.target as HTMLHtmlElement).getAttribute('elementId');
    const tableElement: HTMLElement = TABLE.table.querySelector(`[elementId="${targetId}"]`);
    const markUpElement: HTMLElement = MARKUP.markupContainer.querySelector(`[elementId="${targetId}"]`);
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

function saveGameState(): void {
  const levelsState = SIDEBAR.levelList.innerHTML;
  const gameState = {
    levelNumber,
    levelsState,
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState(): void {
  type GameState = {
    levelNumber: number;
    levelsState: string;
  };

  const savedGameState = localStorage.getItem('gameState');
  if (savedGameState) {
    const gameState: GameState = JSON.parse(savedGameState);
    levelNumber = gameState.levelNumber;
    SIDEBAR.levelList.innerHTML = gameState.levelsState;
    changeLevel(levelNumber);
  }
}

document.addEventListener('click', () => input.focus());
window.addEventListener('DOMContentLoaded', loadGameState);
window.addEventListener('beforeunload', saveGameState);
