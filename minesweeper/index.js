/* eslint-disable no-use-before-define */
const numberOfRows = 10;
const numberOfColumns = 10;
const numberOfMines = 10;
let minesGrid = [];
let time = 0;
let timerId;
let moves = 0;
const colors = {
  1: 'rgb(34, 173, 34)',
  2: 'blue',
  3: 'red',
  4: 'violet',
  5: 'yellow',
  6: 'orange',
  7: 'rgb(213, 13, 163)',
  8: 'black',
};

function createMatrix(rows, columns, mines, x, y) {
  const matrix = [];
  for (let i = 0; i < rows; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < columns; j += 1) {
      matrix[i][j] = '';
    }
  }
  let minesCount = 0;
  while (minesCount < mines) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * columns);
    if (matrix[randomRow][randomCol] !== '💣' && (randomRow !== x || randomCol !== y)) {
      matrix[randomRow][randomCol] = '💣';
      minesCount += 1;
    }
  }
  const res = matrix.map((item) => item.map(() => '💣'));
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      if (matrix[i][j] !== '💣') {
        let count = '';
        if (matrix[i - 1] && matrix[i - 1][j - 1]) count = +count + 1;
        if (matrix[i - 1] && matrix[i - 1][j]) count = +count + 1;
        if (matrix[i - 1] && matrix[i - 1][j + 1]) count = +count + 1;
        if (matrix[i] && matrix[i][j - 1]) count = +count + 1;
        if (matrix[i] && matrix[i][j + 1]) count = +count + 1;
        if (matrix[i + 1] && matrix[i + 1][j - 1]) count = +count + 1;
        if (matrix[i + 1] && matrix[i + 1][j]) count = +count + 1;
        if (matrix[i + 1] && matrix[i + 1][j + 1]) count = +count + 1;
        res[i][j] = count;
      }
    }
  }
  return res;
}

const wrpapper = document.createElement('div');
wrpapper.classList.add('wrapper');
const header = document.createElement('header');
header.classList.add('header');
const timer = document.createElement('div');
timer.classList.add('timer');
timer.innerHTML = `${time}`.padStart(3, '0');
const moveCounter = document.createElement('div');
moveCounter.classList.add('move-counter');
moveCounter.innerHTML = `${moves}`.padStart(3, '0');
const newGameBtn = document.createElement('div');
newGameBtn.classList.add('new-game-btn');
header.append(timer, moveCounter, newGameBtn);
const mineField = document.createElement('div');
mineField.classList.add('mine-field');
const footer = document.createElement('footer');
footer.classList.add('footer');
wrpapper.append(header, mineField, footer);
document.body.prepend(wrpapper);

for (let i = 0; i < numberOfColumns; i += 1) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let j = 0; j < numberOfRows; j += 1) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    row.append(cell);
  }
  mineField.append(row);
}
function showTime() {
  timerId = setInterval(() => {
    time += 1;
    timer.innerHTML = `${time}`.padStart(3, '0');
  }, 1000);
}

function countMoves(event) {
  if (!event.target.classList.contains('cell_opened') && !event.target.classList.contains('cell_flaged')) {
    moves += 1;
    moveCounter.innerHTML = `${moves}`.padStart(3, '0');
  }
}

function setMines(event) {
  const rowIndex = [...document.querySelectorAll('.row')].indexOf(event.target.parentNode);
  const columnIndex = [...event.target.parentNode.querySelectorAll('.cell')].indexOf(event.target);
  document.querySelectorAll('.cell').forEach((cell) => cell.removeEventListener('click', setMines));
  minesGrid = createMatrix(numberOfRows, numberOfColumns, numberOfMines, rowIndex, columnIndex);
  for (let i = 0; i < numberOfColumns; i += 1) {
    for (let j = 0; j < numberOfRows; j += 1) {
      document.querySelectorAll('.row')[i].querySelectorAll('.cell')[j].innerHTML = minesGrid[i][j];
    }
  }
  document.querySelectorAll('.cell').forEach((cell) => cell.removeEventListener('click', setMines));
}

let openedCells = 0;
function openCell(event) {
  const rowIndex = [...document.querySelectorAll('.row')].indexOf(event.target.parentNode);
  const columnIndex = [...event.target.parentNode.querySelectorAll('.cell')].indexOf(event.target);
  if (event.target.innerHTML === '💣') {
    if (timerId) clearInterval(timerId);
    event.target.classList.add('exploded');
    document.querySelectorAll('.cell').forEach((cell) => {
      cell.removeEventListener('click', openCell);
      cell.removeEventListener('contextmenu', setFlag);
      if (cell.innerHTML === '💣' && !cell.classList.contains('cell_flaged')) cell.classList.add('cell_opened');
    });
  }

  function openEmptyCells(row, col) {
    const rows = document.querySelectorAll('.row');
    if (row < 0 || col < 0 || row >= rows.length) {
      return;
    }
    const cells = rows[row].querySelectorAll('.cell');
    if (cells && cells.length > col) {
      const cell = cells[col];
      if (!cell.classList.contains('cell_opened')) {
        cell.classList.add('cell_opened');
        cell.style.color = colors[`${cell.innerHTML}`];
        if (cell.classList.contains('cell_flaged')) cell.classList.remove('cell_flaged');
        cell.removeEventListener('click', openCell);
        cell.removeEventListener('contextmenu', setFlag);
        if (cell.innerHTML === '') {
          openEmptyCells(row - 1, col - 1);
          openEmptyCells(row - 1, col);
          openEmptyCells(row - 1, col + 1);
          openEmptyCells(row, col - 1);
          openEmptyCells(row, col + 1);
          openEmptyCells(row + 1, col - 1);
          openEmptyCells(row + 1, col);
          openEmptyCells(row + 1, col + 1);
        } else if (!Number.isNaN(cell.innerHTML)) {
          cell.classList.add('cell_opened');
          if (cell.classList.contains('cell_flaged')) cell.classList.remove('cell_flaged');
          cell.removeEventListener('click', openCell);
          cell.removeEventListener('contextmenu', setFlag);
        }
      }
    }
  }
  openEmptyCells(rowIndex, columnIndex);

  event.target.classList.add('cell_opened');
  event.target.removeEventListener('click', openCell);
  event.target.removeEventListener('contextmenu', setFlag);
  openedCells = [...document.querySelectorAll('.cell')].filter(((cell) => cell.classList.contains('cell_opened'))).length;
  if ((numberOfColumns * numberOfRows - numberOfMines) === openedCells) {
    document.querySelectorAll('.cell').forEach((cell) => {
      cell.removeEventListener('click', openCell);
      cell.removeEventListener('contextmenu', setFlag);
    });
    if (timerId) clearInterval(timerId);
    setTimeout(() => {
      alert('You win!');
    }, 500);
  }
  document.querySelectorAll('.cell').forEach((cell) => cell.removeEventListener('click', showTime));
}

function setFlag(event) {
  event.target.classList.toggle('cell_flaged');
  if (event.target.classList.contains('cell_flaged')) {
    event.target.removeEventListener('click', openCell);
  } else {
    event.target.addEventListener('click', openCell);
  }
}

document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', setMines));
document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', countMoves));
document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', showTime));
document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', openCell));
document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('contextmenu', setFlag));
document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('contextmenu', (event) => event.preventDefault()));
