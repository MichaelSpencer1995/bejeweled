const startButton = document.getElementById('start')
const gameBoard = document.getElementById('game-board')

let state = {
    model: [],
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
    scoringPieces: []
    // potentialScorers: []
}