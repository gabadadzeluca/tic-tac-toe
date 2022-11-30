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
let circleTurn = false;
const crossCls = 'cross';
const circleCls = 'circle';

// grid elements 
const grid = document.querySelectorAll('#grid div');
//board element 
const board = document.getElementById('grid');

// scores divs
const blueBox = document.querySelector('.blue-box');
const tieBox = document.querySelector('.silver-box');
const orangeBox = document.querySelector('.orange-box');
//access elements to display score
const blueScore = document.getElementById('blue-score');
const orangeScore = document.getElementById('orange-score');
// access p tags in the boxes
const iconBlueBox = document.getElementById('icon-player');
const iconOrangeBox = document.getElementById('icon-other');
const ties = document.getElementById('ties');

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
// starting screen
const startScreen = document.getElementById('start-board');

// game screen
const gameScreen = document.getElementById('game-board');

// end screen
const endScreen = document.getElementById('end-screen');

// gamemode buttons
const cpu = document.getElementById('cpu-btn');
const multiplayer = document.getElementById('player-btn');

let gamemode;
cpu.addEventListener('click', ()=>{
    startGame('cpu');
    gamemode = 'cpu';

});
multiplayer.addEventListener('click', ()=>{
    startGame('multiplayer');
    gamemode = 'multiplayer';
});


// buttons
const quitBtn = document.querySelector('.quit');
quitBtn.addEventListener('click', quit);

const nextRoundBtn = document.querySelector('.next-rd');
nextRoundBtn.addEventListener('click', nextRound);

const restartBtn = document.getElementById('restart-btn');

function restartGame(){
    restartScreen();
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
    [multiplayerElements,soloElements, winnerElements, endButtons].forEach(array=>{
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
        startGame(gamemode);
    });
    hide(tieText);
}


function nextRound(){
    resetBoard();
    hide(endScreen);
    startGame(gamemode);
}

function quit(){
    showStartMenu();
    resetBoard();
    resetScores();
}

//reset scores
function resetScores(){
    circlePoints = 0;
    crossPoints = 0;
    countTies = 0;
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
function startGame(gamemode){
    styleDivs(gamemode);
    showGameScreen();
    setHoverStart(gamemode);
    grid.forEach(box=>{
        box.addEventListener('click', handleClick, {once:true});
    });
    circleTurn = false;
    // if gamemode is cpu load cpu game
    if(gamemode == 'cpu'){
        if(getPlayer() == circleCls){
            setTimeout(()=>{
                firstMove();
                circleTurn = true;
                showTurn(circleTurn);
            }, 200);
            
        }
    }
}

// get player 1's symbol
function getPlayer(){
    const playerOne = document.querySelector('.player-1');
    return playerOne.id.slice(7);
}

function handleClick(e){
    // re-enable restart button
    restartBtn.addEventListener('click', restartGame);
    // const currentCls = circleTurn  ? circleCls : crossCls; 
    let currentCls = circleTurn  ? circleCls : crossCls; 
    const box = e.target;
    if(gamemode != 'cpu'){
        placeMark(box, currentCls);
        if(checkWin(currentCls)){
            // add points to the winner
            addPoint(currentCls);
            displayWinner(currentCls);
            // stop responding to clicks
            grid.forEach(box=>{
                box.removeEventListener('click', handleClick);
            });
            outline(currentCls);
        }else if(isDraw()){
            console.log('draw');
            displayDraw();
            // add points to the draw score
            addPoint(false);
        }
        showTurn(circleTurn);
        showHoverState(); // modify for cpu game
    }else if(gamemode == 'cpu'){
        const aiCls = getPlayer() == circleCls ? crossCls : circleCls;
        circleTurn = getPlayer() == circleCls ? false : true;
        showTurn(circleTurn);
        placeMark(box, getPlayer());
        // prevent from making a move if there's a winner
        if(!checkWin(getPlayer())){
            aiMove(aiCls);
        }
        else if(checkWin(getPlayer())){
            console.log(getPlayer(), "wins");
            displayWinner(getPlayer());
            outline(getPlayer());
            addPoint(getPlayer());
            grid.forEach(box=>{
                box.removeEventListener('click', handleClick);
            });
            return;
        }else if(isDraw()){
            displayDraw();
            addPoint();
            grid.forEach(box=>{
                box.removeEventListener('click', handleClick);
            });
            return;
        }
    }
}

// add first move by ai (X-player)
function firstMove(){
    availableSpot(crossCls);
}

function aiMove(aiCls){
    setTimeout(()=>{
        showTurn(circleTurn);
        availableSpot(aiCls);
        // check if ai is winner or for a draw
        if(checkWin(aiCls) && !checkWin(getPlayer())){
            console.log(aiCls, "wins");
            displayWinner(aiCls);
            outline(aiCls);
            addPoint(aiCls);
            grid.forEach(box=>{
                box.removeEventListener('click', handleClick);
            });
            return; 
        }else if(isDraw()){
            displayDraw();
            addPoint();
            grid.forEach(box=>{
                box.removeEventListener('click', handleClick);
            });
            return;
        }
        switchTurn();
    }, 200);

}


// add symbol to a random available grid-box from the array
function availableSpot(aiCls){
    available = [];
    grid.forEach(element =>{
        if(element.classList != circleCls && element.classList != crossCls){
            available.push(element);
        }
    });
    // add symbol to a random box
    let box = available[Math.floor(Math.random() * (available.length - 1))];
    if(box){
        // stop responding to clicks
        box.removeEventListener('click', handleClick);
        box.classList.add(aiCls);
    }
}

function addPoint(currentCls){
    if(!currentCls){
        // add points to the draw
        countTies ++;
    }else{
        // add point to the winner
        currentCls == circleCls ? circlePoints ++ : crossPoints ++;
    }
    console.log("circle:", circlePoints);
    console.log("cross:", crossPoints);
    console.log("tie:", countTies);
}

function styleDivs(gamemode){
    let colorP1 = getPlayer() == circleCls ? 'var(--light-yellow)' : 'var(--light-blue)';
    let colorP2 = getPlayer() == circleCls ? 'var(--light-blue)' : 'var(--light-yellow)';
    let nameP1 = getPlayer() == circleCls ? 'O (P1)' : 'X (P1)';
    let nameP2 = getPlayer() == circleCls ? 'X (P2)' : 'O (P2)';

    blueBox.style.backgroundColor = colorP1;
    orangeBox.style.backgroundColor = colorP2;

    if(gamemode != 'cpu'){
        iconBlueBox.innerHTML = nameP1;
        iconOrangeBox.innerHTML = nameP2;
    }
    if(getPlayer() == circleCls){
        blueScore.innerHTML = circlePoints;
        orangeScore.innerHTML = crossPoints;
    }else{
        orangeScore.innerHTML = circlePoints;
        blueScore.innerHTML = crossPoints;
    }
    
    ties.innerHTML = countTies;
}

function isDraw(){
    return [...grid].every(box=>{
        return box.classList.contains(circleCls) || box.classList.contains(crossCls);
    });
}

function placeMark(box, currentCls){
    if(box.classList.length == 0){
        box.classList.add(currentCls);
        switchTurn();
    }
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
function showHoverState(gamemode){
    if(circleTurn){
        board.classList.remove('cross-hover');
        board.classList.add('circle-hover');
    }else{
        board.classList.remove('circle-hover');
        board.classList.add('cross-hover');
    }
    if(gamemode == 'cpu'){
        board.classList.remove('cross-hover');
        board.classList.remove('circle-hover');
        board.classList.add(`${getPlayer()}-hover`);
    }
}
// add p1's icon to hover (at the start or restart)
function setHoverStart(gamemode){
    board.classList.remove(`${circleCls}-hover`)
    board.classList.add(`${crossCls}-hover`);
    if(gamemode == 'cpu'){
        board.classList.remove('circle-hover');
        board.classList.remove('cross-hover');
        board.classList.add(`${getPlayer()}-hover`);
    }
}

function checkWin(className){
    return winPatterns.some(pattern=>{
        return pattern.every(number =>{
            // there are 9 elements in the array and numbers get to 9 
            return(grid[number-1].classList.contains(className));
        });
    });
}



// display winner screen
function displayWinner(currentCls){
    messageScreen();
    restartElements.forEach(item=>{
        hide(item);
    });
    winnerElements.forEach(element=>{
        show(element, 'flex');
    });
    endButtons.forEach(button=>{
        show(button, 'block');
    });
    // hide other elements
    if(gamemode == 'multiplayer'){
        soloElements.forEach(element=>{
            hide(element);
        });
        let num =  getPlayer() == currentCls ? 1 : 2;
        winnerNum.innerHTML = `${num}`; 
    }else{// if gamemode is cpu
        multiplayerElements.forEach(element=>{
            hide(element);
        });
        soloElements.forEach(element=>{
            show(element, 'block');
        });
        
        const winningText= document.getElementById('text-win');
        const losingText = document.getElementById('text-lose');
        if(currentCls == getPlayer()){
            show(winningText, 'block');
            hide(losingText);
        }else{
            show(losingText, 'block');
            hide(winningText);
        }
    }
    //hide tie text
    hide(tieText);
    displayColorAndSymbol(currentCls);

    // disable reset btn
    restartBtn.removeEventListener('click', restartGame);
}

// display winner's color and icon
function displayColorAndSymbol(currentCls){
    let color = currentCls ==circleCls ? 'var(--light-yellow)' : 'var(--light-blue)';
    let url = currentCls == circleCls ? "o" : "x";
    winnerSymbol.src = `assets/icon-${url}.svg`;
    winnerText.style.color = color;
}   

// draw screen
function displayDraw(){
    messageScreen();
    [winnerElements, soloElements, restartElements].forEach(array=>{
        array.forEach(element=>{
            hide(element);
        });
    });
    show(tieText, 'block');
    endButtons.forEach(button=>{
        show(button, "block");
    });
    // disable reset btn
    restartBtn.removeEventListener('click', restartGame);
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
