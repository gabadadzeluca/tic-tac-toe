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

//player 1
const player1 = document.querySelector('.player-1');
console.log("player1: ", player1.classList[0]);

const restartElements = document.querySelectorAll('.restart');

const grid = document.querySelector('#grid').childNodes;



// starting screen element
const startScreen = document.querySelector('#start-board');

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
function checkGrid(currentCls){
    document.addEventListener('click',function winner(){ 
        // loop through the patterns
        winPatterns.forEach(win=>{
            // detect player's win
            if(document.getElementById(win[0]).classList == currentCls && 
            document.getElementById(win[1]).classList == currentCls &&
            document.getElementById(win[2]).classList == currentCls){
                console.log(currentCls, 'wins!!!');
                gameActive = false;
                document.removeEventListener('click', winner);
                //stop responding to clicks 
                grid.forEach(element=>{
                    element.removeEventListener('click', handeClick);
                });
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

function handeClick(e) {
    const box = e.target;
    const currentCls = circleTurn  ? circleCls : crossCls; 
    placeMark(box,currentCls);
    checkGrid(currentCls);
    showTurn(circleTurn); // show whose turn it is
    // showHoverState();
}


function placeMark(box, currentCls){
    box.classList.add(currentCls);
    //switch turns
    switchTurn();
}

function switchTurn() {
    circleTurn = !circleTurn;
}

function showTurn(circleTurn) {
    const turn = document.getElementById('turn');
    let src;
    if(circleTurn){
        src = 'x';
    }else{
        src = 'o';
    }
    turn.src = `assets/icon-${src}.svg`;
}

function showHoverState(box){
    //add hover state
}

//reset button
const resetBtn = document.getElementById('restart-btn');
resetBtn.addEventListener('click', resetAll);
function resetAll(){
    //reset everything
    const divs = document.querySelectorAll('#grid div');
    divs.forEach(div=>{
        // div.classList.remove(circleCls);
        // div.classList.remove(crossCls);
        // eventlistener stops working!!!
    })
    console.log(divs);
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