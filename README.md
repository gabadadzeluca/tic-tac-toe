## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)



## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the game either solo vs the computer or multiplayer against another person


### Screenshot

![]()



### Links

- Solution URL: [GitHub](https://github.com/gabadadzeluca/tic-tac-toe)
- Live Site URL: [Live URL]()

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript


### What I learned

I learnt about array methods and eventListeners. Used timeouts and interacted with global variables. Made some higher order functions to make it easier and more readable.


```js
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
```


### Continued development

I think the cpu part was the probably the hardest, even though it's not based on any algorithms at the moment. I wasn't able to use circleTurn and currentCls variables properly beacuse of the nature of the handleClick function. I had to change those properties in process and come up with other idea instead of the simple one it could've been.


### Useful resources

I used videos on youtube to explain the proccess of the game and the use of some functions which I too edited and implenmented.

- Video [](https://www.youtube.com/watch?v=Y-GkMjUZsmM)



## Author

- LinkedIn - [Luca Gabadadze](https://www.linkedin.com/in/luca-gabadadze-6068b324a/)
