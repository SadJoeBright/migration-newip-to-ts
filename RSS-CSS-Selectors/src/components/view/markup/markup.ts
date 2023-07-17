import './markup.css';
import createOpenTag from '../../utils/create-open-tag';
import createElement from '../../utils/create-element';

export default class Markup {
  public markupContainer: HTMLElement;

  private table: HTMLElement;

  markupEventHandler: (event: MouseEvent) => void;

  constructor(table: HTMLElement, markupEventHandler: (event: MouseEvent) => void) {
    this.markupEventHandler = markupEventHandler;
    this.markupContainer = createElement({
      tagName: 'div',
      classNames: ['markup-container'],
      eventHandler: (event: Event) => this.markupEventHandler(event as MouseEvent),
      eventType: 'mouseover',
    });

    this.table = table;
    this.insertMarkup(this.table);
  }

  public insertMarkup(element: HTMLElement, indent = '', parent = this.markupContainer): void {
    [...element.children].forEach((child) => {
      const line = createElement({
        tagName: 'div',
        classNames: ['line'],
        parentNode: parent,
      });
      const elementId = child.getAttribute('elementId');
      line.setAttribute('elementId', elementId);
      line.setAttribute('tagtId', elementId);
      const openTag = `${indent}${createOpenTag(child as HTMLElement)}`;
      const closeTag = `</${child.tagName.toLowerCase()}>`;
      const before = document.createElement('style');
      before.textContent = `[tagtId="${elementId}"]::before{content:"${openTag}";}`;
      const after = document.createElement('style');
      after.textContent = `[tagtId="${elementId}"]::after{content:"${closeTag}";}`;
      document.head.append(before, after);
      if (child.hasChildNodes()) {
        this.insertMarkup(child as HTMLElement, '    ', line);
      }
    });
  }
}
