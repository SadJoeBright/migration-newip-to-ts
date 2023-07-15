import './global.css';
import levels from './data/levels';
import createElement from './components/utils/create-element';
import createOpenTag from './components/utils/create-open-tag';
import Table from './components/table/table';
import Markup from './components/markup/markup';
import ModalWindow from './components/modal-window/modal-window';
import CssEditor from './components/css-editor/css-editor';

const levelList: HTMLElement = document.querySelector('.level-list');
const restartButton: HTMLElement = document.querySelector('.restart-btn');

let currentLevel = 1;
const levelsAmount = levels.length;

const MAIN_CONTAINER = createElement({
  tagName: 'div',
  classNames: ['main-container'],
  parentNode: document.body,
});

const TABLE = new Table(levels, currentLevel);

MAIN_CONTAINER.append(TABLE.table);

const CSS_EDITOR = new CssEditor(levels, currentLevel);
const { input } = CSS_EDITOR;

const MARKUP = new Markup(TABLE.table);

function changeLevel(level: number): void {
  if (levelList.querySelector('.level-item_selected')) {
    levelList.querySelector('.level-item_selected').classList.remove('level-item_selected');
  }
  levelList.children[level - 1].classList.add('level-item_selected');

  CSS_EDITOR.wasHelpUsed = false;
  MARKUP.container.innerHTML = '';
  TABLE.fillTable(level);
  TABLE.setID(TABLE.table);
  TABLE.markTargets(level);
  MARKUP.insertMarkUp(TABLE.table);
  CSS_EDITOR.showInstructions(level);
  CSS_EDITOR.levelNumber = level;
}

function chooseLevel(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  if (target.parentNode === levelList) {
    if (levelList.querySelector('.level-item_selected')) {
      levelList.querySelector('.level-item_selected').classList.remove('level-item_selected');
    }
    target.classList.add('level-item_selected');
    currentLevel = Number(target.textContent);
    changeLevel(currentLevel);
  }
}

function checkAnswer(): void {
  const targets = TABLE.table.querySelectorAll(levels[currentLevel - 1].selector);
  if ((input as HTMLInputElement).value
  && JSON.stringify(TABLE.table.querySelectorAll((input as HTMLInputElement).value.trim()))
  === JSON.stringify(targets)) {
    targets.forEach((target) => {
      target.classList.add('out');
      target.classList.remove('puls');
    });
    levelList.children[currentLevel - 1].classList.add('completed');
    if (CSS_EDITOR.wasHelpUsed) {
      levelList.children[currentLevel - 1].classList.add('completed-with-help');
    }

    if (levelList.querySelectorAll('.completed').length !== levelsAmount && currentLevel !== levelsAmount) {
      setTimeout(() => {
        currentLevel += 1;
        changeLevel(currentLevel);
      }, 500);
    } else if (levelList.querySelectorAll('.completed').length === levelsAmount) {
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

function restartGame(): void {
  currentLevel = 1;
  changeLevel(currentLevel);
  [...levelList.children].forEach((child: Element) => {
    child.classList.remove('completed', 'completed-with-help');
  });
}

function saveGameState(): void {
  const levelsState = levelList.innerHTML;
  const gameState = {
    currentLevel,
    levelsState,
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState(): void {
  type GameState = {
    currentLevel: number;
    levelsState: string;
  };

  const savedGameState = localStorage.getItem('gameState');
  if (savedGameState) {
    const gameState: GameState = JSON.parse(savedGameState);
    currentLevel = gameState.currentLevel;
    levelList.innerHTML = gameState.levelsState;
    changeLevel(currentLevel);
  }
}

document.addEventListener('click', () => input.focus());
TABLE.table.addEventListener('mouseover', showNotice);
MARKUP.container.addEventListener('mouseover', showNotice);
levelList.addEventListener('click', chooseLevel);
restartButton.addEventListener('click', restartGame);
input.addEventListener('keydown', (event: Event) => {
  const keyboardEvent = event as KeyboardEvent;
  if (keyboardEvent.key === 'Enter') {
    checkAnswer();
  }
});

window.addEventListener('DOMContentLoaded', loadGameState);
window.addEventListener('beforeunload', saveGameState);
