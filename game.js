// winning patterns
const winPatterns = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]


//starting points
let circlePoints = 0;
let crossPoints = 0;
let countTies = 0;
//who is to play
let circleTurn;
const crossCls = 'cross';
const circleCls = 'circle';



// starting screen
const startScreen = document.getElementById('start-board');
console.log(startScreen);

// game screen
const gameScreen = document.getElementById('game-board');

//board element 
const board = document.querySelectorAll('#grid div');
console.log(board);

// end screen
const endScreen = document.getElementById('end-screen');



// show starting screen and hide other elements
function showStartMenu(){
    startScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
    endScreen.style.display = 'none';
}

function showGameScreen(){
    startScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    endScreen.style.display = 'none';
}

function messageScreen(){
    endScreen.style.display = 'flex';
}
// start game
function startGame(){
    showStartMenu();
}

// choosing player elements
const playerX = document.querySelector('.x');
const playerO = document.querySelector('.o');

playerX.addEventListener('click', chooseP1)
playerO.addEventListener('click', chooseP1)

// toggle between icons
function chooseP1(e){
    choice = e.target;
    console.log(choice);
    document.querySelectorAll('#p1-choice div').forEach(div=>{
        div.classList.remove('player-1');
    })
    choice.classList.add('player-1');
}


startGame();
