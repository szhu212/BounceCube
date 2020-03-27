export const LEVEL1 = [[0,1,1,1],[0,0,0,0],[0,0,0,0], [0,1,0,1]];




export default class Level {

    constructor(dimensions){
        this.dimensions = dimensions;
        this.level = LEVEL1;
        this.bricks = [];
    };

    countBricks(){
        let count = 0
        for(let row = 0; row < this.level.length; row ++){
            for(let col= 0; col < this.level[0].length; col++){
                if (this.level[row][col] === 1){
                    count += 1
                }
            }
        }
        return count
    }
 
    drawLevel(ctx) {
        const wallWidth = this.dimensions.width / this.level[0].length
        const wallHeight = this.dimensions.height / this.level.length
        let numBricks = this.countBricks()
        // debugger
        // const coloredBricks = []
        // this.level.forEach((row, rowIdx) => {
        //     row.forEach((brick, columnIdx) => {
        //         let verticalIdx = this.level.indexOf(row)
        //         // debugger
        //         let leftStart = columnIdx * wallWidth
        //         let upStart = verticalIdx * WallHeight
        //         // debugger
        //         if (brick === 1){
        //         this.fillStyle = "black";
        //         debugger
        //         ctx.fillRect(leftStart, upStart, wallWidth, WallHeight)
        //         debugger
        //         }
        //     })
        // })
        for(let row = 0; row < this.level.length; row ++){
            for(let col= 0; col < this.level[0].length; col++){
                let leftStart = col * wallWidth;
                let upStart = row * wallHeight
                if(this.level[row][col] === 1){
                    // debugger
                    this.fillStyle = "black";
                    ctx.fillRect(leftStart, upStart, wallWidth, wallHeight)
                    this.bricks.push({left : leftStart, top:upStart, right : (leftStart + wallWidth), bottom : (upStart + wallHeight)})
                    if (this.bricks.length > numBricks){
                        this.bricks = this.bricks.slice(1)
                    }
                    
                    // debugger
                }
            }
        }

        // debugger
    }

    // collidesWithBrick(player){

    // }

    animate(ctx) {
        this.drawLevel(ctx)
    }
   

}