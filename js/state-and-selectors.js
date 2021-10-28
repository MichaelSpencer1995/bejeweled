const startButton = document.getElementById('start')
const muteButton = document.getElementById('mute')
const gameBoard = document.getElementById('game-board')
const menu = document.querySelector('.menu-container')
const gameSettings = document.getElementById('settings')
const score = document.getElementById('score')
const highscore = document.getElementById('highscore')
const timer = document.getElementById('timer')

gameSettings.addEventListener('click', handleSettingsClicked)
startButton.addEventListener('click', handleStartClicked)

const state = {
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
    menuOpen: true,
    time: 100,
    highscore: localStorage.getItem('highscore') || 0,
    score: {
        val: 0,
        multiplier: 1,
        isChaining: false
    }
}

const sounds = {
    swap: new Audio('./sfx/swap1.mp3'),
    swoop: new Audio('./sfx/swoop2.mp3'),
    score: new Audio('./sfx/score1.mp3')
}

function handleStartClicked() {
    menu.style.display = 'none'
    state.menuOpen = false
    gameSettings.style.display = 'flex'
    startButton.style.display = 'none'
    launch()
}

function handleSettingsClicked() {
    const bar1 = document.querySelector('.bar1')
    const bar2 = document.querySelector('.bar2')
    const bar3 = document.querySelector('.bar3')

    state.menuOpen = !state.menuOpen
    if(state.menuOpen) {
        bar1.style = 'transform: rotate(-45deg); top: 6px;'
        bar2.style = 'opacity: 0;'
        bar3.style = 'transform: rotate(45deg); top: -7px;'
        menu.style.display = 'flex'
    } else {
        bar1.style = ''
        bar2.style = ''
        bar3.style = ''
        menu.style.display = 'none'
    }
}