import './news.css';
import { Article } from '../../../types/index';

// class News {
//     draw(data: Article[]): void {
//         const news: Article[] = data.length >= 10 ? data.filter((_item: Article, idx: number) => idx < 10) : data;

//         const fragment = document.createDocumentFragment();
//         const newsItemTemp = document.querySelector('#newsItemTemp');

//         news.forEach((item: Article, idx: number): void => {
//             const newsClone = (newsItemTemp as HTMLTemplateElement).content.cloneNode(true);

//             if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');

//             newsClone.querySelector('.news__meta-photo').style.backgroundImage = `url(${
//                 item.urlToImage || 'img/news_placeholder.jpg'
//             })`;
//             newsClone.querySelector('.news__meta-author').textContent = item.author || item.source.name;
//             newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
//                 .slice(0, 10)
//                 .split('-')
//                 .reverse()
//                 .join('-');

//             newsClone.querySelector('.news__description-title').textContent = item.title;
//             newsClone.querySelector('.news__description-source').textContent = item.source.name;
//             newsClone.querySelector('.news__description-content').textContent = item.description;
//             newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);

//             fragment.append(newsClone);
//         });

//         document.querySelector('.news').innerHTML = '';
//         document.querySelector('.news').appendChild(fragment);
//     }
// }

// export default News;

// class News {
//     draw(data: Article[]): void {
//         const news: Article[] = data.length >= 10 ? data.slice(0, 10) : data;

//         const fragment: DocumentFragment = document.createDocumentFragment();
//         const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

//         if (newsItemTemp) {
//             news.forEach((item: Article, idx: number): void => {
//                 const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

//                 if (idx % 2) {
//                     const newsItem: Element | null = newsClone.querySelector('.news__item');
//                     if (newsItem) newsItem.classList.add('alt');
//                 }

//                 const newsMetaPhoto: Element | null = newsClone.querySelector('.news__meta-photo');
//                 const newsMetaAuthor: Element | null = newsClone.querySelector('.news__meta-author');
//                 const newsMetaDate: Element | null = newsClone.querySelector('.news__meta-date');
//                 const newsDescriptionTitle: Element | null = newsClone.querySelector('.news__description-title');
//                 const newsDescriptionSource: Element | null = newsClone.querySelector('.news__description-source');
//                 const newsDescriptionContent: Element | null = newsClone.querySelector('.news__description-content');
//                 const newsReadMoreLink: Element | null = newsClone.querySelector('.news__read-more a');

//                 if (newsMetaPhoto) {
//                     (newsMetaPhoto as HTMLElement).style.backgroundImage = `url(${
//                         item.urlToImage || 'img/news_placeholder.jpg'
//                     })`;
//                 }

//                 if (newsMetaAuthor) {
//                     newsMetaAuthor.textContent = item.author || item.source.name;
//                 }

//                 if (newsMetaDate) {
//                     newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
//                 }

//                 if (newsDescriptionTitle) {
//                     newsDescriptionTitle.textContent = item.title;
//                 }

//                 if (newsDescriptionSource) {
//                     newsDescriptionSource.textContent = item.source.name;
//                 }

//                 if (newsDescriptionContent) {
//                     newsDescriptionContent.textContent = item.description;
//                 }

//                 if (newsReadMoreLink) {
//                     newsReadMoreLink.setAttribute('href', item.url);
//                 }

//                 fragment.append(newsClone);
//             });
//         }

//         const newsContainer = document.querySelector('.news');
//         if (newsContainer) {
//             newsContainer.innerHTML = '';
//             newsContainer.appendChild(fragment);
//         }
//     }
// }

// export default News;

class News {
    draw(data: Article[]): void {
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

        const newsContainer = document.querySelector('.news');
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
