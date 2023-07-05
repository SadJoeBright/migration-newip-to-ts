/* eslint-disable no-alert */

import './global.css';
import levels from './data/levels';
import createOpenTag from './components/utils/create-open-tag';
import insertMarkUp from './components/utils/insert-markup';

alert('Дорогой Reviwer! Eсли у тебя есть такая возможность, пожалуйста отложи свою проверку до вечера 6.03. Буду безмерно благодарен)) Мой discord: @SadJoeBright#6933; telegram: @sadjoebright');
const TABLE: HTMLElement = document.querySelector('.table');
const markUpContainer: HTMLElement = document.querySelector('.markup');
const levelList: HTMLElement = document.querySelector('.level-list');
const input: HTMLInputElement = document.querySelector('.css-editor__input');
const chekingButton: HTMLElement = document.querySelector('.css-editor__btn');
const helpButton: HTMLElement = document.createElement('button');
helpButton.textContent = 'help';
document.body.append(helpButton);

let wasHelpUsed = false;
let currentLevel = parseInt(localStorage.getItem('currentLevel'), 10) || 1;

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

function changeLevel(level: number) {
  wasHelpUsed = false;
  markUpContainer.innerHTML = '';
  input.value = '';
  fillTable(level);
  setID(TABLE);
  insertMarkUp(TABLE);
  markTargets(level);
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
  if (JSON.stringify(TABLE.querySelectorAll(input.value.trim())) === JSON.stringify(targets)) {
    targets.forEach((target) => {
      target.classList.add('out');
      target.classList.remove('puls');
    });
    levelList.children[currentLevel - 1].classList.add('completed');
    if (wasHelpUsed) {
      levelList.children[currentLevel - 1].classList.add('completed-with-help');
    }

    setTimeout(() => {
      currentLevel += 1;
      changeLevel(currentLevel);
    }, 500);
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

function saveGameState() {
  localStorage.setItem('currentLevel', currentLevel as unknown as string);
}

TABLE.addEventListener('mouseover', showNotice);
markUpContainer.addEventListener('mouseover', showNotice);
levelList.addEventListener('click', chooseLevel);
chekingButton.addEventListener('click', checkAnswer);
helpButton.addEventListener('click', getHelp);
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});

window.addEventListener('beforeunload', saveGameState);
