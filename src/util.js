export const CONSTANTS = {
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

export const KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39
}

export const LEVELS = {

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
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,2,0],
        [1,1,0,0,0,0,0,1,1],
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
        [0,0,0,1,0,0,0,2,0,0],
        [0,0,0,0,0,0,2,0,0,0],
        [0,1,0,0,0,0,0,1,0,0],
        [0,1,0,3,0,3,0,1,0,0],
        [0,1,0,1,0,1,0,1,2,0],
        [0,1,2,1,2,1,0,1,0,0],
        [0,1,0,1,0,1,0,1,3,0],
        [0,1,0,1,0,1,0,1,0,0]
    ]
}


export const levelInstruction = {
    0: "Have Fun!",
    1: "Level up. Great Job!",
    2: "Level up. Be ware of the bombs!",
    3: "Final stage! Good luck, chanllenger!"
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
    11: "219, 77, 109",
    12: "253, 153, 102",
    13: "190, 194, 63",
    14: "180, 129, 187",
    15: "247, 92, 47",
    16: "241, 124, 103"
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

let fetchScores = firebase.database().ref('scores').orderByChild('score').limitToFirst(5)

export const scores = []
 
fetchScores.on('child_added', snapshot => {
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

export async function renderScores () {
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

export const submitScore = (name, score) => {
    firebase.database().ref('scores').push({name: name, score: score})
    let recordSubmissionDiv = document.getElementById("record-submission") 
    recordSubmissionDiv.innerHTML = ''
    renderScores()
}

const scoreSound = new Audio('./score-sound.mp3')
const playing = document.getElementById('music-button')

export const playBeep = () => {
    if (Object.values(playing.classList)[0] === 'music-playing')
    scoreSound.play()
}
