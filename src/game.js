import Player from "./player"
import Level from "./level"
import {levelMessages, levelInstruction, LEVELS} from "./util"

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
        this.startTime = this.startTime || Date.now();
        this.textTimer = 0
        this.level = new Level(this.dimensions, currentLevel);
        this.player = new Player(this.dimensions, this.keysTracker, this.level);
        this.numTargets = 1
        this.animate();
        //    this.ctx.font = '38px VT323'
        //    this.ctx.fillStyle = 'yellow';
        //     this.ctx.fillText('Level Up!', this.canvas.width / 4, 40)
        //    setTimeout(this.animate(), 2000)
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

    drawTimer(){
        const timer = Math.floor(Date.now() - this.startTime)/1000
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.fillText(`${timer}`, this.canvas.width -60, 30)
    }

    animate() {
        // console.log(this.textTimer)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.level.animate(this.ctx, this.player)
        this.player.animate(this.ctx)
        this.numTargets = this.level.numTargets
        this.drawTimer()
        this.drawText()
        // let imgData = this.ctx.getImageData(40,40,1,1)
        // debugger
        // console.log(this.numTargets)
        // console.log(this.currentLevel)
        // debugger
        if (this.numTargets === 0) {
            this.currentLevel += 1;
            this.restart(this.currentLevel)
            // this.ctx.font = '38px VT323'
            // this.ctx.fillStyle = 'yellow';
            // this.ctx.fillText('Level Up!', this.canvas.width / 4, 40)
            // this.ctx.save()
        //     debugger
        // this.ctx.font = '24px VT323';
        // this.ctx.shadowColor = 'black';
        // this.ctx.shadowOffsetX = 3;
        // this.ctx.shadowOffsetY = 3;
        // this.ctx.shadowBlur = 15;
        // this.ctx.fillStyle = 'white';
        // this.ctx.fillText("Congrats!", 50, 70);
        // this.ctx.restore()
            // setTimeout(this.restart(this.currentLevel),4000)
        }
        if (this.moving) {
            requestAnimationFrame(this.animate.bind(this))
        }
    }


    levelUpText(){
        this.textTimer += 1
        this.ctx.font = '38px VT323'
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText(`${levelMessages[this.currentLevel]}`, this.canvas.width / 3, 100)
        // this.ctx.save()
        this.ctx.font = '24px VT323';
        // this.ctx.shadowColor = 'black';
        // this.ctx.shadowOffsetX = 3;
        // this.ctx.shadowOffsetY = 3;
        // this.ctx.shadowBlur = 15;
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${levelInstruction[this.currentLevel]}`, 200, 140);
            // this.ctx.restore()
    }

    drawText(){
        if (this.textTimer < 0.5 && this.currentLevel === 0 ) {
            this.ctx.save()
            this.ctx.font = '20px Arial'
             this.ctx.fillStyle = 'rgba(255,255,255,0.7)';
             this.ctx.shadowColor = 'rgba(0,0,0,0.7)'
             this.ctx.shadowBlur = 5
            this.ctx.fillText("Press the ↑ ← → buttons on your keyboard to navigate your cube", this.canvas.width / 12,this.canvas.height *2/ 5, this.canvas.width * 5 / 6)
            this.ctx.restore();
        }
        if (this.textTimer > 0.5 && this.textTimer < 100 ){
            this.levelUpText()
        } else {
            this.textTimer += 1
        }
    }

    gameover(){
        if (this.currentLevel >= LEVELS.length){

        }
    }

}