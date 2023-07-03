import './level-viewer.css';
import createElement from '../utils/create-element';
// import levels from '../../data/levels';

const levelSideBar = createElement({
  tagName: 'aside',
  classNames: ['level-viewer'],
  parentNode: document.body,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const levelViwerTitle = createElement({
  tagName: 'h2',
  classNames: ['aside'],
  parentNode: levelSideBar,
  textContent: 'Level',
});

export default levelSideBar;
