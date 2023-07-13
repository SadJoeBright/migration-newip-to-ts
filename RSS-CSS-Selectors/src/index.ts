import './global.css';
import levels from './data/levels';
import createElement from './components/utils/create-element';
import createOpenTag from './components/utils/create-open-tag';
import Table from './components/table/table';
import Markup from './components/markup/markup';
import ModalWindow from './components/modal-window/modal-window';

const levelList: HTMLElement = document.querySelector('.level-list');
const input: HTMLInputElement = document.querySelector('.css-editor__input');
input.focus();
const enterButton: HTMLElement = document.querySelector('.enter-btn');
const helpButton: HTMLElement = document.querySelector('.help-btn');
const restartButton: HTMLElement = document.querySelector('.restart-btn');

let wasHelpUsed = false;
let currentLevel = 1;
const levelsAmount = levels.length;

const MAIN_CONTAINER = createElement({
  tagName: 'div',
  classNames: ['main-container'],
  parentNode: document.body,
});

const TABLE = new Table(levels, currentLevel);

MAIN_CONTAINER.append(TABLE.table);

const MARKUP = new Markup(TABLE.table);

function showInstruction(level: number) {
  input.setAttribute('placeholder', levels[level - 1].doThis);
}

// MARKUP.insertMarkUp(TABLE.table);
showInstruction(currentLevel);

function changeLevel(level: number) {
  if (levelList.querySelector('.level-item_selected')) {
    levelList.querySelector('.level-item_selected').classList.remove('level-item_selected');
  }
  levelList.children[level - 1].classList.add('level-item_selected');

  wasHelpUsed = false;
  MARKUP.container.innerHTML = '';
  input.value = '';
  TABLE.fillTable(level);
  TABLE.setID(TABLE.table);
  TABLE.markTargets(level);
  MARKUP.insertMarkUp(TABLE.table);
  showInstruction(level);
}

function chooseLevel(event: Event) {
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

function checkAnswer() {
  const targets = TABLE.table.querySelectorAll(levels[currentLevel - 1].selector);
  if (input.value && JSON.stringify(TABLE.table.querySelectorAll(input.value.trim()))
  === JSON.stringify(targets)) {
    targets.forEach((target) => {
      target.classList.add('out');
      target.classList.remove('puls');
    });
    levelList.children[currentLevel - 1].classList.add('completed');
    if (wasHelpUsed) {
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

function getHelp() {
  const helpText = levels[currentLevel - 1].selector;
  let i = 0;
  input.value = '';
  const intervalId = setInterval(() => {
    input.value += helpText[i];
    i += 1;
    if (i === helpText.length) {
      clearInterval(intervalId);
    }
  }, 100);
  wasHelpUsed = true;
}

function showNotice(event: Event) {
  const target = event.target as HTMLElement;
  if (target !== TABLE.table && event.target !== MARKUP.container) {
    const targetId = target.getAttribute('elementId');
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
    target.addEventListener('mouseout', () => {
      tableElement.classList.remove('hovered');
      markUpElement.classList.remove('markup-hovered');
      notice.remove();
    });
  }
}

function restartGame() {
  currentLevel = 1;
  changeLevel(currentLevel);
  [...levelList.children].forEach((child) => {
    const element = child as Element;
    element.classList.remove('completed', 'completed-with-help');
  });
}

function saveGameState() {
  const levelsState = levelList.innerHTML;
  const gameState = {
    currentLevel,
    levelsState,
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState() {
  const savedGameState = localStorage.getItem('gameState');
  if (savedGameState) {
    const gameState = JSON.parse(savedGameState);
    currentLevel = gameState.currentLevel;
    levelList.innerHTML = gameState.levelsState;
    changeLevel(currentLevel);
  }
}

document.addEventListener('click', () => input.focus());
TABLE.table.addEventListener('mouseover', showNotice);
MARKUP.container.addEventListener('mouseover', showNotice);
levelList.addEventListener('click', chooseLevel);
enterButton.addEventListener('click', checkAnswer);
helpButton.addEventListener('click', getHelp);
restartButton.addEventListener('click', restartGame);
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});

window.addEventListener('DOMContentLoaded', loadGameState);
window.addEventListener('beforeunload', saveGameState);
