import '../../main.css';
import createElement from '../utils/create-element';

export default class AppView {
  mainContainer: HTMLElement;

  mainTitle: HTMLElement;

  editorWrapper: HTMLElement;

  htmlViewer: HTMLElement;

  lineNumbers: HTMLElement;

  linesAmount: number;

  table: HTMLElement;

  cssEditor: HTMLElement;

  markup: HTMLElement;

  sidebar: HTMLElement;

  footer: HTMLElement;

  githubLink: HTMLElement;

  copyright: HTMLElement;

  rssLink: HTMLElement;

  constructor(
    table: HTMLElement,
    cssEditor: HTMLElement,
    markup: HTMLElement,
    sidebar: HTMLElement,
  ) {
    this.table = table;
    this.cssEditor = cssEditor;
    this.markup = markup;
    this.sidebar = sidebar;

    this.mainContainer = createElement({
      tagName: 'div',
      classNames: ['main-container'],
      parentNode: document.body,
    });

    this.mainTitle = createElement({
      tagName: 'h1',
      classNames: ['main-container__title'],
      textContent: 'Select animated elements',
      parentNode: this.mainContainer,
    });

    this.editorWrapper = createElement({
      tagName: 'div',
      classNames: ['editor-wrapper'],
      parentNode: this.mainContainer,
    });

    this.htmlViewer = createElement({
      tagName: 'div',
      classNames: ['html-viewer'],
      parentNode: this.editorWrapper,
    });

    this.lineNumbers = createElement({
      tagName: 'div',
      classNames: ['line-numbers'],
      parentNode: this.htmlViewer,
    });

    this.linesAmount = 15;

    for (let i = 1; i <= this.linesAmount; i += 1) {
      const line = createElement({
        tagName: 'span',
        classNames: ['line-numbers__number'],
        textContent: `${i}`,
      });
      this.lineNumbers.append(line);
    }

    this.footer = createElement({
      tagName: 'footer',
      classNames: ['footer'],
      parentNode: document.body,
    });

    this.githubLink = createElement({
      tagName: 'a',
      classNames: ['github-link'],
      parentNode: this.footer,
    });
    this.githubLink.setAttribute('href', 'https://github.com/SadJoeBright');

    this.copyright = createElement({
      tagName: 'p',
      classNames: ['copyright'],
      textContent: 'SadJoeBright 2023',
      parentNode: this.footer,
    });

    this.rssLink = createElement({
      tagName: 'a',
      classNames: ['rss-link'],
      parentNode: this.footer,
    });
    this.githubLink.setAttribute('href', 'https://rs.school/js/');
  }

  public create(): void {
    this.mainTitle.after(this.table);
    this.editorWrapper.prepend(this.cssEditor);
    this.htmlViewer.append(this.markup);
    document.body.insertBefore(this.sidebar, this.footer);
  }
}
