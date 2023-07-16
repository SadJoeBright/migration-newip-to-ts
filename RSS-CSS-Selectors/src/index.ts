import './global.css';
import levels from './data/levels';
import createElement from './components/utils/create-element';
import createOpenTag from './components/utils/create-open-tag';
import Table from './components/table/table';
import Markup from './components/markup/markup';
import ModalWindow from './components/modal-window/modal-window';
import CssEditor from './components/css-editor/css-editor';
import SideBar from './components/sidebar/sidebar';

let levelNumber = 1;
const levelsAmount = levels.length;

const MAIN_CONTAINER = createElement({
  tagName: 'div',
  classNames: ['main-container'],
  parentNode: document.body,
});

const TABLE = new Table(levels, levelNumber);

MAIN_CONTAINER.append(TABLE.table);

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const CSS_EDITOR = new CssEditor(levels, levelNumber, checkAnswer);
const { input } = CSS_EDITOR;

const MARKUP = new Markup(TABLE.table);

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const SIDEBAR = new SideBar(levels, levelNumber, changeLevel);
document.body.append(SIDEBAR.sidebar);

function changeLevel(level: number): void {
  levelNumber = level;
  if (SIDEBAR.levelList.querySelector('.level-item_selected')) {
    SIDEBAR.levelList.querySelector('.level-item_selected').classList.remove('level-item_selected');
  }
  SIDEBAR.levelList.children[level - 1].classList.add('level-item_selected');

  (input as HTMLInputElement).value = '';
  CSS_EDITOR.wasHelpUsed = false;
  MARKUP.container.innerHTML = '';
  TABLE.fillTable(level);
  TABLE.setID(TABLE.table);
  TABLE.markTargets(level);
  MARKUP.insertMarkUp(TABLE.table);
  CSS_EDITOR.showInstructions(level);
  CSS_EDITOR.levelNumber = level;
}

function checkAnswer(): void {
  const targets = TABLE.table.querySelectorAll(levels[levelNumber - 1].selector);
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
  if (event.target !== TABLE.table && event.target !== MARKUP.container) {
    const targetId: string = (event.target as HTMLHtmlElement).getAttribute('elementId');
    const tableElement: HTMLElement = TABLE.table.querySelector(`[elementId="${targetId}"]`);
    const markUpElement: HTMLElement = MARKUP.container.querySelector(`[elementId="${targetId}"]`);
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
TABLE.table.addEventListener('mouseover', showNotice);
MARKUP.container.addEventListener('mouseover', showNotice);
input.addEventListener('keydown', (event: Event) => {
  const keyboardEvent = event as KeyboardEvent;
  if (keyboardEvent.key === 'Enter') {
    checkAnswer();
  }
});

window.addEventListener('DOMContentLoaded', loadGameState);
window.addEventListener('beforeunload', saveGameState);
