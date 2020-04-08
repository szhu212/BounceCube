import { myCount, _overlap, CONSTANTS } from "./util"
import { LEVELS, colors } from "./util"

export default class Level {

    constructor(dimensions, currentLevel){
        this.dimensions = dimensions;
        this.level = LEVELS[currentLevel];
        this.bricks = [];
        this.targetLength = 10;
        this.targets = {};
        this.numTargets = 0;
        this.color = '0,92,175';
        // debugger
    };
 
    drawLevel(ctx, player) {
        const wallWidth = this.dimensions.width / this.level[0].length
        const wallHeight = this.dimensions.height / this.level.length
        // debugger
        let numBricks = myCount(this.level.flat(), 1)
        this.numTargets = myCount(this.level.flat(), 2)
        // ctx.save()
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
                    // ctx.save()
                }
                else if(this.level[row][col] === 2){
                    // debugger
                    if(col === 0) {
                        leftStart += CONSTANTS.BOARDER_WIDTH
                    }
                    if(row === this.level.length){
                        upStart -= CONSTANTS.BOARDER_WIDTH
                    }
                    // let imgData = ctx.getImageData(leftStart+1,upStart +1,1,1)
                    // let prevColor = imgData.data[0] + ' ,' + imgData.data[1] + ' ,' + imgData.data[2]
                    // debugger
                    // console.log(prevColor)
                    // console.log(Object.values(colors).includes(prevColor))
                    // let targetColor
                    // if (!Object.values(colors).includes(prevColor)){
                    //     targetColor = this.randomColor()
                    //     debugger
                    // }
                    // else {
                    //     targetColor = prevColor
                    // }

                    // let targetColor = this.randomColor()
                    let targetColor
                    // debugger
                    let pos = row + ',' + col
                    if (Object.keys(this.targets).includes(pos)){
                        targetColor = this.targets[[row,col]]
                    } else {
                        targetColor = this.randomColor()
                    }
                    // ctx.shadowColor = 'white';
                    // ctx.shadowBlur = 5
                    ctx.fillStyle = `rgb(${targetColor})`
                    // debugger 
                    ctx.fillRect(leftStart, upStart, this.targetLength, this.targetLength)
                    // ctx.lineWidth = 1;
                    // ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                    // ctx.strokeRect(leftStart, upStart, this.targetLength, this.targetLength)
                    // ctx.restore()
                    let currentTarget = {left : leftStart, top:upStart, right : (leftStart + this.targetLength), bottom : (upStart + this.targetLength), color: targetColor}
                    this.targets[[row, col]] = targetColor
                    // if (this.targets.length > this.numTargets){
                    //     this.targets = this.targets.slice(1)
                    // }
                    if(_overlap(player.bounds(), currentTarget)){
                        // debugger
                        this.level[row][col] = 0
                        this.color = currentTarget.color
                    }
                    // console.log(this.targets)
                }
            }
        }
        // debugger
    }

    drawBackground(ctx){
        // debugger
        ctx.fillStyle = `rgba(${this.color}, 0.2)`;
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
        
    }

    drawBorder(ctx){
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3
        ctx.strokeRect(0,0, this.dimensions.width, this.dimensions.height)
    } 

    randomColor(){
        let num = Math.floor(Math.random() * 15)
        return colors[num]
    }

    animate(ctx, player) {
        this.drawBackground(ctx);
        this.drawLevel(ctx, player);
        this.drawBorder(ctx)
      
    }
   

}