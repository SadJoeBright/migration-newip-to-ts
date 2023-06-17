// export interface ApiSource {
//     id: string;
//     name: string;
// }

export interface Article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}

export interface ApiSource {
    status: string;
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ApiEverything {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface ApiRequest {
    status: string;
    sources: ApiSource[];
}
