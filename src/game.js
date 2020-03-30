import Player from "./player"
import Level from "./level"

export default class Game {

    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas
        this.dimensions = { width: canvas.width, height: canvas.height };
        // this.width = canvas.width;
        // this.height = canvas.height;
        this.keysTracker = {};
        this.moving = false;
        // this.level = LEVEL1;
        // this.bricks = [];
       
        this.registerEvents();
        this.restart();
        // debugger
    }

    play() {
        // debugger
        this.moving = true
        // debugger
        if (Object.values(this.keysTracker).length > 0 && Object.values(this.keysTracker).some(val => val ===true))
        {this.animate()};
      }

    restart() {
        this.moving = false;
        this.time = 0;
        this.level = new Level(this.dimensions);
        this.player = new Player(this.dimensions, this.keysTracker, this.level);
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
        // debugger
        if (this.moving) {
            requestAnimationFrame(this.animate.bind(this))
        }
    }

}