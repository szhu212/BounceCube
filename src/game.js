import Player from "./player"
import Level from "./level"

export default class Game {

    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.keysTracker = {};
        this.moving = false;
        this.currentLevel = 0      
        this.registerEvents();
        this.restart(this.currentLevel);
        // debugger
    }

    play() {
        // debugger
        this.moving = true
        // debugger
        if (Object.values(this.keysTracker).length > 0 && Object.values(this.keysTracker).some(val => val ===true))
        {this.animate()};
      }

    restart(currentLevel) {
        this.moving = false;
        this.time = 0;
        this.level = new Level(this.dimensions, currentLevel);
        this.player = new Player(this.dimensions, this.keysTracker, this.level);
        this.numTargets = 1
        this.animate();
        // debugger
    }

    keyDownHandler(e) {
        // debugger
        this.keysTracker[e.keyCode] = true;
        if(!this.moving){
            this.play()
        }
    
        this.player.pushPlayer(this.keysTracker)
        // debugger
    }

    keyUpHandler(e) {
        // debugger
        this.keysTracker[e.keyCode] = false;
    }
    
    registerEvents() {
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        document.addEventListener('keydown', (e) => {
            this.keyDownHandler(e)
        });
        document.addEventListener('keyup', (e) => {
            this.keyUpHandler(e)
        });
    }


    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.level.animate(this.ctx, this.player)
        this.player.animate(this.ctx)
        this.numTargets = this.level.numTargets
        console.log(this.numTargets)
        console.log(this.currentLevel)
        // debugger
        if (this.numTargets === 0) {
            this.currentLevel += 1
            this.restart(this.currentLevel)
        }
        if (this.moving) {
            requestAnimationFrame(this.animate.bind(this))
        }
    }

}