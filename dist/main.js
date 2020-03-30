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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\nclass Game {\n\n    constructor(canvas){\n        this.ctx = canvas.getContext(\"2d\");\n        this.canvas = canvas\n        this.dimensions = { width: canvas.width, height: canvas.height };\n        // this.width = canvas.width;\n        // this.height = canvas.height;\n        this.keysTracker = {};\n        this.moving = false;\n        // this.level = LEVEL1;\n        // this.bricks = [];\n       \n        this.registerEvents();\n        this.restart();\n        // debugger\n    }\n\n    play() {\n        // debugger\n        this.moving = true\n        // debugger\n        if (Object.values(this.keysTracker).length > 0 && Object.values(this.keysTracker).some(val => val ===true))\n        {this.animate()};\n      }\n\n    restart() {\n        this.moving = false;\n        this.time = 0;\n        this.level = new _level__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions, this.keysTracker, this.level);\n        this.animate();\n        // debugger\n    }\n\n    keyDownHandler(e) {\n        // debugger\n        this.keysTracker[e.keyCode] = true;\n        if(!this.moving){\n            this.play()\n        }\n    \n        this.player.pushPlayer(this.keysTracker)\n        // debugger\n    }\n\n    keyUpHandler(e) {\n        // debugger\n        this.keysTracker[e.keyCode] = false;\n    }\n    \n    registerEvents() {\n        this.keyDownHandler = this.keyDownHandler.bind(this);\n        this.keyUpHandler = this.keyUpHandler.bind(this);\n        document.addEventListener('keydown', (e) => {\n            this.keyDownHandler(e)\n        });\n        document.addEventListener('keyup', (e) => {\n            this.keyUpHandler(e)\n        });\n    }\n\n\n    animate() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)\n        this.level.animate(this.ctx, this.player)\n        this.player.animate(this.ctx)\n        this.numTargets = this.level.numTargets\n        console.log(this.numTargets)\n        // debugger\n        if (this.moving) {\n            requestAnimationFrame(this.animate.bind(this))\n        }\n    }\n\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    // document.addEventListener('keydown', (e) => keyDownHandler, false);\n    // document.addEventListener('keyup', (e) => keyUpHandler, false);\n    // const keysTracker = {};\n    \n    // const keyDownHandler = (e) => {\n    //     keysTracker[e.keyCode] = true;\n    //     // debugger\n    // }\n\n    // const keyUpHandler = (e) => {\n    //     keysTracker[e.keyCode] = false;\n    // }\n    \n    const canvas = document.getElementById(\"game-canvas\");\n    const ctx = canvas.getContext(\"2d\");\n    // const dimensions = { width: canvas.width, height: canvas.height };\n    // debugger\n    // const currentPlayer = new Player(dimensions, keysTracker)\n    const currentGame = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas)\n  \n\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: LEVEL1, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LEVEL1\", function() { return LEVEL1; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\nconst LEVEL1 = [[1,1,1,1,0],[0,0,0,0,0],[0,2,0,0,0],[0,0,0,0,2], [2,2,1,0,1]];\n\n\n\n\nclass Level {\n\n    constructor(dimensions){\n        this.dimensions = dimensions;\n        this.level = LEVEL1;\n        this.bricks = [];\n        this.targetLength = 10;\n        this.targets = [];\n        this.numTargets = 0;\n  \n    };\n \n    drawLevel(ctx, player) {\n        const wallWidth = this.dimensions.width / this.level[0].length\n        const wallHeight = this.dimensions.height / this.level.length\n        // debugger\n        let numBricks = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"myCount\"])(this.level.flat(), 1)\n        this.numTargets = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"myCount\"])(this.level.flat(), 2)\n        for(let row = 0; row < this.level.length; row ++){\n            for(let col= 0; col < this.level[0].length; col++){\n                let leftStart = col * wallWidth;\n                let upStart = row * wallHeight\n                if(this.level[row][col] === 1){\n                    // debugger\n                    ctx.fillStyle = \"black\";\n                    ctx.fillRect(leftStart, upStart, wallWidth, wallHeight)\n                    this.bricks.push({left : leftStart, top:upStart, right : (leftStart + wallWidth), bottom : (upStart + wallHeight)})\n                    if (this.bricks.length > numBricks){\n                        this.bricks = this.bricks.slice(1)\n                    }\n                }\n                else if(this.level[row][col] === 2){\n                    // debugger\n        \n                    ctx.fillStyle = \"yellow\";\n                    ctx.fillRect(leftStart, upStart, this.targetLength, this.targetLength)\n                    let currentTarget = {left : leftStart, top:upStart, right : (leftStart + this.targetLength), bottom : (upStart + this.targetLength)}\n                    if(Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"_overlap\"])(player.bounds(), currentTarget)){\n                        this.level[row][col] = 0\n                    }\n                }\n            }\n        }\n        // debugger\n    }\n\n    drawBackground(ctx){\n        ctx.fillStyle = \"skyblue\";\n        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n    }\n\n    animate(ctx, player) {\n        this.drawBackground(ctx);\n        this.drawLevel(ctx, player);\n        // console.log(this.numTargets)\n      \n    }\n   \n\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\nclass Player {\n\n    constructor(dimensions, keysTracker = {}, level) {\n        this.dimensions = dimensions;\n        this.x = 0;\n        this.y = this.dimensions.height - _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].EDGE;\n        this.velX = 0;\n        this.velY = 0; \n        this.keysTracker = keysTracker;\n        this.level = level;\n        this.onGround = false;\n        this.collisionAdj = 0;\n    }\n\n\n    drawPlayer(ctx) {\n        ctx.fillStyle = \"#FF0000\";\n        ctx.fillRect(this.x, this.y, _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].PLAYER_WIDTH, _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].PLAYER_HEIGHT);\n    }\n\n    pushPlayer(keysTracker){\n        // debugger\n        if (keysTracker[_util__WEBPACK_IMPORTED_MODULE_0__[\"KEYS\"].UP]){\n            this.onGround = false;\n            this.velY -= 1 * _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].UP_SPEED \n            // console.log(this.velY)\n        }\n        if (keysTracker[_util__WEBPACK_IMPORTED_MODULE_0__[\"KEYS\"].LEFT]) {  \n            // debugger          \n            this.velX -= _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].HORIZENTAL_SPEED \n        }\n        if (keysTracker[_util__WEBPACK_IMPORTED_MODULE_0__[\"KEYS\"].RIGHT]){         \n            this.velX +=  _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].HORIZENTAL_SPEED\n        }\n    }\n\n    updatePlayer() {\n        this.onGround = false;           \n    // debugger\n    this.velX *= _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].FRICTION  \n    if(this.y < 390){\n        this.velY += _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].GRAVITY \n    }   \n    if(this.velY > 0){\n        this.velY -= _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].AIR_FRICTION \n    } else {\n        this.velY += _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].AIR_FRICTION\n    }\n    // console.log(\"start\")\n    // console.log(this.y)\n    // console.log(this.velY)\n\n    // debugger    \n    if(Math.abs(this.velX) > _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].MAX_SPEED){\n            if(this.velX > 0) {\n                this.velX = _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].MAX_SPEED\n            } else {\n                this.velX = - 1 * _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].MAX_SPEED\n            }\n        }\n        \n        if(Math.abs(this.velY) > _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].MAX_SPEED){\n            if(this.velY > 0) {\n                this.velY = _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].MAX_SPEED\n            } else {\n                this.velY = -1 * _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].MAX_SPEED\n            }\n        }\n\n        if (this.collideWithBrick()){\n            this.resolveCollision()\n        }\n\n        if(this.onGround) {\n            this.velY = 0;\n          }\n        this.x += this.velX\n        this.y += this.velY\n\n        if (this.x > this.dimensions.width - _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].EDGE) {\n            this.x = this.dimensions.width - _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].EDGE\n        }  else if (this.x < 0) {\n            this.x = 0\n        }\n        if (this.y > this.dimensions.height - _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].EDGE) {\n            this.y = this.dimensions.height - _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].EDGE\n        }  else if (this.y < _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].EDGE) {\n            this.y = _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].EDGE\n        }\n        \n    }\n\n    bounds(){\n        return {\n            left: this.x,\n            right: (this.x + _util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].PLAYER_WIDTH), \n            top: this.y, \n            bottom: (this.y +_util__WEBPACK_IMPORTED_MODULE_0__[\"CONSTANTS\"].PLAYER_HEIGHT)\n        }\n    }\n\n    animate(ctx) {\n        this.updatePlayer();\n        this.drawPlayer(ctx);\n    }\n\n    collideWithBrick(){\n        let collision = false;\n        // debugger\n        this.level.bricks.forEach(brick => {\n            if (Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"_overlap\"])(brick, this.bounds())){\n                collision = true;\n            }\n        })\n        // console.log(collision)\n        return collision;\n    }\n\n    // collisionDir(){\n    //     let collisionType = [null, null];\n    //     if(!this.collideWithBrick()){return collisionType}\n\n    //     const _overlapDir = (rect1, rect2) => {\n    //         if (rect1.right >= rect2.left && rect1.right <= (rect2.left + rect2.right)/2){\n    //             collisionType[0] =\"left\"\n    //         } else if (rect1.left <= rect2.right && rect1.left <= (rect2.left + rect2.right)/2){\n    //             collisionType[0] = \"right\"\n    //         }\n    //         if(rect1.bottom <= rect2.top && rect1.bottom >= (rect2.top + rect2.bottom)/2){\n    //             collisionType[1] = \"top\"\n    //         } else if (rect1.top <= rect2.bottom && rect1.top <= (rect2.top + rect2.bottom)/2) {\n    //             collisionType[1] = \"bottom\"\n    //         }\n    //     }\n\n    //     this.level.bricks.forEach(brick => {\n    //         _overlapDir(this.bounds(), brick)\n    //     })\n    //     console.log(collisionType)\n    //     return collisionType;\n    // }\n\n    collisionDir(){\n        let collisionDir = [null, null]\n        const _overlapDir = (rect1, rect2) => {\n            const width1 = rect1.right - rect1.left\n            const width2 = rect2.right - rect2.left\n            const height1 = rect1.bottom - rect1.top\n            const height2 = rect2.bottom - rect2.top\n            const centerDistX = (rect1.left + rect1.right)/2 - (rect2.left + rect2.right)/2\n            const centerDistY = (rect1.bottom + rect1.top)/2 - (rect2.bottom + rect2.top)/2\n            const avrWidth = (width1 + width2)/2\n            const avrHeight = (height1 + height2)/2\n            const distX = avrWidth - Math.abs(centerDistX)\n            const distY = avrHeight - Math.abs(centerDistY)\n\n           \n            if (Math.abs(centerDistX) < avrWidth && Math.abs(centerDistY) < avrHeight){\n                if (distX >= distY){\n                    if (centerDistY > 0){\n                        collisionDir[1] = \"top\";\n                        this.collisionAdj = distY\n                    }\n                    else {\n                        collisionDir[1] = \"bottom\";\n                        // rect1.y -= distY;\n                       \n                        // console.log(rect1.y)\n                        this.collisionAdj = -distY\n                    }\n                }\n                else {\n                    if(centerDistX < 0){\n                        collisionDir[0] = \"right\";\n                        this.collisionAdj = -distX\n                    } else {\n                        collisionDir[0] = \"left\";\n                        this.collisionAdj = distX\n                    }\n                }\n            }\n        }\n        this.level.bricks.forEach(brick => {\n            _overlapDir(this.bounds(), brick)\n        })\n        console.log(collisionDir)\n        return collisionDir\n    }\n\n    resolveCollision(){\n        console.log(this.collisionDir())\n        if (this.collideWithBrick()){\n            if (this.collisionDir()[0] === \"right\"){\n                this.x += this.collisionAdj\n                if(this.velX !== 0) {\n                    this.velX *= -1\n                } else {\n                    this.velX = 0.1\n                }\n            }\n\n            if (this.collisionDir()[0] === \"left\"){\n                this.x += this.collisionAdj\n                if(this.velX !== 0) {\n                    this.velX *= -1\n                } else {\n                    this.velX = -0.1\n                }\n                // console.log(this.collisionDir())\n            }\n            if (this.collisionDir()[1] === \"top\"){\n                this.y += this.collisionAdj\n                this.velY *= -1\n                // console.log(\"a\")\n                // console.log(this.velY)\n                // // console.log(this.onGround)\n                // console.log(this.collisionDir())\n                // console.log(this.collideWithBrick())\n            }\n            if (this.collisionDir()[1] === \"bottom\"){\n                this.y += this.collisionAdj\n                // this.onGround = true;\n                this.velY *= -1\n                this.bottomCollision = true;\n                // console.log(\"b\")\n                // console.log(this.y)\n                // console.log(this.onGround)\n                // console.log(this.collideWithBrick()[1])\n            }\n            this.collisionAdj = 0\n        }\n\n    }\n\n\n    \n\n}\n\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: CONSTANTS, KEYS, _overlap, myCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CONSTANTS\", function() { return CONSTANTS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KEYS\", function() { return KEYS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_overlap\", function() { return _overlap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"myCount\", function() { return myCount; });\n\nconst CONSTANTS = {\n    GRAVITY: 0.8,\n    FRICTION: 0.8,\n    AIR_FRICTION: 0.3,\n    PLAYER_WIDTH: 10,\n    PLAYER_HEIGHT: 10,\n    UP_SPEED: 6,\n    HORIZENTAL_SPEED: 3,\n    MAX_SPEED: 9,\n    EDGE: 10,\n}\n\nconst KEYS = {\n    UP: 38,\n    LEFT: 37,\n    RIGHT: 39\n}\n\nconst _overlap = (rect1, rect2) => {\n    if (rect1.left > rect2.right || rect1.right < rect2.left) {\n        return false;\n    }\n    if (rect1.top > rect2.bottom || rect1.bottom < rect2.top){\n        return false;\n    }\n    return true;\n}\n\nconst myCount = (arr, target) => {\n    return arr.filter(el => el === target).length\n}\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });