import { ElementOptions } from '../types/types';

function createElement(options: ElementOptions): HTMLElement {
  const element: HTMLElement = document.createElement(options.tagName);
  element.classList.add(...options.classNames);
  if (options.textContent) {
    element.textContent = options.textContent;
  }
  if (options.parentNode) {
    options.parentNode.append(element);
  }
  if (options.eventHandler && options.eventType) {
    element.addEventListener(options.eventType, options.eventHandler);
  }
  return element;
}

// interface ElementOptions {
//   tag: string;
//   classNames: string[];
//   textContent?: string;
//   parentNode?: HTMLElement;
//   eventHandler?: () => void;
//   eventType?: string;
// }

// class ElementCreator {
//   element: HTMLElement;

//   options: ElementOptions;

//   constructor(options: ElementOptions) {
//     this.element = null;
//     this.options = options;
//     this.createElement(options);
//   }

//   public getElement() {
//     return this.element;
//   }

//   public addInnerElement(element: HTMLElement) {
//     if (element instanceof ElementCreator) {
//       this.element.append(element.getElement());
//     } else {
//       this.element.append(element);
//     }
//   }

//   public createElement(options: ElementOptions) {
//     this.element = document.createElement(options.tag);
//     this.setCssClasses(options.classNames);
//     this.setTextContent(options.textContent);
//     this.setEventHandler(options.eventType, options.eventHandler);
//   }

//   public setCssClasses(this.options.classNames) {
//     cssClasses.forEach((cssClass) => this.element.classList.add(cssClass));
//   }

//   public setTextContent(text = '') {
//     this.element.textContent = text;
//   }

// eslint-disable-next-line max-len
//   public setEventHandler(eventType: ElementOptions['eventType'], eventHandler: ElementOptions['eventHandler']) {
//     // if (eventType && eventHandler) {
//       this.element.addEventListener(eventType, eventHandler);
//     // }
//   }
// }

// export default ElementCreator;
export default createElement;
