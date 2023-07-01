import './global.css';
import createElement from './components/create-element';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const header = createElement({
  tagName: 'header',
  classNames: ['header'],
  textContent: 'Hello',
  parentNode: document.body,
});
