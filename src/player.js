const CONSTANTS = {
    GRAVITY: 0.6,
    FRICTION: 0.8,
    PLAYER_WIDTH: 10,
    PLAYER_HEIGHT: 10,
    UP_SPEED: 5, // change later
    HORIZENTAL_SPEED: 3,
    MAX_SPEED: 8,
    EDGE: 10,
}

const KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39
}

export default class Player {

    constructor(dimensions, keysTracker = {}, level) {
        this.dimensions = dimensions;
        // this.width = this.dimensions.width;
        // this.height = this.dimensions.height;
        this.x = CONSTANTS.EDGE;
        this.y = this.dimensions.height - CONSTANTS.EDGE;
        this.velX = 0;
        this.velY = 0; 
        this.keysTracker = keysTracker;
        this.level = level;
        this.onGround = false;
        this.collisionAdj = 0;
        // this._overlapDir = this._overlapDir.bind(this)
    }


    drawPlayer(ctx) {
        ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
    }

    pushPlayer(keysTracker){
        // debugger
        if (keysTracker[KEYS.UP]){
            // debugger
            // if (this.bottomCollision === true){
            //     this.collisionDir2()
            // }
            this.onGround = false;
            this.velY -= 1 * CONSTANTS.UP_SPEED 
            // console.log(this.velY)
        }
        if (keysTracker[KEYS.LEFT]) {  
            // debugger          
            this.velX -= CONSTANTS.HORIZENTAL_SPEED 
        }
        if (keysTracker[KEYS.RIGHT]){         
            this.velX +=  CONSTANTS.HORIZENTAL_SPEED
        }
    }

    updatePlayer() {
        this.onGround = false;
    // debugger
    // this.x += this.velX
    // this.y += this.velY 
                
    // debugger
    this.velX *= CONSTANTS.FRICTION  
    if(this.y < 390){
        this.velY += CONSTANTS.GRAVITY 
    }    
    // debugger    
    if(Math.abs(this.velX) > CONSTANTS.MAX_SPEED){
            if(this.velX > 0) {
                this.velX = CONSTANTS.MAX_SPEED
            } else {
                this.velX = - 1 * CONSTANTS.MAX_SPEED
            }
        }
        
        if(Math.abs(this.velY) > CONSTANTS.MAX_SPEED){
            if(this.velY > 0) {
                this.velY = CONSTANTS.MAX_SPEED
            } else {
                this.velY = -1 * CONSTANTS.MAX_SPEED
            }
        }
        if (this.collideWithBrick()){
            this.resolveCollision()
        }

        // if (this.keysTracker[KEYS.UP]){
        //     // debugger
        //     this.onGround = false;}

        if(this.onGround) {
            this.velY = 0;
          }
        this.x += this.velX
        this.y += this.velY

        if (this.x > this.dimensions.width - CONSTANTS.EDGE) {
            this.x = this.dimensions.width - CONSTANTS.EDGE
        }  else if (this.x < CONSTANTS.EDGE) {
            this.x = CONSTANTS.EDGE
        }
        if (this.y > this.dimensions.height - CONSTANTS.EDGE) {
            this.y = this.dimensions.height - CONSTANTS.EDGE
        }  else if (this.y < CONSTANTS.EDGE) {
            this.y = CONSTANTS.EDGE
        }
        
    }

    bounds(){
        return {
            left: this.x,
            right: (this.x + CONSTANTS.PLAYER_WIDTH), 
            top: this.y, 
            bottom: (this.y +CONSTANTS.PLAYER_HEIGHT)
        }
    }

    animate(ctx) {
        this.updatePlayer();
        this.drawPlayer(ctx);
    }

    collideWithBrick(){
        let collision = false;
        // debugger
        const _overlap = (rect1, rect2) => {
            // debugger
            if (rect1.left > rect2.right || rect1.right < rect2.left) {
                return false;
            }
            if (rect1.top > rect2.bottom || rect1.bottom < rect2.top){
                return false;
            }
            return true;
        }
        this.level.bricks.forEach(brick => {
            if (_overlap(brick, this.bounds())){
                collision = true;
            }
        })
        // console.log(collision)
        return collision;
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

    collisionDir2(){
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
                        rect1.y -= distY;
                        console.log("start")
                        console.log(rect1.y)
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
        this.level.bricks.forEach(brick => {
            _overlapDir(this.bounds(), brick)
        })
        console.log(collisionDir)
        return collisionDir
    }

    resolveCollision(){
        // let collisionType = ""
        console.log(this.collisionDir2())
        if (this.collideWithBrick()){
            

            if (this.collisionDir2()[0] === "right"){
                this.x += this.collisionAdj
                if(this.velX !== 0) {
                    this.velX *= -1
                } else {
                    this.velX = 0.1
                }
                // console.log(this.velX)
            }

            if (this.collisionDir2()[0] === "left"){
                this.x += this.collisionAdj
                if(this.velX !== 0) {
                    this.velX *= -1
                } else {
                    this.velX = -0.1
                }
                console.log(this.collisionDir2())
            }
            if (this.collisionDir2()[1] === "top"){
                this.y += this.collisionAdj
                this.velY *= -1
                // console.log("a")
                // console.log(this.velY)
                // // console.log(this.onGround)
                // console.log(this.collisionDir())
                // console.log(this.collideWithBrick())
            }
            if (this.collisionDir2()[1] === "bottom"){
                this.y += this.collisionAdj
                this.onGround = true;
                this.bottomCollision = true;
                // console.log("b")
                console.log(this.y)
                console.log(this.onGround)
                // console.log(this.collideWithBrick()[1])
            }
            this.collisionAdj = 0
        }

    }


    

}

