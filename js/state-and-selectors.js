const startButton = document.getElementById('start')
const muteButton = document.getElementById('mute')
const gameBoard = document.getElementById('game-board')
const score = document.getElementById('score')
const state = {
    score: localStorage.getItem('highscore') || 0,
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
    mute: false
}

const sounds = {
    swap: new Audio('./sfx/swap1.mp3'),
    swoop: new Audio('./sfx/swoop2.mp3'),
    score: new Audio('./sfx/score1.mp3')
}