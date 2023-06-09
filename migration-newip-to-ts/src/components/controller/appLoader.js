import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'bb7027a1d0dc48e488ca04d0ca500a70', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
