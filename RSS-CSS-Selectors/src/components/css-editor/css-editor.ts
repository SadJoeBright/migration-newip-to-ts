import createElement from '../utils/create-element';
import { Level } from '../../types/types';

export default class CssEditor {
  editor: HTMLElement;

  input: HTMLInputElement | HTMLElement;

  enterButton: HTMLElement;

  helpButton: HTMLElement;

  wasHelpUsed: boolean;

  levels: Level[];

  levelNumber: number;

  enterButtonEventHandler: () => void;

  constructor(
    levels: Level[],
    levelNumber: number,
    enterButtonEventHandler: () => void,
  ) {
    this.wasHelpUsed = false;
    this.levels = levels;
    this.levelNumber = levelNumber;
    this.enterButtonEventHandler = enterButtonEventHandler;

    this.editor = createElement({
      tagName: 'div',
      classNames: ['css-editor'],
      parentNode: document.querySelector('.editor'),
    });

    this.input = createElement({
      tagName: 'input',
      classNames: ['css-editor__input'],
      parentNode: this.editor,
      eventHandler: (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === 'Enter') {
          this.enterButtonEventHandler();
        }
      },
      eventType: 'keydown',
    });

    this.input.setAttribute('type', 'text');

    this.enterButton = createElement({
      tagName: 'div',
      classNames: ['editor-btn', 'enter-btn'],
      textContent: 'Enter',
      parentNode: this.editor,
      eventHandler: () => this.enterButtonEventHandler(),
      eventType: 'click',
    });

    this.helpButton = createElement({
      tagName: 'div',
      classNames: ['editor-btn', 'help-btn'],
      textContent: 'Help',
      parentNode: this.editor,
      eventHandler: this.getHelp.bind(this),
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
}
