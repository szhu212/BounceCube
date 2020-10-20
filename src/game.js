import Player from "./player"
import Level from "./level"
import {levelInstruction, LEVELS, scores, submitScore} from "./util"

export default class Game {

    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.keysTracker = {};
        this.isRunning = false;
        this.currentLevel = 0; 
        this.totalTarget = 0;
        this.numLife = 3;
        this.registerEvents();
        this.startGame();
        this.isGameOver = false;
        this.isGameLost = false;
        this.scores = [];
        this.playingMusic = false;
        this.animate = this.animate.bind(this);
        this.roundStartTime;
        this.hitBomb = false;
        this.finalScore;
    }

    play() {
        this.isRunning = true;
        this.animate();
    }
    
    // to start a new game
    startGame(){
        this.currentLevel = 0
        this.roundStartTime = Date.now()
        this.isGameOver = false;
        this.isGameLost = false;
        this.isRunning = false;
        this.startTime = Date.now();
        this.numLife = 3
        this.level = new Level(this.dimensions, 0)
        this.player = new Player(this.dimensions, this.keysTracker, this.level)
        this.totalTarget = LEVELS[0].flat().filter(el => el ===2).length
        this.level.animate(this.ctx, this.player)
        this.player.animate(this.ctx, this.keysTracker)
        this.drawGameStartText()
        this.drawTimer()
        this.drawCounter()
    }

    // to start a level (restart current level or start the next level)
    startNewLevel(currentLevel){
        this.roundStartTime = Date.now()
        this.isRunning = false;
        this.level = new Level(this.dimensions, currentLevel);
        this.player = new Player(this.dimensions, this.keysTracker, this.level);
        this.totalTarget = LEVELS[this.currentLevel].flat().filter(el => el ===2).length;  
    }

    keyDownHandler(e) {
        this.keysTracker[e.keyCode] = true;
        // when pressed R for restart
        if (this.keysTracker["82"]){
            this.keysTracker["82"] = false
            this.hitBomb = false
            const gameoverPage = document.getElementById("gameover-box")
            gameoverPage.style.opacity = "0"; 
            if(this.isGameOver || this.isGameLost){
                this.startGame()
            }
        }
        if(!this.isRunning && !this.isGameOver && !this.isGameLost){
            if(this.currentLevel === 0 && this.hitBomb === false){
                this.startTime = Date.now()
            }
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
        if (this.timeSinceRoundStart === 0 && this.currentLevel === 0){this.timer = 0}
        this.ctx.font = '20px Dosis'
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.strokeStyle = 'skyblue';
        this.ctx.fillText(`${this.timer}`, this.canvas.width - 60, 20);
        this.ctx.strokeText(`${this.timer}`, this.canvas.width - 60, 20);

    }

    drawCounter(){
        let numTarget = this.numTargets || 4
        let counterText = `${numTarget}/${this.totalTarget}` 
        this.ctx.font = '20px Dosis';
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.strokeStyle = 'skyblue';
        this.ctx.fillText(counterText, this.canvas.width -60, 50);
        this.ctx.strokeText(counterText, this.canvas.width -60, 50);
        let numLife = this.numLife || 3
        this.ctx.strokeStyle = 'skyblue';
        let textLife = (numLife === 1) ?  'Life' : 'Lives'
        this.ctx.fillText(`${numLife}/3 ${textLife}`, this.canvas.width -90, this.canvas.height -10);
        this.ctx.strokeText(`${numLife}/3 ${textLife}`, this.canvas.width -90, this.canvas.height -10);
     }


    animate(){
        if (this.isGameOver){
            this.isRunning = false;
            this.gameoverFrame(this.finalScore)
        }
        if(this.isGameLost){
            this.isRunning = false;
            this.gameLostFrame()
        }  

        // if the player hits a bomb, restart current level, and reduce number of lives left by one
        if(this.player.collideWithBomb()){
            this.hitBomb = true;
            this.numLife -= 1

            if(this.gameover()){
                this.currentLevel = 0
                this.isGameLost = true
            }else{
                this.roundStartTime = Date.now()
                this.startNewLevel(this.currentLevel)
            }
        }

        // if all targets are cleared, start the next level. If there is no more new level, go to gameover frame
        if (this.numTargets === 0) {
            this.currentLevel += 1;
            if(this.gameover()){
                this.finalScore = this.timer.toString()
                this.currentLevel = 0
                this.isGameOver = true
            } else {
                this.startNewLevel(this.currentLevel)
            }
        }
        this.ctx.font = 'Dosis'
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.level.animate(this.ctx, this.player)
         // display hit bomb message
         if (this.hitBomb) {
            this.drawHitBombText();
        }
        this.player.animate(this.ctx, this.keysTracker)
        this.numTargets = this.level.numTargets
        this.drawTimer()
        this.drawCounter()
       
        // display level up message when a new level starts, unless hitbomb message is already displayed
        if(this.timeSinceRoundStart() < 4 && !this.hitBomb) {
            this.drawLevelUpText()
        }
        if (this.isRunning) {
            setTimeout(function() {
                 requestAnimationFrame(this.animate.bind(this))
            }.bind(this), 1000/100);
        }
    }

    drawLevelUpText(){
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

    drawGameStartText(){
        if (this.isRunning === false && this.currentLevel === 0) {
            this.ctx.save()
            this.ctx.font = '25px Dosis'
            this.ctx.fillStyle = 'rgba(255,255,255)';
            this.ctx.shadowColor = 'rgba(0,0,0,0.7)'
            this.ctx.shadowBlur = 5
            this.ctx.fillText("Press the ↑ ← → buttons on your keyboard to navigate your cube", this.canvas.width / 12,this.canvas.height *2/ 5, this.canvas.width * 5 / 6)
            this.ctx.font = '20px Dosis'
            this.ctx.fillText("← Your Cube", 20,this.canvas.height -5)
            this.ctx.restore();
        }
    }

    drawHitBombText(){ 
        if (this.timeSinceRoundStart() < 3){
            this.ctx.save()
                this.ctx.font = '25px Dosis'
                this.ctx.fillStyle = 'red';
                this.ctx.strokeStyle = 'white'
                let textLife = (this.numLife === 1) ?  'life' : 'lives'
                this.ctx.fillText(
                    "Oops! You hit a bomb, level restarted", 
                    this.canvas.width / 8,this.canvas.height * 5 / 11, 
                    this.canvas.width * 2 / 3
                    )
                this.ctx.fillText(
                    `${this.numLife} ${textLife} left`, 
                    this.canvas.width / 3,this.canvas.height * 6 / 11
                    )
                this.ctx.strokeText(
                    "Oops! You hit a bomb, level restarted", 
                    this.canvas.width / 8,this.canvas.height * 5 / 11, 
                    this.canvas.width * 2 / 3
                )
                this.ctx.strokeText(
                    `${this.numLife} ${textLife} left`, 
                    this.canvas.width / 3,this.canvas.height * 6 / 11
                    )
                this.ctx.restore();
        } else {
            this.hitBomb = false;
        }   
    }

    gameover(){
        //gameover if all levels are cleared or the three lives are used up
        return this.currentLevel >= Object.keys(LEVELS).length || (this.numLife < 1)
    }

    // display a game lost screen when all three lives are used up
    gameLostFrame(){
        let recordSubmissionDiv = document.getElementById("record-submission") 
        recordSubmissionDiv.innerHTML = ''
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        const gamePage = document.getElementById('game-page')
        gamePage.style.backgroundColor = 'orange'
        const gameoverBox = document.getElementById('gameover-box')
        gameoverBox.style.transition = 'all 1s ease-in-out;'
        gameoverBox.style.opacity = 1;
        let gameoverMessageP = document.createElement('p')
        const gameoverH2 = document.getElementById("gameover-title")
        gameoverH2.innerHTML = 'Gameover !'
        gameoverMessageP.innerHTML = `All 3 lives are used up. Wish you better luck next time!`
        const  gameoverMessage = document.getElementById("gameover-messsage")
        gameoverMessage.innerHTML = '';
        gameoverMessage.appendChild(gameoverMessageP)
    }

    // display a gameover screen when all levels are cleared
    gameoverFrame(finalScore){
        let recordSubmissionDiv = document.getElementById("record-submission") 
        recordSubmissionDiv.innerHTML = ''
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        const gamePage = document.getElementById('game-page')
        gamePage.style.backgroundColor = 'orange'
        const gameoverBox = document.getElementById('gameover-box')
        gameoverBox.style.transition = 'all 1s ease-in-out;'
        gameoverBox.style.opacity = 1;
        let gameoverMessageP = document.createElement('p')
        let minutes = Math.floor(this.timer / 60)
        let seconds = Math.floor(this.timer % 60)
        const gameoverH2 = document.getElementById("gameover-title")
        if (this.numLife >= 1) { // Updated Oct 5
            gameoverH2.innerHTML = 'You Won!'
            gameoverMessageP.innerHTML = `You spent ${minutes}M ${seconds}S to clear all levels. Congratulations!`
        }
        const  gameoverMessage = document.getElementById("gameover-messsage")
        gameoverMessage.innerHTML = '';
        gameoverMessage.appendChild(gameoverMessageP)

        gameoverH2.style.animation = "shake 0.5s";
        gameoverH2.style.animationIterationCount = 2.5;
        let highScores = []
        scores.forEach(el => {
            highScores.push(el.score) 
        })

        let lowestRecord = Math.max(...highScores)
        let name = ''
        
        if((finalScore < lowestRecord || scores.length < 5) && this.numLife >= 1) {
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
                submitScore(name, finalScore)
            })
        } 
    }
    
    timeSinceRoundStart(){
        return (Date.now() - this.roundStartTime)/1000;
    }

}