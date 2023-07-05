import createOpenTag from './create-open-tag';

const markUpContainer: HTMLElement = document.querySelector('.markup');
export default function insertMarkUp(element: HTMLElement, intent = '', parent = markUpContainer) {
  [...element.children].forEach((child) => {
    const line = document.createElement('div');
    line.classList.add('line');
    const elementId = child.getAttribute('elementId');
    line.setAttribute('elementId', elementId);
    line.setAttribute('tagtId', elementId);
    const openTag = `${intent}${createOpenTag(child as HTMLElement)}`;
    const closeTag = `</${child.tagName.toLowerCase()}>`;
    const before = document.createElement('style');
    before.innerHTML = `[tagtId="${elementId}"]::before{content:"${openTag}"; line_hieght: 150%;`;
    const after = document.createElement('style');
    after.innerHTML = `[tagtId="${elementId}"]::after{content:"${closeTag}" line_hieght: 150%;}`;
    document.head.append(before, after);
    parent.append(line);
    if (child.hasChildNodes()) {
      insertMarkUp(child as HTMLElement, '   ', line);
    }
  });
}
