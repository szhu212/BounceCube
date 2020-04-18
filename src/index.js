import Game from './game'; 

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("game-canvas");
    new Game(canvas)
})

const musicButton = document.getElementById('music-button')
const musicIcon = document.getElementById('music-icon')
const music = new Audio('../assets/bensound-summer.mp3') 
let playingMusic = false
musicButton.addEventListener('click', handleMusic)

function handleMusic() {
    if (playingMusic){
        playingMusic = false;
        musicIcon.src = "../assets/play-music.png"
        music.pause()
    } else {
        playingMusic = true
        musicIcon.src = "../assets/stop-music.png"
        music.play()
    }
}