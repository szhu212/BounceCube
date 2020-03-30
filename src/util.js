
export const CONSTANTS = {
    GRAVITY: 0.8,
    FRICTION: 0.8,
    AIR_FRICTION: 0.3,
    PLAYER_WIDTH: 10,
    PLAYER_HEIGHT: 10,
    UP_SPEED: 6,
    HORIZENTAL_SPEED: 3,
    MAX_SPEED: 9,
    EDGE: 10,
}

export const KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39
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