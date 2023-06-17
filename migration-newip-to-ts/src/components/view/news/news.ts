import './news.css';
import { Article } from '../../../types/index';

class News {
    public draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.slice(0, 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (newsItemTemp) {
            news.forEach((item: Article, idx: number): void => {
                const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

                if (idx % 2) {
                    this.setClass(newsClone, '.news__item', 'alt');
                }

                this.setStyle(
                    newsClone,
                    '.news__meta-photo',
                    'backgroundImage',
                    `url(${item.urlToImage || 'img/news_placeholder.jpg'})`
                );
                this.setTextContent(newsClone, '.news__meta-author', item.author || item.source.name);
                this.setTextContent(
                    newsClone,
                    '.news__meta-date',
                    item.publishedAt.slice(0, 10).split('-').reverse().join('-')
                );
                this.setTextContent(newsClone, '.news__description-title', item.title);
                this.setTextContent(newsClone, '.news__description-source', item.source.name);
                this.setTextContent(newsClone, '.news__description-content', item.description);
                this.setAttribute(newsClone, '.news__read-more a', 'href', item.url);

                fragment.append(newsClone);
            });
        }

        const newsContainer: Element | null = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }

    private setClass(parent: ParentNode, selector: string, className: string): void {
        const element: Element | null = parent.querySelector(selector);
        if (element) {
            element.classList.add(className);
        }
    }

    private setTextContent(parent: ParentNode, selector: string, text: string): void {
        const element: Element | null = parent.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }

    private setAttribute(parent: ParentNode, selector: string, attributeName: string, attributeValue: string): void {
        const element: Element | null = parent.querySelector(selector);
        if (element) {
            element.setAttribute(attributeName, attributeValue);
        }
    }

    private setStyle(parent: ParentNode, selector: string, styleName: string, value: string): void {
        const element: HTMLElement | null = parent.querySelector(selector) as HTMLElement;
        if (element) {
            element.style.backgroundImage = value;
        }
    }
}

export default News;
