import { _overlap, CONSTANTS, KEYS } from "./util"

export default class Player {

    constructor(dimensions, keysTracker = {}, level) {
        this.dimensions = dimensions;
        this.x = CONSTANTS.BOARDER_WIDTH;
        this.y = this.dimensions.height - CONSTANTS.EDGE //- CONSTANTS.BOARDER_WIDTH;
        this.velX = 0;
        this.velY = 0; 
        this.keysTracker = keysTracker;
        this.level = level;
        // this.onGround = false;
        this.collisionAdj = 0;
    }


    drawPlayer(ctx) {
        ctx.fillStyle = `rgb(${this.level.color})`;
        ctx.fillRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
    }

    // pushPlayer(keysTracker){
    //     // debugger
    //     if (keysTracker[KEYS.UP]){
    //         // this.onGround = false;
    //         this.velY -= 1 * CONSTANTS.UP_SPEED 
    //         if (this.velY < -CONSTANTS.MAX_SPEED) {
    //             this.velY = -CONSTANTS.MAX_SPEED
    //         }
    //     }
    //     if (keysTracker[KEYS.LEFT]) {  
    //         // debugger          
    //         this.velX -= CONSTANTS.HORIZENTAL_SPEED 
    //     }
    //     if (keysTracker[KEYS.RIGHT]){         
    //         this.velX +=  CONSTANTS.HORIZENTAL_SPEED
    //     }
    // }

    updatePlayer(keysTracker) {
        if (keysTracker[KEYS.UP]){
            // this.onGround = false;
             this.velY -= 1 * CONSTANTS.UP_SPEED 
             
        }
        if (keysTracker[KEYS.LEFT]) {  
            // debugger          
            this.velX -= CONSTANTS.HORIZENTAL_SPEED 
        }
        if (keysTracker[KEYS.RIGHT]){         
            this.velX +=  CONSTANTS.HORIZENTAL_SPEED
        }
        // console.log(this.x, this.y)
        // this.onGround = false;           
    // debugger
        this.velX *= CONSTANTS.FRICTION  
        if(this.y < 390){
            this.velY += CONSTANTS.GRAVITY 
        }   
        if(this.velY > 0){
            this.velY -= CONSTANTS.AIR_FRICTION 
        } else {
            this.velY += CONSTANTS.AIR_FRICTION
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

    // if(this.onGround) {
    //     this.velY = 0;
    // }

        // console.log(`velY ${this.velY}`)
        // console.log(`this.y ${this.y}`)
        this.x += this.velX
        this.y += this.velY

        if (this.x > this.dimensions.width - CONSTANTS.PLAYER_WIDTH - CONSTANTS.BOARDER_WIDTH) {
            this.x = this.dimensions.width - CONSTANTS.PLAYER_WIDTH - CONSTANTS.BOARDER_WIDTH
        }  else if (this.x < 0) {
            this.x = CONSTANTS.BOARDER_WIDTH
        }
        if (this.y > this.dimensions.height - CONSTANTS.PLAYER_HEIGHT) {
            this.y = this.dimensions.height - CONSTANTS.PLAYER_HEIGHT
        }  
        else if (this.y < 0) {
            this.y = 0
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
        // this.pushPlayer(keysTracker);
        this.drawPlayer(ctx);
      
    }

    collideWithBrick(){
        let collision = false;
        // debugger
        Object.values(this.level.bricks).forEach(
            brick => {
            if (_overlap(brick, this.bounds())){
                collision = true;
            }
            })
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
                        // rect1.y -= distY;
                       
                        // console.log(rect1.y)
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
        // console.log(this.collisionDir())
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
                // this.onGround = true;
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

