import Loader from './loader';

export class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: 'bb7027a1d0dc48e488ca04d0ca500a70', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
