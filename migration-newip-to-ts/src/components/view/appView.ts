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

    public drawNews(data: ApiEverything | Response): void {
        const values: Article[] = (data as ApiEverything).articles ? (data as ApiEverything).articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ApiRequest | Response): void {
        const values: ApiSource[] = (data as ApiRequest).sources ? (data as ApiRequest).sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
