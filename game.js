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


const restartElements = document.querySelectorAll('.restart');

const grid = document.querySelector('#grid').childNodes;
//add cross to the grid-square
grid.forEach(box => {
    box.addEventListener('click', ()=>{
        console.log("clicked" ,box.id);
        //test
        box.classList.add('cross');
        // box.classList.add('circle');
    })
});

// get elements 

// starting screen element
const startScreen = document.querySelector('#start-board');
console.log("start board", startScreen);

// buttons
const cpuBtn = document.querySelector('#cpu-btn');
const playerBtn = document.querySelector('#player-btn');
//choosing player 1's mark
const playerChoice = document.querySelector('#p1-choice').childNodes; 
console.log(playerChoice);
const squareIcon = document.querySelector('.x');
const circleIcon = document.querySelector('.o');

// add event listeners

// add classname to chosen icon ONLY !



// multiplayer or solo
cpuBtn.addEventListener('click', ()=>{
    game('cpu');
});
playerBtn.addEventListener('click', ()=>{
    game('player');
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

function multiplayerGame(){
    
}



// load starting screen
startGameScreen();

function game(x){
    console.log(x);

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