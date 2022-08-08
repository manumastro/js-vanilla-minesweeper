// al play resetto
// creo l'elememto grid e lo appendo al main
// genero la griglia in base alla difficoltà

const main = document.querySelector('main');
const playBtn = document.getElementById('play').addEventListener('click', play);
let attempts = 0;
const BOMBS_NUMBERS = 16;

function play(){
  reset();
  generatePlayground();
}

function generatePlayground(){
  const grid = document.createElement('div');
  grid.classList.add('grid');
  
  const cellsNumberArray = [100, 81, 49];
  let level = document.getElementById('difficulty').value;
  let cellsNumberGrid = cellsNumberArray[level];

  for(let i = 1; i <= cellsNumberGrid; i++){
    let cell = generateCells(i, cellsNumberGrid);
    grid.append(cell);
  }
  arrayBombs = generateBombs(cellsNumberGrid);

  // console.log(arrayBombs);
  main.append(grid);
}

function generateBombs(cellsNumberGrid){
  let arrayBombs = [];
  while(arrayBombs.length < BOMBS_NUMBERS){
    let rndNumber = getRndInteger(1, cellsNumberGrid);
    arrayBombs.push(rndNumber);
  }
  // console.log(arrayBombs);
  return arrayBombs;
}

function generateCells(i, cellsNumberGrid){
  let cell = document.createElement('div');
  cell.className = 'cell';
  let cellsPerColumn = Math.sqrt(cellsNumberGrid);
  cell.style.height = `calc(100% / ${cellsPerColumn})`;
  cell.style.width = `calc(100% / ${cellsPerColumn})`;
  cell.myNumber = i;
  cell.innerHTML = cell.myNumber;

  cell.addEventListener('click', cellClickEvent);
  return cell;
}

function cellClickEvent(){
  //console.log(this.myNumber);
  //console.log(arrayBombs);
  if(!arrayBombs.includes(this.myNumber)){
    this.classList.add('clicked');
    attempts++;
  }else{
    this.classList.add('bomb');
    endGame();
    
  }
}

function endGame(){
  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    // console.log(cell.myNumber);
    if(arrayBombs.includes(cell.myNumber)){
      cell.classList.remove('clicked');
      cell.classList.add('bomb');
    }else{
      cell.classList.add('clicked');
    }
  });
  score = document.createElement('h1');
  score.innerHTML = `Numero di tentativi: ${attempts}`;
  main.append(score);
  attempts = 0;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function reset(){
  main.innerHTML = '';
}