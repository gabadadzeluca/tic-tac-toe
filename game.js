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
//starting points
let circlePoints = 0;
let crossPoints = 0;
let countTies = 0;
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
// player 1's symbol
const playerChoices = Array.from(document.querySelectorAll('.choice'));


// multiplayer or solo game
cpuBtn.addEventListener('click', ()=>{
    game('solo');
});
playerBtn.addEventListener('click', ()=>{
    game('multiplayer');
});

//grid element
const gameScreen = document.querySelector('#game-board');

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
///end screen elements///

// ending screen element
const endScreen = document.querySelector('#end-text');



// multiplayer game end-screen
const multiplayerEndScreen = Array.from(document.querySelectorAll('.multiplayer'));
//solo game end-scren
const soloEndScreen = Array.from(document.querySelectorAll('.solo'));

//tie game end-text
const tieText = document.getElementById('text-tie');

//winner class elements
const winnerElements = document.querySelectorAll('.winner');
// winner symbol
const winnerSymbol = document.getElementById('winner-symbol');
// winner number
const winnerNum = document.getElementById('winner-num');
//winner text 
const winnerText = document.getElementById('winner-text');

//BUTTONS//

// end-screen btns
const endBtns = document.querySelectorAll('.end-btn');

//reset button
const resetBtn = document.getElementById('restart-btn');
resetBtn.addEventListener('click', resetFunction);

// Yes restart and No don't buttons
// No, cancel btn
const noBtn = document.querySelector('.cancel');
noBtn.addEventListener('click', ()=>{
    mainGameScreen();
})

// Yes, cancel btn
const yesBtn = document.querySelector('.cont');
// remove score/ menu and clear grid
yesBtn.addEventListener('click', ()=>{
    resetAll();
    mainGameScreen();
});

//reset btn function
function resetFunction(){
    // prompt reset menu
    restartElements.forEach(element =>{
        element.style.display = 'block';
    });
    restartGameScreen(); 
}

function restartGameScreen(){
    endGameScreen();
    //hide elements
    winnerText.style.display = 'none';
    tieText.style.display = 'none';
    soloEndScreen.forEach(element =>{
        element.style.display = 'none';
    });
    endBtns.forEach(button =>{
        button.style.display = 'none';
    });
    multiplayerEndScreen.forEach(element =>{
        element.style.display = 'none';
    });
}

// clear grid
function resetAll(){
    //reset everything

    const divs = document.querySelectorAll('#grid div');
    divs.forEach(div=>{
        div.classList.remove(circleCls);
        div.classList.remove(crossCls);
        startGame();
    });
}
//quit btn
const quitBtn = document.querySelector('.quit');
quitBtn.addEventListener('click', quit)
function quit(){
    console.log("quit");
    startGameScreen();
    resetAll();
    circlePoints = 0;
    crossPoints = 0;
    countTies = 0;

    blueScore.innerHTML = 0;
    ties.innerHTML = 0;
    orangeScore.innerHTML = 0;
}

//next round button
const nextRoundBtn = document.querySelector('.next-rd');
nextRoundBtn.addEventListener('click', nextRound);
function nextRound(){
    console.log("Next Round");

    // load a new game
    mainGameScreen();
    resetAll();
}



//display start screen
function startGameScreen(){
    startScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
    endScreen.style.display = 'none';

    console.log('player1: ',playerOneChoice(player1));
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
    
    // remove event listener from the reset btn
    resetBtn.removeEventListener('click', resetFunction);
}
//

//choose player-1
function playerOneChoice(player1){
    // circle or cross?
    let playerOne = player1.id.slice(7);
    return playerOne;
    
}

let winner;
// check the current condition of board
function checkWin(currentCls){
    // loop through the patterns

    winPatterns.forEach(win=>{
        // detect player's win
        if(document.getElementById(win[0]).classList == currentCls && 
        document.getElementById(win[1]).classList == currentCls &&
        document.getElementById(win[2]).classList == currentCls){
            console.log(currentCls, 'wins!!!');
            //stop responding to clicks 
            grid.forEach(element=>{
                element.removeEventListener('click', handeClick);
            });
            winner = true;
            //display end screen
            displayEnd(currentCls, winner);
            addPoint(currentCls);
            showScore(currentCls);
            return winner;
        }
    });
    
}

//check tie
function checkTie(currentCls){
    if(! checkWin(currentCls)){
        console.log("it's a tie");
        displayEnd(currentCls, false);
        addPoint(false);
        showScore(currentCls);
    }
}

//add point to the winner
function addPoint(winner){
    if(winner == circleCls){
        circlePoints ++;
    }else if(winner == crossCls){
        crossPoints ++;
    }else{
        countTies ++;
        console.log("Ties :", countTies);
    }
}
function showScore(winner){

    ties.innerHTML = countTies;
    // display players' boxes acording to their icons
    if(playerOneChoice(player1) == circleCls){
        blueBox.style.backgroundColor = 'var(--light-yellow)';
        orangeBox.style.backgroundColor = 'var(--light-blue)';
        iconBlueBox.innerHTML = '0 (P1)';
        iconOrangeBox.innerHTML = 'X (P2)';
        blueScore.innerHTML = circlePoints;
        orangeScore.innerHTML = crossPoints;
    }else{
        blueBox.style.backgroundColor = 'var(--light-blue)';
        orangeBox.style.backgroundColor = 'var(--light-yellow)';
        iconBlueBox.innerHTML = 'X (P1)';
        iconOrangeBox.innerHTML = 'O (P2)'
        orangeScore.innerHTML = circleCls;
        blueScore.innerHTML = crossPoints;
    }

}

function displayEnd(currentCls ,win){
    endGameScreen();

    if(win){
        // hide other elements
        restartElements.forEach(element=>{
            element.style.display = 'none';
        });
        multiplayerEndScreen.forEach(element =>{
            element.style.display = 'inline-flex';
        });
        winnerText.style.display = 'block';    
            
        //display multiplayer class elements
        multiplayerEndScreen.forEach(element=>{
            element.style.display = 'inline-flex';
        });
        //display winner's symbol, number and color;
        displayWinnerAndColor(currentCls);
         // hide tie message
        tieText.style.display = 'none';
    }else{
        //display tie and hide winner messages
        tieText.style.display = 'block';
        winnerElements.forEach(element=>{
            element.style.display = 'none';
        });
        multiplayerEndScreen.forEach(element =>{
            element.style.display = 'none';
        });
    }
    // hide solo-game message
    soloEndScreen.forEach(element =>{
        element.style.display = 'none';
    });

    endBtns.forEach(button=>{
        button.style.display = 'block';
    });

}

function displayWinnerAndColor(currentCls){
    let src;
    let color;
    let player = playerOneChoice(player1);
    if(currentCls == circleCls){
        src = 'o'
        color = 'var(--light-yellow)';
    }else{
        src = 'x'
        color = 'var(--light-blue)';
    }

    // assignm number of winner
    if(currentCls == player){
        winnerNum.innerHTML = '1';
    }else{
        winnerNum.innerHTML = '2';
    }

    winnerSymbol.src = `assets/icon-${src}.svg`;
    winnerText.style.color = color;
}


function startGame() {
    count = 0;
    // re-activate event Listener
    resetBtn.addEventListener('click', resetFunction);

    // assign player1's turn and symbol
    if(playerOneChoice(player1) == circleCls){
        circleTurn = true;
    }else{
        circleTurn = false;
    }
    grid.forEach(element =>{
        element.addEventListener('click', handeClick, {once: true});
    });
}

let count = 0;
function handeClick(e) {
    count ++;
    const box = e.target;
    const currentCls = circleTurn  ? circleCls : crossCls; 
    placeMark(box,currentCls);
    checkWin(currentCls);
    showTurn(circleTurn); // show whose turn it is
    showHoverState(box);
    console.log(count);
    if(count == 9){
        checkTie(currentCls);
    }
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