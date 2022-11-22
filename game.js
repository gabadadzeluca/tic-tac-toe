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

// grid elements 
const grid = document.querySelectorAll('#grid div');
//board element 
const board = document.getElementById('grid');

//restart class elements
const restartElements = document.querySelectorAll('.restart');
// multiplayer class elements 
const multiplayerElements = document.querySelectorAll('.multiplayer');

//solo elements
const soloElements = document.querySelectorAll('.solo');

//winner class elements
const winnerElements = document.querySelectorAll('.winner');
// winner symbol
const winnerSymbol = document.getElementById('winner-symbol');
// winner number
const winnerNum = document.getElementById('winner-num');
//winner text 
const winnerText = document.getElementById('winner-text');
//tie game end-text
const tieText = document.getElementById('text-tie');
// end buttons
const endButtons = document.querySelectorAll('.end-btn');
// restart buttons
const restartButtons = document.querySelectorAll('.buttons-end .restart');
console.log(restartButtons);
// starting screen
const startScreen = document.getElementById('start-board');

// game screen
const gameScreen = document.getElementById('game-board');

// end screen
const endScreen = document.getElementById('end-screen');

// gamemode buttons
const cpu = document.getElementById('cpu-btn');
const multiplayer = document.getElementById('player-btn');

cpu.addEventListener('click', ()=>{
    startGame('cpu');
});
multiplayer.addEventListener('click', ()=>{
    startGame('multiplayer');
});


// buttons
const quitBtn = document.querySelector('.quit');
quitBtn.addEventListener('click', quit);

const nextRoundBtn = document.querySelector('.next-rd');
nextRoundBtn.addEventListener('click', nextRound);

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', restartGame);

function restartGame(){
    restartScreen();
    // startGame();
}

// restart game
function restartScreen(){
    // show 'restart?' menu
    messageScreen();
    restartElements.forEach(element=>{
        show(element, 'flex');
    });
    restartButtons.forEach(button=>{
        show(button, 'block');
    });
    [multiplayerElements,soloElements, winnerElements, endButtons].map(array=>{
        array.forEach(element=>{
            hide(element);
        });
    });
    const noBtn = document.querySelector('.cancel');
    const yesBtn = document.querySelector('.cont');
    noBtn.addEventListener('click', ()=>{
        hide(endScreen);
    });
    yesBtn.addEventListener('click', ()=>{
        resetBoard();
        startGame();
        //DISPLAY CORRECT ICONS! 
    });

    hide(tieText);
}


function nextRound(){
    resetBoard();
    hide(endScreen);
    startGame();
}

function quit(){
    showStartMenu();
    resetBoard();
}

// clear board
function resetBoard(){
    grid.forEach(box=>{
        box.classList.forEach(className=>{
            box.classList.remove(className);
        });
    });
    //reset score
}

// choosing player elements
const playerX = document.querySelector('.x');
const playerO = document.querySelector('.o');

playerX.addEventListener('click', chooseP1)
playerO.addEventListener('click', chooseP1)

// toggle between icons
function chooseP1(e){
    choice = e.target;
    console.log("p1: ",choice.classList[0]);
    document.querySelectorAll('#p1-choice div').forEach(div=>{
        div.classList.remove('player-1');
    })
    choice.classList.add('player-1');
}

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
showStartMenu();
function startGame(x){
    showGameScreen();
    setHoverStart();
    grid.forEach(box=>{
        box.addEventListener('click', handeClick, {once:true});
    });
    // get player one and let them start.
    getPlayer() == circleCls ? circleTurn = true : circleTurn = false;
}

// get player 1's symbol
function getPlayer(){
    const playerOne = document.querySelector('.player-1');
    return playerOne.id.slice(7);
}
function handeClick(e){
    const currentCls = circleTurn  ? circleCls : crossCls; 
    const box = e.target;
    placeMark(box, currentCls);
    if(checkWin(currentCls)){
        displayWinner(currentCls);
        // stop responding to clicks
        grid.forEach(box=>{
            box.removeEventListener('click', handeClick);
        });
        outline(currentCls);
    }else if(isDraw()){
        console.log('draw');
    }
    showTurn(circleTurn);
    showHoverState(); // !!!doesn't show correctly on the first turn if p1 is cross;
}

function isDraw(){
    return [...grid].every(box=>{
        return box.classList.contains(circleCls) || box.classList.contains(crossCls);
    });
}


function placeMark(box, currentCls){
    box.classList.add(currentCls);
    switchTurn();
}

// change the icon in the top to display the turn
function showTurn(circleTurn) {
    const turn = document.getElementById('turn');
    let src;
    circleTurn ? src = 'o' : src = 'x';
    turn.src = `assets/icon-${src}.svg`;
}
// switching turns
function switchTurn(){
    circleTurn = !circleTurn;
}

// display hover state
function showHoverState(){
    if(circleTurn){
        board.classList.remove('cross-hover');
        board.classList.add('circle-hover');
    }else{
        board.classList.remove('circle-hover');
        board.classList.add('cross-hover');
    }
}
// add p1's icon to hover (at the start or restart)
function setHoverStart(){
    board.classList.add(`${getPlayer()}-hover`);
    board.classList.forEach(className=>{
        if(className != 'grid' && className != `${getPlayer()}-hover`){
            board.classList.remove(className);
        }
    });
}
function checkWin(currentCls){
    return winPatterns.some(pattern=>{
        return pattern.every(number =>{
            // there are 9 elements in the array and numbers get to 9 
            return(grid[number-1].classList.contains(currentCls));
        });
    });
}



// display winner screen
function displayWinner(currentCls){
    messageScreen();
    // hide other elements
    [restartElements, soloElements].forEach(array=>{
        array.forEach(item=>{
            hide(item);
        });
    });
    winnerElements.forEach(element=>{
        show(element, 'flex');
    });
    endButtons.forEach(button=>{
        show(button, 'block');
    })

    //hide tie text
    hide(tieText);
    displayColorAndSymbol(currentCls);
}

// display winner's color and icon
function displayColorAndSymbol(currentCls){
    let color = currentCls ==circleCls ? 'var(--light-yellow)' : 'var(--light-blue)';
    let url = currentCls == circleCls ? "o" : "x";
    winnerSymbol.src = `assets/icon-${url}.svg`;
    winnerText.style.color = color;
}   


// hide element
function hide(x){
    x.style.display = 'none';
}

// show element with it's propety
function show(element, propety){
    element.style.display = propety;
}


// check winner's combination
function outline(currentCls){
    winPatterns.forEach(win=>{
        if(document.getElementById(win[0]).classList == currentCls && 
        document.getElementById(win[1]).classList == currentCls &&
        document.getElementById(win[2]).classList == currentCls){

            // display the winner's combination
            displayWinnerCombination(document.getElementById(win[0]),currentCls);
            displayWinnerCombination(document.getElementById(win[1]),currentCls);
            displayWinnerCombination(document.getElementById(win[2]),currentCls);
        }
    });
}
// display combination 
function displayWinnerCombination(item,currentCls){
    let winner = `winner-${currentCls}`;
    item.classList.remove(currentCls);
    item.classList.add(winner);
}