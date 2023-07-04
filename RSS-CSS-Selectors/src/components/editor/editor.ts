import './editor.css';
import createElement from '../utils/create-element';
// import table from '../table/table';

const editor = createElement({
  tagName: 'div',
  classNames: ['editor'],
});

const cssEditor = createElement({
  tagName: 'div',
  classNames: ['css-editor'],
  parentNode: editor,
});

const textArea = createElement({
  tagName: 'input',
  classNames: ['css-editor__input'],
  parentNode: cssEditor,
});
textArea.setAttribute('type', 'text');
textArea.setAttribute('placeholder', 'Type in a CSS selector');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const editorBtn = createElement({
  tagName: 'button',
  classNames: ['css-editor__btn'],
  textContent: 'Enter',
  parentNode: cssEditor,
});

const htmlViewer = createElement({
  tagName: 'div',
  classNames: ['html-viewer'],
  parentNode: editor,
});

const lineNumber = createElement({
  tagName: 'div',
  classNames: ['line-numbers'],
  parentNode: htmlViewer,
});

const linesAmount = 10;
for (let i = 1; i <= linesAmount; i += 1) {
  const line = createElement({
    tagName: 'div',
    classNames: ['line'],
    textContent: i as unknown as string,
  });
  lineNumber.append(line);
}

const markupSection = createElement({
  tagName: 'div',
  classNames: ['markup'],
  parentNode: htmlViewer,
});

export { editor, markupSection };
