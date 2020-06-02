import Game from './game'; 

const musicButton = document.getElementById('music-button')
const musicIcon = document.getElementById('music-icon')
const music = document.getElementById('music')
let playingMusic = false
musicButton.addEventListener('click', handleMusic)

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("game-canvas");
    music.muted = true;
    new Game(canvas)
})


window.onload = function () {
    music.muted = true;
}

function handleMusic() {
    if (playingMusic){
        playingMusic = false;
        musicIcon.src = './play-music.png'
        musicButton.className = ''
        music.pause()
    } else {
        playingMusic = true
        musicIcon.src = './stop-music2.png'
        musicButton.className = ''
        musicButton.classList.add('music-playing')
        music.volume = 0.2
        music.play()
    }
}

export default playingMusic;

