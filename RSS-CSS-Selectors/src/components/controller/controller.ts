import '../table/table.css';
// import table from '../table/table';
import { markupSection, editorBtn } from '../editor/editor';
import levels from '../../data/levels';
import { Level } from '../types/types';

// const currentLevel = 3;

export default class Controller {
  table: HTMLElement;

  target: HTMLElement;

  levels: Level[];

  editorBtn: HTMLElement;

  constructor() {
    // this.table = table;
    this.levels = levels;
    // this.target = table.querySelector(levels[currentLevel - 1].selector);
    // this.insertMarkUp(table);
    this.editorBtn = editorBtn;
    // editorBtn.addEventListener('click', this.checkAnswer);
  }

  private insertMarkUp(element: HTMLElement, intent = '', parent = markupSection): void {
    [...element.children].forEach((child) => {
      const line = document.createElement('div');
      line.classList.add('line');
      const elementId = child.getAttribute('elementId');
      line.setAttribute('elementId', elementId);
      line.textContent = `${intent}<${child.tagName.toLowerCase()} class="${[...child.classList].join(' ')}"></${child.tagName.toLowerCase()}>`;
      parent.append(line);
      if (child.hasChildNodes()) {
        this.insertMarkUp(child as HTMLElement, '   ', line);
      }
    });
  }

  // public checkAnswer() {
  //   if (table.querySelector(textArea.value.trim()) === this.target) {
  //     this.target.classList.add('out');
  //     this.target.classList.remove('puls');
  //   } else {
  //     table.classList.add('shake');
  //     setTimeout(() => {
  //       table.classList.remove('shake');
  //     }, 200);
  //   }
  // }
}
