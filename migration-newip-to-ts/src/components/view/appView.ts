import News from './news/news';
import Sources from './sources/sources';
import { ApiEverything, Article, ApiRequest, ApiSource } from '../../types';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ApiEverything): void {
        const values: Article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ApiRequest): void {
        const values: ApiSource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
