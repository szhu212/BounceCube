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
            this.onGround = false;
            this.velY -= 1 * CONSTANTS.UP_SPEED 
            console.log(this.velY)
        }
        if (keysTracker[KEYS.LEFT]) {  
            // debugger          
            this.velX -= CONSTANTS.HORIZENTAL_SPEED 
        }
        if (keysTracker[KEYS.RIGHT]){         
            this.velX +=  CONSTANTS.HORIZENTAL_SPEED
        }
    }

    updatePlayer(keysTracker) {
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

        if(this.onGround) {
            this.velocityY = 0;
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

    animate(ctx, keysTracker) {
        this.updatePlayer(keysTracker);
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
        return collision;
    }

    collisionDir(){
        let collisionType = [null, null];
        if(!this.collideWithBrick()){return collisionType}

        const _overlapDir = (rect1, rect2) => {
            if (rect1.right >= rect2.left && rect1.right <= (rect2.left + rect2.right)/2){
                collisionType[0] ="left"
            } else if (rect1.left <= rect2.right && rect1.left <= (rect2.left + rect2.right)/2){
                collisionType[0] = "right"
            }
            if(rect1.bottom >= rect2.top && rect1.bottom >= (rect2.top + rect2.bottom)/2){
                collisionType[1] = "top"
            } else if (rect1.top <= rect2.bottom && rect1.top <= (rect2.top + rect2.bottom)/2) {
                collisionType[1] = "bottom"
            }
        }

        this.level.bricks.forEach(brick => {
            _overlapDir(this.bounds(), brick)
        })
        return collisionType;
    }

    resolveCollision(){
        // let collisionType = ""
        if (this.collideWithBrick()){
            // collisionType = this.collisionDir()
            // debugger
            // // console.log(collisionType)
            // console.log(this.collisionDir())
            // console.log(this.collideWithBrick())
            // console.log(this.collideWithBrick()[0])
            // console.log(this.collideWithBrick()[1])
            if (this.collisionDir() && (this.collisionDir()[0] === "left" || this.collisionDir()[0] === "right")){
                this.velX *= -1
                // console.log(this.velX)
            }
            else if (this.collisionDir() && this.collisionDir()[1] === "top"){
                this.velY *= -1
                console.log(this.velY)
            }
            else if (this.collisionDir() && this.collisionDir()[1] === "bottom"){
                this.onGround = true;
                console.log(this.velY)
            }
        }

    }


    

}

