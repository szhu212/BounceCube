import Game from './game';
import Player from './player';

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas");
    const currentGame = new Game(canvas)
})