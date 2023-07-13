import './markup.css';
import createOpenTag from '../utils/create-open-tag';
import createElement from '../utils/create-element';

export default class Markup {
  public container: HTMLElement;

  constructor() {
    this.container = createElement({
      tagName: 'div',
      classNames: ['markup-container'],
      parentNode: document.querySelector('.html-viewer'),
    });
  }

  public insertMarkUp(element: HTMLElement, indent = '', parent = this.container): void {
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
        this.insertMarkUp(child as HTMLElement, '    ', line);
      }
    });
  }
}
