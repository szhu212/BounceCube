import Player from "./player"
import Level from "./level"
import { levelInstruction, LEVELS, scores, submitScore} from "./util"

export default class Game {

    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.keysTracker = {};
        this.running = false;
        this.currentLevel = 0 
        this.totalTarget = 0 
        this.registerEvents();
        this.restart(this.currentLevel);
        this.levelUp = false;
        this.gameoverTracker = false;
        this.scores = [];
        this.highestScoreMode = false; 
        this.playingMusic = false;
    }

    play() {
        this.running = true
        if (Object.values(this.keysTracker).length > 0 && Object.values(this.keysTracker).some(val => val ===true))
        {this.animate()};
      }

    restart(currentLevel) {
        this.gameoverTracker = false
        if (!this.levelUp){
            this.running = false;
        }
        this.startTime = this.startTime || Date.now();
        this.textTimer = 0
        this.numTargets = 1
        if(this.gameover()){
            this.currentLevel = 0
            this.gameoverTracker = true
            this.gameoverFrame()
        } else {
            this.level = new Level(this.dimensions, currentLevel);
            this.player = new Player(this.dimensions, this.keysTracker, this.level);
            this.totalTarget = LEVELS[this.currentLevel].flat().filter(el => el ===2).length  
            this.animate();
        }
    }

    keyDownHandler(e) {
        this.keysTracker[e.keyCode] = true;
        if (this.keysTracker["82"]&& !this.highestScoreMode){
            if (this.gameoverTracker){
                this.currentLevel = 0
                this.startTime = Date.now()
                this.running = false
                const gameoverPage = document.getElementById("gameover-box")
                gameoverPage.style.opacity = "0";   
            }  
                this.restart(this.currentLevel)
        }
        else if(!this.running && !this.highestScoreMode){
            this.play()
        }
    }

    keyUpHandler(e) {
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
        this.timer = Math.floor((Date.now() - this.startTime)/1000)
        if (this.textTimer === 0 && this.currentLevel === 0){this.timer = 0}
        this.ctx.font = '20px Dosis'
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.strokeStyle = 'skyblue';

        this.ctx.fillText(`${this.timer}`, this.canvas.width -60, 20);
        this.ctx.strokeText(`${this.timer}`, this.canvas.width -60, 20);

    }

    drawCounter(){
        let counterText = `${this.numTargets}/${this.totalTarget}`
        this.ctx.font = '20px Dosis';
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.strokeStyle = 'skyblue';
        this.ctx.fillText(counterText, this.canvas.width -60, 50);
        this.ctx.strokeText(counterText, this.canvas.width -60, 50);
     }

    animate() {
        this.ctx.font = 'Dosis'
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.level.animate(this.ctx, this.player)
        this.player.animate(this.ctx, this.keysTracker)
        this.numTargets = this.level.numTargets
        this.drawTimer()
        this.drawText()
        this.drawCounter()
        if(this.player.collideWithBomb()){
            this.restart(this.currentLevel);
            this.hitBomb = true;
            this.drawText()
        }
        if (this.numTargets === 0 && !this.gameoverTracker) {
            this.currentLevel += 1;
            this.levelUp = true;
            this.restart(this.currentLevel)
        }
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this))
        }
    }


    levelUpText(){
        this.textTimer += 1
        this.ctx.save()
        this.ctx.font = '38px Dosis'
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'yellow'
        this.ctx.fillText(`Level${this.currentLevel+1}`, this.canvas.width / 3, 100)
        this.ctx.strokeText(`Level${this.currentLevel+1}`, this.canvas.width / 3, 100)
        this.ctx.font = '28px Dosis';
        this.ctx.strokeStyle = 'skyblue'
        this.ctx.fillText(`${levelInstruction[this.currentLevel]}`, 200, 140);
        this.ctx.strokeText(`${levelInstruction[this.currentLevel]}`, 200, 140);
        this.ctx.restore();
    }

    drawText(){
        if (this.textTimer ===0) {
            this.ctx.save()
            this.ctx.font = '25px Dosis'
            // this.ctx.strokeStyle = 'blue'
            this.ctx.fillStyle = 'rgba(255,255,255)';
            this.ctx.shadowColor = 'rgba(0,0,0,0.7)'
            this.ctx.shadowBlur = 5
            this.ctx.fillText("Press the ↑ ← → buttons on your keyboard to navigate your cube", this.canvas.width / 12,this.canvas.height *2/ 5, this.canvas.width * 5 / 6)
            // this.ctx.strokeText("Press the ↑ ← → buttons on your keyboard to navigate your cube", this.canvas.width / 12,this.canvas.height *2/ 5, this.canvas.width * 5 / 6)
            this.ctx.restore();
        }
        if ((this.textTimer < 150 && this.currentLevel !== 0) || (this.currentLevel === 0 && this.textTimer < 100 && this.textTimer >0)){
            if (this.hitBomb){
                this.ctx.save()
                this.ctx.font = '25px Dosis'
                this.ctx.fillStyle = 'red';
                this.ctx.strokeStyle = 'white'
                this.ctx.fillText(
                    "Oops! You hit the bomb, level restarted", 
                    this.canvas.width / 12,this.canvas.height / 5, 
                    this.canvas.width * 5 / 6
                    )
                this.ctx.strokeText (
                    "Oops! You hit the bomb, level restarted", 
                    this.canvas.width / 12,this.canvas.height / 5, 
                    this.canvas.width * 5 / 6
                )
                this.ctx.restore();
                this.textTimer += 1
            } else {
                this.levelUpText()
            } 
        } else {
            this.textTimer += 1
        }
        if (this.textTimer >= 200 && this.hitBomb){ this.hitBomb = false}
    }

    gameover(){
        return this.currentLevel >= Object.keys(LEVELS).length
    }

    gameoverFrame(){
       
        let gameScore = this.timer
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        const gamePage = document.getElementById('game-page')
        gamePage.style.backgroundColor = 'orange'
        const gameoverBox = document.getElementById('gameover-box')
        gameoverBox.style.transition = 'all 1s ease-in-out;'
        gameoverBox.style.opacity = 1;
        let gameoverMessageP = document.createElement('p')
        let minutes = Math.floor(this.timer / 60)
        let seconds = Math.floor(this.timer % 60)
        gameoverMessageP.innerHTML = `You spent ${minutes}M ${seconds}S to clear all levels. Congratulations!`
        const  gameoverMessage = document.getElementById("gameover-messsage")
        gameoverMessage.innerHTML = '';
        gameoverMessage.appendChild(gameoverMessageP)
        const youWonH2 = document.getElementById("you-won-message")
        youWonH2.style.animation = "shake 0.5s";
        youWonH2.style.animationIterationCount = 2.5;
        let highScores = []
        scores.forEach(el => {
            highScores.push(el.score) 
        })

        let lowestRecord = Math.max(...highScores)
        let name = ''
        if(gameScore < lowestRecord || scores.length < 5 ) {
            this.highestScoreMode = true
            let recordSubmissionDiv = document.getElementById("record-submission") 
            recordSubmissionDiv.innerHTML = ''
            let highScoreMessageP = document.createElement('p')
            highScoreMessageP.innerHTML = 'You score is among the top 5 in our history! Please enter you name to be on our Best Records board ☺' 
            recordSubmissionDiv.appendChild(highScoreMessageP)
            let nameInput = document.createElement('input')
            nameInput.type = 'text'
            nameInput.placeholder = 'Please enter your name here'
            recordSubmissionDiv.appendChild(nameInput)
            nameInput.addEventListener('change', e => {
                name = e.currentTarget.value;
              });
            let submitButton = document.createElement('button')
            submitButton.innerHTML = 'Submit' 
            recordSubmissionDiv.appendChild(submitButton)
            submitButton.addEventListener('click', e => {
                this.highestScoreMode = false
                submitScore(name, gameScore)
            })
        } 
    }




}