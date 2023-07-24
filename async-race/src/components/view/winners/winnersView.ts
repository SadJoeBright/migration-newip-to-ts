import './winners-view.css';
import createElement from '../../utils/create-element';

export default class WinnersView {
  mainContainer: HTMLElement;

  header: HTMLElement;

  title: HTMLElement;

  pageNumber: HTMLElement;

  chart: HTMLElement;

  chartHeader: HTMLElement;

  chartBody: HTMLElement;

  chartColumn: HTMLElement;

  paginationPanel: HTMLElement;

  prevButton: HTMLElement;

  nextButton: HTMLElement;

  constructor() {
    this.mainContainer = createElement({
      tagName: 'div',
      classNames: ['main-container', 'hide'],
    });

    this.header = createElement({
      tagName: 'header',
      classNames: ['header'],
      parentNode: this.mainContainer,
    });

    this.title = createElement({
      tagName: 'h2',
      classNames: ['winners__title'],
      parentNode: this.header,
    });

    this.pageNumber = createElement({
      tagName: 'p',
      classNames: ['winners__page-number'],
      parentNode: this.header,
    });

    this.chart = createElement({
      tagName: 'div',
      classNames: ['chart'],
      parentNode: this.mainContainer,
    });

    this.chartHeader = createElement({
      tagName: 'div',
      classNames: ['chart__line', 'chart__header'],
      parentNode: this.chart,
    });

    this.chartBody = createElement({
      tagName: 'div',
      classNames: ['chart__body'],
      parentNode: this.chart,
    });

    this.chartColumn = createElement({
      tagName: 'div',
      classNames: ['chart__column', 'chart__number'],
      textContent: 'Number',
      parentNode: this.chartHeader,
    });
    this.chartColumn = createElement({
      tagName: 'div',
      classNames: ['chart__column'],
      textContent: 'Car',
      parentNode: this.chartHeader,
    });
    this.chartColumn = createElement({
      tagName: 'div',
      classNames: ['chart__column', 'chart__name'],
      textContent: 'Name',
      parentNode: this.chartHeader,
    });
    this.chartColumn = createElement({
      tagName: 'div',
      classNames: ['chart__column'],
      textContent: 'Wins',
      parentNode: this.chartHeader,
    });
    this.chartColumn = createElement({
      tagName: 'div',
      classNames: ['chart__column'],
      textContent: 'Best time (seconds)',
      parentNode: this.chartHeader,
    });

    this.paginationPanel = createElement({
      tagName: 'div',
      classNames: ['pagination-panel'],
      parentNode: this.mainContainer,
    });

    this.prevButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'PREV',
      parentNode: this.paginationPanel,
    });

    this.nextButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: ' NEXT',
      parentNode: this.paginationPanel,
    });
  }
}
