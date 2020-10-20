/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ "./src/level.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.js");




class Game {

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
        this.level = new _level__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions, 0)
        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](this.dimensions, this.keysTracker, this.level)
        this.totalTarget = _util__WEBPACK_IMPORTED_MODULE_2__["LEVELS"][0].flat().filter(el => el ===2).length
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
        this.level = new _level__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions, currentLevel);
        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](this.dimensions, this.keysTracker, this.level);
        this.totalTarget = _util__WEBPACK_IMPORTED_MODULE_2__["LEVELS"][this.currentLevel].flat().filter(el => el ===2).length;  
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
            this.ctx.fillText(`${_util__WEBPACK_IMPORTED_MODULE_2__["levelInstruction"][this.currentLevel]}`, 200, 140);
            this.ctx.strokeText(`${_util__WEBPACK_IMPORTED_MODULE_2__["levelInstruction"][this.currentLevel]}`, 200, 140);
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
        return this.currentLevel >= Object.keys(_util__WEBPACK_IMPORTED_MODULE_2__["LEVELS"]).length || (this.numLife < 1)
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
        _util__WEBPACK_IMPORTED_MODULE_2__["scores"].forEach(el => {
            highScores.push(el.score) 
        })

        let lowestRecord = Math.max(...highScores)
        let name = ''
        
        if((finalScore < lowestRecord || _util__WEBPACK_IMPORTED_MODULE_2__["scores"].length < 5) && this.numLife >= 1) {
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
                Object(_util__WEBPACK_IMPORTED_MODULE_2__["submitScore"])(name, finalScore)
            })
        } 
    }
    
    timeSinceRoundStart(){
        return (Date.now() - this.roundStartTime)/1000;
    }

}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
 

const musicButton = document.getElementById('music-button')
const musicIcon = document.getElementById('music-icon')
const music = document.getElementById('music')
let playingMusic = false
musicButton.addEventListener('click', handleMusic)

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("game-canvas");
    music.muted = true;
    new _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas)
})

function handleMusic() {
    if (playingMusic){
        playingMusic = false;
        musicIcon.src = './play-music.png'
        musicButton.className = ''
        music.pause()
    } else {
        playingMusic = true
        musicIcon.src = './stop-music2.png'
        musicButton.className = ''
        musicButton.classList.add('music-playing')
        music.volume = 0.2
        music.play()
        music.muted = false;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (playingMusic);



/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Level; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");



class Level {

    constructor(dimensions, currentLevel){
        this.dimensions = dimensions;
        this.level = JSON.parse(JSON.stringify(_util__WEBPACK_IMPORTED_MODULE_0__["LEVELS"]))[currentLevel];
        this.currentLevel = currentLevel;
        this.bricks = {};
        this.targetLength = 10;
        this.targets = {};
        this.numTargets = 0;
        this.color = '0,92,175';
        this.bombs = {}
    };
 
    drawLevel(ctx, player) {
        const wallWidth = this.dimensions.width / this.level[0].length
        const wallHeight = this.dimensions.height / this.level.length
        this.numTargets = Object(_util__WEBPACK_IMPORTED_MODULE_0__["myCount"])(this.level.flat(), 2)
        for(let row = 0; row < this.level.length; row ++){
            for(let col= 0; col < this.level[0].length; col++){
                let leftStart = col * wallWidth;
                let upStart = row * wallHeight
                
                if(this.level[row][col] === 1){
                    const image = new Image();
                    image.src = './brick.png';
                    image.onload = function () {
                        ctx.drawImage(image, leftStart, upStart, wallWidth, wallHeight);
                    }
                    ctx.drawImage(image, leftStart, upStart, wallWidth, wallHeight);
                   this.bricks[[row, col]] = {
                        left : leftStart, top:upStart, 
                        right : (leftStart + wallWidth), 
                        bottom : (upStart + wallHeight)
                    }
                }
                else if (this.level[row][col] === 3) {
                    const bombImg = new Image();
                    bombImg.src = './bomb.png';
                    bombImg.onload = function () {
                        ctx.drawImage(bombImg, leftStart, upStart, wallWidth, wallHeight);
                    }
                    ctx.drawImage(bombImg, leftStart, upStart, wallWidth, wallHeight);
                    this.bombs[[row, col]] = {
                        left : leftStart, top:upStart, 
                        right : (leftStart + wallWidth), 
                        bottom : (upStart + wallHeight)
                    }
                }
                else if(this.level[row][col] === 2){
                    if(col === 0) {
                        leftStart += _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].BOARDER_WIDTH
                    }
                    if(row === this.level.length){
                        upStart -= _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].BOARDER_WIDTH
                    }
                    let targetColor
                    let pos = row + ',' + col
                    if (Object.keys(this.targets).includes(pos)){
                        targetColor = this.targets[[row,col]]
                    } else {
                        targetColor = this.randomColor()
                    }
                    ctx.fillStyle = `rgb(${targetColor})`
                    ctx.fillRect(leftStart, upStart, this.targetLength, this.targetLength)
                    let currentTarget = {left : leftStart, top:upStart, right : (leftStart + this.targetLength), bottom : (upStart + this.targetLength), color: targetColor}
                    this.targets[[row, col]] = targetColor
                    if(Object(_util__WEBPACK_IMPORTED_MODULE_0__["_overlap"])(player.bounds(), currentTarget)){
                        Object(_util__WEBPACK_IMPORTED_MODULE_0__["playBeep"])()
                        this.level[row][col] = 0
                        this.color = currentTarget.color
                        const gamePage = document.getElementById('game-page')
                        gamePage.style.backgroundColor = `rgba(${this.color}, 0.6)`
                    }
                }
            }
        }
    }

    drawBackground(ctx){
        ctx.fillStyle = "rgba(255,255,255,0.4)"
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);     
    }

    randomColor(){
        let num = Math.floor(Math.random() * 15)
        return _util__WEBPACK_IMPORTED_MODULE_0__["colors"][num]
    }

    animate(ctx, player) {
        this.drawBackground(ctx);
        this.drawLevel(ctx, player);    
    }
   

}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");


class Player {

    constructor(dimensions, keysTracker = {}, level) {
        this.dimensions = dimensions;
        this.x = _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].BOARDER_WIDTH;
        this.y = this.dimensions.height - _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].EDGE 
        this.velX = 0;
        this.velY = 0; 
        this.keysTracker = keysTracker;
        this.level = level;
        this.collisionAdj = 0;
        this.levelOver = false
    }


    drawPlayer(ctx) {
        ctx.fillStyle = `rgb(${this.level.color})`;
        ctx.fillRect(this.x, this.y, _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].PLAYER_WIDTH, _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].PLAYER_HEIGHT);
    }

    updatePlayer(keysTracker) {
        // console.log(this.level.currentLevel)
        if (keysTracker[_util__WEBPACK_IMPORTED_MODULE_0__["KEYS"].UP]){
             this.velY -= 1 * _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].UP_SPEED 
        }
        if (keysTracker[_util__WEBPACK_IMPORTED_MODULE_0__["KEYS"].LEFT]) {  
            this.velX -= _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].HORIZENTAL_SPEED 
        }
        if (keysTracker[_util__WEBPACK_IMPORTED_MODULE_0__["KEYS"].RIGHT]){         
            this.velX +=  _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].HORIZENTAL_SPEED 
        }
        this.velX *= _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].FRICTION  
        if(this.y < 390){
            this.velY += _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].GRAVITY 
        }   
        if(this.velY > 0){
            this.velY -= _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].AIR_FRICTION 
        } else {
            this.velY += _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].AIR_FRICTION
        }   
        if(Math.abs(this.velX) > _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].MAX_SPEED ){
                if(this.velX > 0) {
                    this.velX = _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].MAX_SPEED 
                } else {
                    this.velX = - 1 * _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].MAX_SPEED 
                }
        }
        
        if(Math.abs(this.velY) > _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].MAX_SPEED){
            if(this.velY > 0) {
                this.velY = _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].MAX_SPEED
            } else {
                this.velY = -1 * _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].MAX_SPEED
            }
        }

        if (this.collideWithBrick()){
            this.resolveCollision()
        }
 
        let levelSpeedAdj = this.level.currentLevel * 0.15 + 1
        this.x += this.velX * levelSpeedAdj
        this.y += this.velY * levelSpeedAdj
        if (this.x > this.dimensions.width - _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].PLAYER_WIDTH - _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].BOARDER_WIDTH) {            this.x = this.dimensions.width - _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].PLAYER_WIDTH - _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].BOARDER_WIDTH
            this.x = this.dimensions.width - _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].PLAYER_WIDTH - _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].BOARDER_WIDTH
        }  else if (this.x < 0) {
            this.x = _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].BOARDER_WIDTH
        }
        if (this.y > this.dimensions.height - _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].PLAYER_HEIGHT) {
            this.y = this.dimensions.height - _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].PLAYER_HEIGHT
        }  
        else if (this.y < 0) {
            this.y = 0
        }    
    }

    bounds(){
        return {
            left: this.x,
            right: (this.x + _util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].PLAYER_WIDTH), 
            top: this.y, 
            bottom: (this.y +_util__WEBPACK_IMPORTED_MODULE_0__["CONSTANTS"].PLAYER_HEIGHT)
        }
    }

    animate(ctx, keysTracker) {
        this.updatePlayer(keysTracker);
        this.drawPlayer(ctx);
      
    }

    collideWithBrick(){
        let collision = false;
        Object.values(this.level.bricks).forEach(
            brick => {
            if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["_overlap"])(brick, this.bounds())){
                collision = true;
            }
            })
        return collision;
    }

    collideWithBomb(){
        Object.values(this.level.bombs).forEach(
            bomb => {
            if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["_overlap"])(bomb, this.bounds())){
                this.levelOver = true
            }
            })
        return this.levelOver;
    }

    // collisionDir(){
    //     let collisionType = [null, null];
    //     if(!this.collideWithBrick()){return collisionType}

    //     const _overlapDir = (rect1, rect2) => {
    //         if (rect1.right >= rect2.left && rect1.right <= (rect2.left + rect2.right)/2){
    //             collisionType[0] ="left"
    //         } else if (rect1.left <= rect2.right && rect1.left <= (rect2.left + rect2.right)/2){
    //             collisionType[0] = "right"
    //         }
    //         if(rect1.bottom <= rect2.top && rect1.bottom >= (rect2.top + rect2.bottom)/2){
    //             collisionType[1] = "top"
    //         } else if (rect1.top <= rect2.bottom && rect1.top <= (rect2.top + rect2.bottom)/2) {
    //             collisionType[1] = "bottom"
    //         }
    //     }

    //     this.level.bricks.forEach(brick => {
    //         _overlapDir(this.bounds(), brick)
    //     })
    //     console.log(collisionType)
    //     return collisionType;
    // }

    collisionDir(){
        let collisionDir = [null, null]
        const _overlapDir = (rect1, rect2) => {
            const width1 = rect1.right - rect1.left
            const width2 = rect2.right - rect2.left
            const height1 = rect1.bottom - rect1.top
            const height2 = rect2.bottom - rect2.top
            const centerDistX = (rect1.left + rect1.right)/2 - (rect2.left + rect2.right)/2
            const centerDistY = (rect1.bottom + rect1.top)/2 - (rect2.bottom + rect2.top)/2
            const avrWidth = (width1 + width2)/2
            const avrHeight = (height1 + height2)/2
            const distX = avrWidth - Math.abs(centerDistX)
            const distY = avrHeight - Math.abs(centerDistY)

           
            if (Math.abs(centerDistX) < avrWidth && Math.abs(centerDistY) < avrHeight){
                if (distX >= distY){
                    if (centerDistY > 0){
                        collisionDir[1] = "top";
                        this.collisionAdj = distY
                    }
                    else {
                        collisionDir[1] = "bottom";
                        this.collisionAdj = -distY
                    }
                }
                else {
                    if(centerDistX < 0){
                        collisionDir[0] = "right";
                        this.collisionAdj = -distX
                    } else {
                        collisionDir[0] = "left";
                        this.collisionAdj = distX
                    }
                }
            }
        }

        Object.values(this.level.bricks).forEach(
            brick => {
            _overlapDir(this.bounds(), brick)
        })
        return collisionDir
    }

    resolveCollision(){
        if (this.collideWithBrick()){
            if (this.collisionDir()[0] === "right"){
                this.x += this.collisionAdj
                if(this.velX !== 0) {
                    this.velX *= -1
                } else {
                    this.velX = 0.1
                }
            }

            if (this.collisionDir()[0] === "left"){
                this.x += this.collisionAdj
                if(this.velX !== 0) {
                    this.velX *= -1
                } else {
                    this.velX = -0.1
                }
            }
            if (this.collisionDir()[1] === "top"){
                    this.y += this.collisionAdj
                    this.velY *= -1
            }
            if (this.collisionDir()[1] === "bottom"){
                this.y += this.collisionAdj
                 if(this.velY<0 && this.velY > -2){
                this.velY =0 
               } else {
                     this.velY *= -1
                }
                 this.bottomCollision = true 

            }
            this.collisionAdj = 0
        }

    }


    

}



/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: CONSTANTS, KEYS, LEVELS, levelInstruction, colors, _overlap, myCount, scores, renderScores, submitScore, playBeep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() { return CONSTANTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEYS", function() { return KEYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVELS", function() { return LEVELS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelInstruction", function() { return levelInstruction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return colors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_overlap", function() { return _overlap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myCount", function() { return myCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scores", function() { return scores; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderScores", function() { return renderScores; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "submitScore", function() { return submitScore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playBeep", function() { return playBeep; });
const CONSTANTS = {
    // GRAVITY: 0.8,
    GRAVITY: 1.0,
    FRICTION: 0.8,
    AIR_FRICTION: 0.4,
    PLAYER_WIDTH: 15,
    PLAYER_HEIGHT: 15,
    UP_SPEED: 2,
    HORIZENTAL_SPEED: 1,
    MAX_SPEED: 5,
    // MAX_SPEED: 4,
    EDGE: 14,
    BOARDER_WIDTH : 0
}

const KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39
}

const LEVELS = {

    // 0: [
    //     [1,1,1,1,1,0,0],
    //     [1,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,2],
    //     [0,2,0,0,0,0,0],
    //     [0,0,0,0,0,0,0],
    //     [1,1,1,0,0,0,0],
    //     [0,0,0,2,0,0,0],
    //     [0,0,0,0,0,0,0],
    //     [2,0,0,0,0,0,0],
    //     [0,0,0,0,0,2,0],
    //     [0,0,1,1,1,0,0]
    // ],
    0: [
        [1,1,1,1,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,2],
        [1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,2,1],
        [0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,2,0,0,0,0,0,0],
        [0,2,0,0,0,0,0,0,0],
        [0,0,1,1,1,3,0,0,0]
    ],
    1: [
        [1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,2,0,0,1],
        [0,0,1,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,2,0,0,0,0],
        [1,0,0,2,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0],
        [1,1,1,3,1,1,1,1,0,0],
        [0,0,2,0,0,0,1,0,0,1],
        [0,2,0,0,0,0,0,0,0,1],
        [0,0,1,1,1,1,1,1,1,1]
    ],
    2: [
        [0,0,0,0,0,0,0,0,2,0],
        [0,1,1,1,0,1,3,1,1,0],
        [0,1,2,1,0,1,0,0,1,0],
        [0,1,0,0,0,0,0,2,1,0],
        [0,1,0,0,0,0,0,1,0,0],
        [0,1,1,3,0,0,0,1,0,0],
        [0,0,0,1,0,0,1,2,0,0],
        [0,0,0,1,0,0,1,0,0,0],
        [0,0,2,1,0,1,0,0,2,0],
        [0,1,0,1,0,1,0,0,1,0],
        [0,1,1,1,0,1,1,1,0,0]
    ],
    3: [
        [0,1,0,1,0,3,0,0,2,0],
        [0,1,0,1,0,1,3,0,1,0],
        [0,1,2,1,0,1,0,0,1,2],
        [0,1,0,0,0,0,0,2,0,0],
        [0,1,0,0,0,0,2,1,0,0],
        [0,1,0,3,0,0,0,1,0,0],
        [0,0,0,1,2,3,0,1,0,0],
        [0,0,0,1,0,1,0,1,2,0],
        [0,0,2,3,0,1,0,1,0,0],
        [0,1,0,1,0,1,0,1,3,0],
        [0,1,0,1,0,1,0,1,0,0]
    ]
}


const levelInstruction = {
    0: "Have Fun!",
    1: "Level up. Great Job!",
    2: "Level up. Be ware of the bombs!",
    3: "Final stage! Good luck, chanllenger!"
}

const colors = {
    0: "255, 186, 132",
    1: "98, 41, 84",
    2: "137, 145, 107",
    3: "145, 180, 147",
    4: "102, 186, 183",
    5: "30, 136, 168",
    6: "123, 144, 210",
    7: "155, 144, 194",
    8: "238, 169, 169",
    9: "93, 172, 129" ,
    10: "24, 60, 138",
    11: "219, 77, 109",
    12: "253, 153, 102",
    13: "190, 194, 63",
    14: "180, 129, 187",
    15: "247, 92, 47",
    16: "241, 124, 103"
}


const _overlap = (rect1, rect2) => {
    if (rect1.left > rect2.right || rect1.right < rect2.left) {
        return false;
    }
    if (rect1.top > rect2.bottom || rect1.bottom < rect2.top){
        return false;
    }
    return true;
}

const myCount = (arr, target) => {
    return arr.filter(el => el === target).length
} 

let fetchScores = firebase.database().ref('scores').orderByChild('score').limitToFirst(5)

const scores = []
 
fetchScores.on('child_added', snapshot => {
    // debugger
    scores.push(snapshot.val())
    let highScoreDiv = document.getElementById('high-scores')
    highScoreDiv.innerHTML = ""
    scores.sort(compare)
    scores.forEach(el=> {
        let name = el.name.length === 0? "Unamed Player" : el.name
        let score = el.score
        let highScoreP = document.createElement('p')
        highScoreP.innerHTML = `${name} ${score}s`
        highScoreDiv.appendChild(highScoreP)
    })
})

async function renderScores () {
    let asyncFetchScores = firebase.database().ref('scores').orderByChild('score').limitToFirst(5)
    let asyncScores = []
    let vals = await asyncScores
    asyncFetchScores.on('child_added', snapshot => {
        asyncScores.push(snapshot.val())
        let highScoreDiv = document.getElementById('high-scores')
        highScoreDiv.innerHTML = ""
        vals.sort(compare)
        vals.forEach(el=> {
            let name = el.name.length === 0? "Unamed Player" : el.name
            let score = el.score
            let highScoreP = document.createElement('p')
            highScoreP.innerHTML = `${name} ${score}s`
            highScoreDiv.appendChild(highScoreP)
        })
    })
}

const compare = (a, b) => {
    const scoreA = a.score
    const scoreB = b.score

    let comparison = 0
    if (scoreA > scoreB) {
        comparison = 1
    } else if (scoreA < scoreB){
        comparison = -1
    } 
    return comparison
}

const submitScore = (name, score) => {
    firebase.database().ref('scores').push({name: name, score: score})
    let recordSubmissionDiv = document.getElementById("record-submission") 
    recordSubmissionDiv.innerHTML = ''
    renderScores()
}

const scoreSound = new Audio('./score-sound.mp3')
const playing = document.getElementById('music-button')

const playBeep = () => {
    if (Object.values(playing.classList)[0] === 'music-playing')
    scoreSound.play()
}


/***/ })

/******/ });
//# sourceMappingURL=main.js.map