const startButton = document.getElementById('start')
const muteButton = document.getElementById('mute')
const gameBoard = document.getElementById('game-board')
const menu = document.querySelector('.menu-container')
const gameSettings = document.getElementById('settings')
const closeMenu = document.getElementById('close-menu')
const score = document.getElementById('score')
const highscore = document.getElementById('highscore')


gameSettings.addEventListener('click', handleSettingsClicked)
startButton.addEventListener('click', handleStartClicked)
closeMenu.addEventListener('click', handleSettingsClicked)


const state = {
    highscore: localStorage.getItem('highscore') || 0,
    score: 0,
    model: [],
    nextModel: [],
    move1: {
        isActive: false,
        id: null
    },
    move2: {
        isActive: false,
        id: null
    },
    swapBack: false,
    endSwapping: false,
    animateScoring: false,
    jewelsDonePoofing: false,
    scoringPieces: [],
    gameLocked: false,
    mute: false,
    menuOpen: true
}

const sounds = {
    swap: new Audio('./sfx/swap1.mp3'),
    swoop: new Audio('./sfx/swoop2.mp3'),
    score: new Audio('./sfx/score1.mp3')
}

function handleStartClicked() {
    menu.style.display = 'none'
    state.menuOpen = false
    gameSettings.style.display = 'block'
    closeMenu.style.display = 'block'
    startButton.style.display = 'none'
}

function handleSettingsClicked() {
    state.menuOpen = !state.menuOpen
    console.log(state.menuOpen)
    if(state.menuOpen) {
        menu.style.display = 'flex'
    } else {
        menu.style.display = 'none'

    }
}