import './global.css';
import levels from './data/levels';
import createOpenTag from './components/utils/create-open-tag';
import insertMarkUp from './components/utils/insert-markup';
import showWinMassage from './components/utils/show-win-massage';

const TABLE: HTMLElement = document.querySelector('.table');
const markUpContainer: HTMLElement = document.querySelector('.markup');
const levelList: HTMLElement = document.querySelector('.level-list');
const input: HTMLInputElement = document.querySelector('.css-editor__input');
input.focus();
const enterButton: HTMLElement = document.querySelector('.enter-btn');
const helpButton: HTMLElement = document.querySelector('.help-btn');
const restartButton: HTMLElement = document.querySelector('.restart-btn');

let wasHelpUsed = false;
let currentLevel = 1;
const levelsAmount = levels.length;

function fillTable(levelNumber: number) {
  TABLE.innerHTML = levels[levelNumber - 1].boardMarkup;

  if (levelList.querySelector('.level-item_selected')) {
    levelList.querySelector('.level-item_selected').classList.remove('level-item_selected');
  }
  levelList.children[levelNumber - 1].classList.add('level-item_selected');
}

function setID(element: HTMLElement, startIndex = 0) {
  const children = [...element.childNodes];
  let currentIndex = startIndex;

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i] as HTMLElement;
    if (child.nodeType === Node.ELEMENT_NODE) {
      child.setAttribute('elementId', currentIndex as unknown as string);
      currentIndex += 1;

      if (child.hasChildNodes()) {
        currentIndex = setID(child, currentIndex);
      }
    }
  }

  return currentIndex;
}

function showInstruction(level: number) {
  input.setAttribute('placeholder', levels[level - 1].doThis);
}

function markTargets(level: number) {
  const targets = TABLE.querySelectorAll(levels[level - 1].selector);
  targets.forEach((target) => {
    target.classList.add('puls');
  });
}

fillTable(currentLevel);
setID(TABLE);
insertMarkUp(TABLE);
markTargets(currentLevel);
showInstruction(currentLevel);

function changeLevel(level: number) {
  wasHelpUsed = false;
  markUpContainer.innerHTML = '';
  input.value = '';
  fillTable(level);
  setID(TABLE);
  insertMarkUp(TABLE);
  markTargets(level);
  showInstruction(level);
}

function chooseLevel(event: Event) {
  const target = event.target as HTMLElement;
  if (target.parentNode === levelList) {
    if (levelList.querySelector('.level-item_selected')) {
      levelList.querySelector('.level-item_selected').classList.remove('level-item_selected');
    }
    target.classList.add('level-item_selected');
    currentLevel = +target.textContent;
    changeLevel(currentLevel);
  }
}

function checkAnswer() {
  const targets = TABLE.querySelectorAll(levels[currentLevel - 1].selector);
  if (input.value
     && JSON.stringify(TABLE.querySelectorAll(input.value.trim())) === JSON.stringify(targets)) {
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
        showWinMassage();
      }, 500);
    }
  } else {
    TABLE.classList.add('shake');
    setTimeout(() => {
      TABLE.classList.remove('shake');
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
  if (target !== TABLE && event.target !== markUpContainer) {
    const targetId = target.getAttribute('elementId');
    const tableElement = TABLE.querySelector(`[elementId="${targetId}"]`);
    const markUpElement = markUpContainer.querySelector(`[elementId="${targetId}"]`);
    const notice = document.createElement('div');
    notice.textContent = `${createOpenTag(tableElement as HTMLElement)}</${tableElement.tagName.toLowerCase()}>`;
    notice.classList.add('notification');
    tableElement.classList.add('hovered');
    tableElement.append(notice);
    markUpElement.classList.add('markUp-hovered');
    event.target.addEventListener('mouseout', () => {
      tableElement.classList.remove('hovered');
      markUpElement.classList.remove('markUp-hovered');
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
TABLE.addEventListener('mouseover', showNotice);
markUpContainer.addEventListener('mouseover', showNotice);
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
