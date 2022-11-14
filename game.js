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

let gameActive = true;

//who is to play
let circleTurn;
const crossCls = 'cross';
const circleCls = 'circle';

const restartElements = document.querySelectorAll('.restart');

const grid = document.querySelector('#grid').childNodes;


// get elements 

// starting screen element
const startScreen = document.querySelector('#start-board');
console.log("start board", startScreen);

// buttons
const cpuBtn = document.querySelector('#cpu-btn');
const playerBtn = document.querySelector('#player-btn');
//choosing player 1's mark
const playerChoice = document.querySelector('#p1-choice').childNodes; 
console.log("player choice: ",playerChoice);
const squareIcon = document.querySelector('.x');
const circleIcon = document.querySelector('.o');

// add event listeners

// multiplayer or solo
cpuBtn.addEventListener('click', ()=>{
    game('solo');
});
playerBtn.addEventListener('click', ()=>{
    game('multiplayer');
});

//grid element
const gameScreen = document.querySelector('#game-board');



// ending screen element
const endScreen = document.querySelector('#end-text');

//switch screens 

//display start screen
function startGameScreen(){
    startScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
    endScreen.style.display = 'none';
}

//display game screen
function mainGameScreen(){
    gameScreen.style.display = 'flex';
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
}

// display ending screen
function endGameScreen(){
    endScreen.style.display = 'flex';
    startScreen.style.display = 'none';
}
//




// check the current condition of board
function checkGrid(currectCls){
    document.addEventListener('click', function winner(){ 
        // loop through the patterns
        winPatterns.forEach(win=>{
            // detect player's win
            if(document.getElementById(win[0]).classList == currectCls && 
            document.getElementById(win[1]).classList == currectCls &&
            document.getElementById(win[2]).classList == currectCls){
                console.log(currectCls, 'wins!!!');
                gameActive = false;
                document.removeEventListener('click', winner);
            }
        });
    });
}


function startGame() {
    circleTurn = false;
    grid.forEach(element =>{
        element.addEventListener('click', handeClick, {once: true});
    });
}

function handeClick(e){
    const box = e.target;
    const currectCls = circleTurn  ? circleCls : crossCls; 
    placeMark(box,currectCls);
    checkGrid(currectCls);
}


function placeMark(box, currectCls){
    box.classList.add(currectCls);
    //switch turns
    switchTurn();
}

function switchTurn(){
    circleTurn = !circleTurn;
}






// load starting screen
startGameScreen();

function game(x){
    console.log("game: ",x);

    // load game
    mainGameScreen();

    // if x is solo, load cpu game
    if(x == 'solo'){
        soloGame();
    }else{
        //load player vs player game
        // multiplayerGame();
        
        //choose player one's mark
        startGame();
    }
}