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

// add classname to chosen icon ONLY !



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




// check the current condition of board
function checkGrid(){
    document.addEventListener('click', ()=>{ 
        // loop through the patterns
        winPatterns.forEach(win=>{
            // detect player's win
            if(document.getElementById(win[0]).classList == 'cross' && 
            document.getElementById(win[1]).classList == 'cross' &&
            document.getElementById(win[2]).classList == 'cross'){
                console.log('cross wins!!!');
                gameActive = false;
            }
            if(document.getElementById(win[0]).classList == 'circle' && 
            document.getElementById(win[1]).classList == 'circle' &&
            document.getElementById(win[2]).classList == 'circle'){
                console.log('circle wins!!!');
                gameActive = false;
            }
        });

    });


}

function multiplayerGame(){
    const playerOne = document.querySelector('.player-1');
    console.log(playerOne.id);
    let playerOneChoice = playerOne.id.substring(7);
    let playerTwoChoice;
    if(playerOneChoice == 'cross'){
        playerTwoChoice = 'circle';
    }else{
        playerTwoChoice = 'cross';
    }
    checkGrid();
    // add player icons to the grid and switch between users
    let i = 0;
    grid.forEach(box => {
        box.addEventListener('click', function turns(){
            console.log("clicked" ,box.id);
            console.log('clicks: ', i);
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

        })
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