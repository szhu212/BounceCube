import { myCount, _overlap } from "./util"
import { LEVELS} from "./util"

export default class Level {

    constructor(dimensions, currentLevel){
        this.dimensions = dimensions;
        this.level = LEVELS[currentLevel];
        this.bricks = [];
        this.targetLength = 10;
        this.targets = [];
        this.numTargets = 0;
        // debugger
    };
 
    drawLevel(ctx, player) {
        const wallWidth = this.dimensions.width / this.level[0].length
        const wallHeight = this.dimensions.height / this.level.length
        // debugger
        let numBricks = myCount(this.level.flat(), 1)
        this.numTargets = myCount(this.level.flat(), 2)
        for(let row = 0; row < this.level.length; row ++){
            for(let col= 0; col < this.level[0].length; col++){
                let leftStart = col * wallWidth;
                let upStart = row * wallHeight
                if(this.level[row][col] === 1){
                    // debugger
                    ctx.fillStyle = "black";
                    ctx.fillRect(leftStart, upStart, wallWidth, wallHeight)
                    this.bricks.push({left : leftStart, top:upStart, right : (leftStart + wallWidth), bottom : (upStart + wallHeight)})
                    if (this.bricks.length > numBricks){
                        this.bricks = this.bricks.slice(1)
                    }
                }
                else if(this.level[row][col] === 2){
                    // debugger
        
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(leftStart, upStart, this.targetLength, this.targetLength)
                    let currentTarget = {left : leftStart, top:upStart, right : (leftStart + this.targetLength), bottom : (upStart + this.targetLength)}
                    if(_overlap(player.bounds(), currentTarget)){
                        this.level[row][col] = 0
                    }
                }
            }
        }
        // debugger
    }

    drawBackground(ctx){
        ctx.fillStyle = "skyblue";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    animate(ctx, player) {
        this.drawBackground(ctx);
        this.drawLevel(ctx, player);
        // console.log(this.numTargets)
      
    }
   

}