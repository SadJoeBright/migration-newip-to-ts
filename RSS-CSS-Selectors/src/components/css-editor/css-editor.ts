import createElement from '../utils/create-element';
import { Level } from '../types/types';

export default class CssEditor {
  editor: HTMLElement;

  input: HTMLInputElement | HTMLElement;

  enterButton: HTMLElement;

  helpButton: HTMLElement;

  wasHelpUsed: boolean;

  levels: Level[];

  levelNumber: number;

  constructor(levels: Level[], levelNumber: number) {
    this.wasHelpUsed = false;
    this.levels = levels;
    this.levelNumber = levelNumber;
    this.editor = createElement({
      tagName: 'div',
      classNames: ['css-editor'],
      parentNode: document.querySelector('.editor'),
    });

    this.input = createElement({
      tagName: 'input',
      classNames: ['css-editor__input'],
      parentNode: this.editor,
    });
    this.input.setAttribute('type', 'text');

    this.enterButton = createElement({
      tagName: 'div',
      classNames: ['editor-btn', 'enter-btn'],
      textContent: 'Enter',
      parentNode: this.editor,
      // eventHandler: () => this.checkAnswer(),
    });

    this.helpButton = createElement({
      tagName: 'div',
      classNames: ['editor-btn', 'help-btn'],
      textContent: 'Help',
      parentNode: this.editor,
      eventHandler: () => this.getHelp(),
      eventType: 'click',
    });

    this.input.focus();
    this.showInstructions(this.levelNumber);
  }

  public showInstructions(levelNumber: number): void {
    this.input.setAttribute('placeholder', this.levels[levelNumber - 1].doThis);
  }

  public getHelp(): void {
    const helpText = this.levels[this.levelNumber - 1].selector;
    let i = 0;
    (this.input as HTMLInputElement).value = '';
    const intervalId = setInterval(() => {
      (this.input as HTMLInputElement).value += helpText[i];
      i += 1;
      if (i === helpText.length) {
        clearInterval(intervalId);
      }
    }, 100);
    this.wasHelpUsed = true;
  }

  // public checkAnswer() {
  //   const targets = TABLE.table.querySelectorAll(this.levels[this.levelNumber - 1].selector);
  //   if ((this.input as HTMLInputElement).value
  // eslint-disable-next-line max-len
  //   && JSON.stringify(TABLE.table.querySelectorAll((this.input as HTMLInputElement).value.trim()))
  //   === JSON.stringify(targets)) {
  //     targets.forEach((target) => {
  //       target.classList.add('out');
  //       target.classList.remove('puls');
  //     });
  //     levelList.children[this.levelNumber - 1].classList.add('completed');
  //     if (this.wasHelpUsed) {
  //       levelList.children[this.levelNumber - 1].classList.add('completed-with-help');
  //     }
  // eslint-disable-next-line max-len
  //     if (levelList.querySelectorAll('.completed').length !== levelsAmount && this.levelNumber !== levelsAmount) {
  //       setTimeout(() => {
  //         this.levelNumber += 1;
  //         changeLevel(this.levelNumber);
  //       }, 500);
  //     } else if (levelList.querySelectorAll('.completed').length === levelsAmount) {
  //       setTimeout(() => {
  //         ModalWindow.show();
  //       }, 500);
  //     }
  //   } else {
  //     TABLE.table.classList.add('shake');
  //     setTimeout(() => {
  //       TABLE.table.classList.remove('shake');
  //     }, 200);
  //   }
  // }
}
