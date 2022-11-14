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

//multiplayer gamemode end-screen
const multiplayerEndScreen = Array.from(document.querySelectorAll('.multiplayer'));
const winnerEndScreen = Array.from(document.querySelectorAll('.winner'));
//solo gamemode end-screen
const soloPlayerEndScreen = Array.from(document.querySelectorAll('.solo'));

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
function endGameScreen(gamemode,winner){
    endScreen.style.display = 'flex';
    startScreen.style.display = 'none';
    if(winner){
        document.getElementById('text-tie').style.display = 'none';
        console.log("the winner is ",winner);
        winnerEndScreen.forEach(element =>{
            element.style.display = 'inline-flex';
        })
    }
    if(gamemode == 'multiplayer'){
        multiplayerEndScreen.forEach(element =>{
            element.style.display = 'flex';
        });
        soloPlayerEndScreen.forEach(element=> {
            element.style.display = 'none';
        });
    }else //if gamemode is solo
    { 
        multiplayerEndScreen.forEach(element =>{
            element.style.display = 'none';
        });
        soloPlayerEndScreen.forEach(element=> {
            element.style.display = 'flex';
        });
    }
}




// check the current condition of board
function checkGrid(gamemode){
    document.addEventListener('click', function winner(){ 
        // loop through the patterns
        winPatterns.forEach(win=>{
            // detect player's win
            if(document.getElementById(win[0]).classList == 'cross' && 
            document.getElementById(win[1]).classList == 'cross' &&
            document.getElementById(win[2]).classList == 'cross'){
                console.log('cross wins!!!');
                gameActive = false;
                endGameScreen(gamemode, 'cross');
                document.removeEventListener('click', winner);
            }
            if(document.getElementById(win[0]).classList == 'circle' && 
            document.getElementById(win[1]).classList == 'circle' &&
            document.getElementById(win[2]).classList == 'circle'){
                console.log('circle wins!!!');
                gameActive = false;
                endGameScreen(gamemode, 'circle');
                document.removeEventListener('click', winner);
            }
        });
    });
}

function multiplayerGame(){
    let gamemode = 'multiplayer';
    const playerOne = document.querySelector('.player-1');
    console.log(playerOne.id);
    let playerOneChoice = playerOne.id.substring(7);
    let playerTwoChoice;
    if(playerOneChoice == 'cross'){
        playerTwoChoice = 'circle';
    }else{
        playerTwoChoice = 'cross';
    }
    checkGrid(gamemode);
    // add player icons to the grid and switch between users
    let i = 0;
    grid.forEach(box => {
        box.addEventListener('click', function turns(){
            console.log("clicked" ,box.id);
            console.log('clicks: ', i+1);
            if(box.classList != 'circle' && box.classList != 'cross'){
                i++;
                if(i % 2 == 0){
                    console.log('i:', i);
                    // add class chosen by player one
                    box.classList.add(`${playerOne.id.substring(7)}`);
                }else{
                    box.classList.add(playerTwoChoice);
                }
                if(i == 9){
                    gameActive = false;
                    console.log('game is over');
                    //stop loop
                    // box.removeEventListener('click', turns);
                }
            }

        });
    });

}



// load starting screen
startGameScreen();

function game(x){
    console.log("game: ",x);

    // load game
    mainGameScreen();

    // if x is cpu, load cpu game
    if(x == 'cpu'){
        soloGame();
    }else{
        //load player vs player game
        multiplayerGame();
    }
}