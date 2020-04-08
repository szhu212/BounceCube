
export const CONSTANTS = {
    GRAVITY: 0.8,
    FRICTION: 0.8,
    AIR_FRICTION: 0.3,
    PLAYER_WIDTH: 15,
    PLAYER_HEIGHT: 15,
    UP_SPEED: 6,
    HORIZENTAL_SPEED: 3,
    MAX_SPEED: 9,
    EDGE: 10,
    BOARDER_WIDTH : 3
}

export const KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39
}

export const LEVELS = {
    0: [
        [1,1,1,1,1,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [2,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [2,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [2,0,1,1,1,0,0]
    ],
    1: [
        [1,1,1,1,1,0,0],
        [0,0,0,0,0,0,0],
        [1,1,2,0,0,0,0],
        [0,0,0,0,0,0,1],
        [0,0,0,0,0,1,1],
        [1,1,0,0,2,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,2,0,0,0,0,0],
        [2,0,1,1,1,0,0]
    ]
}

export const levelMessages = {
    0: "Level 1",
    1: "Level Up!"
}

export const levelInstruction = {
    0: "Have Fun!",
    1: "Great Job!"
}

export const colors = {
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
    11: "208, 16, 76",
    12: "253, 153, 102",
    13: "190, 194, 63",
    14: "180, 129, 187"
}


export const _overlap = (rect1, rect2) => {
    if (rect1.left > rect2.right || rect1.right < rect2.left) {
        return false;
    }
    if (rect1.top > rect2.bottom || rect1.bottom < rect2.top){
        return false;
    }
    return true;
}

export const myCount = (arr, target) => {
    return arr.filter(el => el === target).length
}

