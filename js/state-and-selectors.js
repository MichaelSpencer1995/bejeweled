const startButton = document.getElementById('start')
const gameBoard = document.getElementById('game-board')
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
    gameLocked: false
}

const sounds = {
    swap: new Audio('./sfx/swap1.mp3'),
    score: new Audio('./sfx/score1.mp3')
}