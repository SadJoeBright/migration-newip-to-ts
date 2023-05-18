let numberOfRows = 10;
let numberOfColumns = 10;
let numberOfMines = 20;
let mines = [];

function createMatrix(rows, columns, mines, x ,y) {
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
    if (matrix[randomRow][randomCol] !== '💣'  && (randomRow !== x || randomCol !== y)) {
      matrix[randomRow][randomCol] = '💣';
      minesCount += 1;
    }
  }
  let res = matrix.map(item => item.map(el => '💣'));
	for (i = 0; i < matrix.length; i++) {		
		for (j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== '💣') {
        let count = '';
        if (matrix[i-1] && matrix[i-1][j-1]) count = +count + 1;
        if (matrix[i-1] && matrix[i-1][j]) count = +count + 1;
        if (matrix[i-1] && matrix[i-1][j+1])count = +count + 1;
        if (matrix[i] && matrix[i][j-1]) count = +count + 1;
        if (matrix[i] && matrix[i][j+1]) count = +count + 1;
        if (matrix[i+1] && matrix[i+1][j-1]) count = +count + 1;
        if (matrix[i+1] && matrix[i+1][j]) count = +count + 1;
        if (matrix[i+1] && matrix[i+1][j+1]) count = +count + 1;
        res[i][j] = count;
      }
      }
	}
	return res;  
}



const mineField = document.createElement('div');
mineField.classList.add('mine-field');
document.body.prepend(mineField); 

for (let i = 0; i < numberOfColumns; i += 1 ) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let j = 0; j < numberOfRows; j += 1) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    row.append(cell);
  }
  mineField.append(row) 
}

function setMines(event) {
  const rowIndex = [...document.querySelectorAll('.row')].indexOf(event.target.parentNode);
  const columnIndex = [...event.target.parentNode.querySelectorAll('.cell')].indexOf(event.target);
  document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', setMines));
  mines =  createMatrix(numberOfRows, numberOfColumns, numberOfMines, rowIndex, columnIndex);
  for (let i = 0; i < numberOfColumns; i += 1 ) {
    for (let j = 0; j < numberOfRows; j += 1) {
      document.querySelectorAll('.row')[i].querySelectorAll('.cell')[j].innerHTML = mines[i][j];
    }
  }
  document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', setMines));
}



function openCell(event) {
  const rowIndex = [...document.querySelectorAll('.row')].indexOf(event.target.parentNode);
  const columnIndex = [...event.target.parentNode.querySelectorAll('.cell')].indexOf(event.target);
  if (event.target.innerHTML === '💣') {
    event.target.style.backgroundColor = 'red';
    document.querySelectorAll('.cell').forEach((cell) => {
      cell.removeEventListener('click', openCell);
      cell.removeEventListener('contextmenu', setFlag);
      if (cell.innerHTML === '💣' && !cell.classList.contains('cell_flaged')) cell.classList.add('cell_opened')
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
        cell.removeEventListener('click', openCell);
        cell.removeEventListener('contextmenu', setFlag)  
  
        if (cell.innerHTML === '') {
          openEmptyCells(row - 1, col - 1);
          openEmptyCells(row - 1, col);
          openEmptyCells(row - 1, col + 1);
          openEmptyCells(row, col - 1);
          openEmptyCells(row, col + 1);
          openEmptyCells(row + 1, col - 1);
          openEmptyCells(row + 1, col);
          openEmptyCells(row + 1, col + 1);
        } else if (!isNaN(cell.innerHTML)) {
          cell.classList.add('cell_opened');
          cell.removeEventListener('click', openCell);
          cell.removeEventListener('contextmenu', setFlag)  
        }
      }
    }
  }
  
  openEmptyCells(rowIndex, columnIndex);
  event.target.classList.add('cell_opened');
  event.target.removeEventListener('click', openCell);
  event.target.removeEventListener('contextmenu', setFlag)  
}


function setFlag(event) {
  event.preventDefault();
  event.target.classList.toggle('cell_flaged');
  if (event.target.classList.contains('cell_flaged')) {
    event.target.removeEventListener('click', openCell);
    // event.target.innerHTML = content;
  } else {
    event.target.addEventListener('click', openCell);
  }
}
  
  // 🚩
  
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', setMines));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', openCell));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('contextmenu', setFlag));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('contextmenu', (event) => event.preventDefault()));
