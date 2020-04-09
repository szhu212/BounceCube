import Game from './game';
import Player from './player';

document.addEventListener("DOMContentLoaded", () => {

    // document.addEventListener('keydown', (e) => keyDownHandler, false);
    // document.addEventListener('keyup', (e) => keyUpHandler, false);
    // const keysTracker = {};
    
    // const keyDownHandler = (e) => {
    //     keysTracker[e.keyCode] = true;
    //     // debugger
    // }

    // const keyUpHandler = (e) => {
    //     keysTracker[e.keyCode] = false;
    // }
    
    const canvas = document.getElementById("game-canvas");
    // const ctx = canvas.getContext("2d");
    // const dimensions = { width: canvas.width, height: canvas.height };
    // debugger
    // const currentPlayer = new Player(dimensions, keysTracker)
    const currentGame = new Game(canvas)
  

})