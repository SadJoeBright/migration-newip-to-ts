import './table.css';
import createElement from '../utils/create-element';
import levels from '../../data/levels';

const levelNumber = 3;

const table = createElement({
  tagName: 'div',
  classNames: ['table'],
});

function fillTable(): void {
  const markUp = levels[levelNumber - 1].boardMarkup;
  table.insertAdjacentHTML('afterbegin', markUp);
}

fillTable();
export default table;
