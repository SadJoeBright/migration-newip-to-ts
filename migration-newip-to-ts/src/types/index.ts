export interface ApiSource {
    id: string;
    name: string;
}

export interface Article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: ApiSource;
    title: string;
    url: string;
    urlToImage: string;
}
