import './table.css';
import createElement from '../utils/create-element';

const table = createElement({
  tagName: 'div',
  classNames: ['table'],
});

function setID(element: HTMLElement, startIndex = 0): number {
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

setID(table);

export default table;
